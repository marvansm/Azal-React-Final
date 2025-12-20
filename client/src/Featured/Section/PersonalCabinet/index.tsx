import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Plane, Calendar, User, CreditCard, LogOut } from "lucide-react";
import { useAuth } from "../../../Provider/AuthProvider";
import ApiServices from "../../../Services/api";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const PersonalCabinetSection = () => {
  const { t } = useTranslation();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/login" });
      return;
    }

    const fetchBookings = async () => {
      try {
        const api = new ApiServices(import.meta.env.VITE_API_URL);
        const response = await api.getData(
          `/bookings?populate[flight][populate]=*&sort[0]=createdAt:desc`
        );
        console.log("All bookings response:", response);
        console.log("User email:", user?.email);

        if (response?.data) {
          const userBookings = response.data.filter((booking: any) => {
            const bookingData = booking.attributes || booking;
            const bEmail = (bookingData.email || "").toLowerCase().trim();
            const uEmail = (user?.email || "").toLowerCase().trim();
            return bEmail === uEmail;
          });
          setBookings(userBookings);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const handleViewDetails = (bookingId: string | number) => {
    navigate({
      to: "/data-confirmation",
      search: { bookingId: bookingId } as any,
    });
  };

  const handleCancelBooking = async (bookingId: string | number) => {
    toast(
      (toastInstance) => (
        <div className="p-1">
          <p className="font-bold mb-3">{t("payment.cancelConfirm")}</p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(toastInstance.id);
                try {
                  const api = new ApiServices(import.meta.env.VITE_API_URL);
                  await api.putData(`/bookings/${bookingId}`, {
                    data: { status: "cancelled" },
                  });
                  toast.success(
                    t("toast.bookingCancelled") ||
                      "Booking cancelled successfully"
                  );

                  const response = await api.getData(
                    `/bookings?populate[flight][populate]=*&sort=createdAt:desc`
                  );
                  if (response?.data) {
                    const userBookings = response.data.filter(
                      (booking: any) => {
                        const bookingData = booking.attributes || booking;
                        const bEmail = (bookingData.email || "")
                          .toLowerCase()
                          .trim();
                        const uEmail = (user?.email || "").toLowerCase().trim();
                        return bEmail === uEmail;
                      }
                    );
                    setBookings(userBookings);
                  }
                } catch (error) {
                  console.error("Failed to cancel booking:", error);
                  toast.error(t("toast.error") || "Failed to cancel booking");
                }
              }}
              className="flex-1 bg-[#BE2044] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#a01a39] transition-colors"
            >
              {t("payment.yes") || "Yes"}
            </button>
            <button
              onClick={() => toast.dismiss(toastInstance.id)}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-300 transition-colors"
            >
              {t("payment.no") || "No"}
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#01357E] font-bold text-xl">
          {t("myBookings.subtitle")}...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      <div className="bg-[#01357E] text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("myBookings.title")}</h1>
            <p className="text-blue-200">
              {t("myBookings.welcome")}, {user?.username}!
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {t("myBookings.logout")}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t("myBookings.myBookings")}
          </h2>
          <p className="text-gray-600">{t("myBookings.subtitle")}</p>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {t("myBookings.noBookings")}
            </h3>
            <p className="text-gray-600 mb-6">
              {t("myBookings.noBookingsDesc")}
            </p>
            <button
              onClick={() => navigate({ to: "/" })}
              className="bg-[#BE2044] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#a01a39] transition-colors"
            >
              {t("myBookings.bookFlight")}
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => {
              const bookingData = booking.attributes || booking;
              const flight =
                bookingData.flight?.data?.attributes || bookingData.flight;
              const passengers = bookingData.passengerDetails?.passengers || [];

              // Robust helper to get nested location attributes
              const getLocationCity = (loc: any) => {
                if (!loc) return "N/A";
                // Strapi v4/5 nested: loc.data.attributes.city
                if (loc.data?.attributes?.city) return loc.data.attributes.city;
                // Strapi v4/5 semi-nested: loc.attributes.city
                if (loc.attributes?.city) return loc.attributes.city;
                // Strapi v5 flattened: loc.city
                if (loc.city) return loc.city;
                return "N/A";
              };

              const originCity = getLocationCity(flight?.origin);
              const destCity = getLocationCity(flight?.destination);
              const departureDate =
                flight?.departureDate || flight?.attributes?.departureDate;

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="bg-linear-to-r from-[#01357E] to-[#4BACE1] p-6 text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Plane className="w-5 h-5 -rotate-45" />
                          <span className="text-sm font-medium opacity-90">
                            {t("myBookings.booking")} #{booking.id}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold">
                          {originCity} → {destCity}
                        </h3>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(
                          bookingData.status
                        )}`}
                      >
                        {t(`myBookings.status.${bookingData.status}`)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-[#4BACE1] mt-1" />
                        <div>
                          <p className="text-sm text-gray-500 font-medium">
                            {t("myBookings.departure")}
                          </p>
                          <p className="font-bold text-gray-800">
                            {departureDate
                              ? new Date(departureDate).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )
                              : "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-[#4BACE1] mt-1" />
                        <div>
                          <p className="text-sm text-gray-500 font-medium">
                            {t("myBookings.passengers")}
                          </p>
                          <p className="font-bold text-gray-800">
                            {passengers.length}{" "}
                            {passengers.length === 1
                              ? t("myBookings.passenger")
                              : t("myBookings.passengers")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <CreditCard className="w-5 h-5 text-[#4BACE1] mt-1" />
                        <div>
                          <p className="text-sm text-gray-500 font-medium">
                            {t("myBookings.totalPrice")}
                          </p>
                          <p className="font-bold text-gray-800">
                            {bookingData.totalPrice} ₼
                          </p>
                        </div>
                      </div>
                    </div>

                    {passengers.length > 0 && (
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-sm font-medium text-gray-500 mb-3">
                          {t("myBookings.passengerDetails")}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {passengers.map((passenger: any, idx: number) => (
                            <span
                              key={idx}
                              className="bg-blue-50 text-[#01357E] px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {passenger.firstName} {passenger.lastName} (
                              {passenger.type})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() =>
                          handleViewDetails(
                            booking.documentId ||
                              bookingData.documentId ||
                              booking.id
                          )
                        }
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-bold transition-colors"
                      >
                        {t("myBookings.viewDetails")}
                      </button>
                      {bookingData.status === "pending" && (
                        <button
                          onClick={() =>
                            handleCancelBooking(
                              booking.documentId ||
                                bookingData.documentId ||
                                booking.id
                            )
                          }
                          className="flex-1 bg-[#BE2044] hover:bg-[#a01a39] text-white py-3 rounded-lg font-bold transition-colors"
                        >
                          {t("myBookings.cancelBooking")}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalCabinetSection;
