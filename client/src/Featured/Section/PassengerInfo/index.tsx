import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  User,
  Plane,
  Star,
  Wallet,
  Check,
  Calendar,
  Accessibility,
  Phone,
  Info,
  ChevronDown,
} from "lucide-react";
import ApiServices from "../../../Services/api";
import type { Flight } from "../../../Types/strapi";
import { useAuth } from "../../../Provider/AuthProvider";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const PassengerInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const search = useSearch({ from: "/passenger-details" }) as any;
  const { user, isAuthenticated } = useAuth();

  const {
    outboundId,
    inboundId,
    class: seatClassParam,
    adults = 1,
    children = 0,
    infants = 0,
  } = search;

  const [outbound, setOutbound] = useState<Flight | null>(null);
  const [inbound, setInbound] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);

  const [forms, setForms] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [contactInfo, setContactInfo] = useState({
    phone: "",
    countryCode: "+994",
    email: "",
    whoseDetails: "",
    whatsappConsent: false,
  });

  useEffect(() => {
    const totalPax = Number(adults) + Number(children) + Number(infants);
    const initialForms = Array.from({ length: totalPax }, (_, i) => ({
      id: i,
      firstName: "",
      lastName: "",
      gender: "M",
      birthDate: "",
      docType: "Passport",
      docNumber: "",
      issuingCountry: "Azerbaijan",
      docExpiry: "",
      type:
        i < Number(adults)
          ? "Adult"
          : i < Number(adults) + Number(children)
          ? "Child"
          : "Infant",
    }));
    setForms(initialForms);
  }, [adults, children, infants]);

  useEffect(() => {
    if (!outboundId) {
      navigate({ to: "/" });
    }
  }, [outboundId, navigate]);

  useEffect(() => {
    const fetchFlights = async () => {
      if (!outboundId) return;
      setLoading(true);
      try {
        const api = new ApiServices(import.meta.env.VITE_API_URL);

        const outData = await api.getData(`/flights/${outboundId}?populate=*`);
        if (outData?.data) {
          setOutbound(outData.data.attributes || outData.data);
        }

        if (inboundId) {
          const inData = await api.getData(`/flights/${inboundId}?populate=*`);
          if (inData?.data) {
            setInbound(inData.data.attributes || inData.data);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [outboundId, inboundId]);

  const getPrice = (flight: Flight | null) => {
    if (!flight) return 0;
    const data = flight.attributes || flight;
    return seatClassParam === "business"
      ? data.priceBusiness
      : data.priceEconomy;
  };

  const totalAdults = Number(adults) || 1;
  const totalChildren = Number(children) || 0;
  const totalInfants = Number(infants) || 0;
  const totalPax = totalAdults + totalChildren + totalInfants;

  const totalPrice = (getPrice(outbound) + getPrice(inbound)) * totalPax;

  const steps = [
    {
      id: 1,
      label: "Select Flights",
      icon: <Plane className="w-4 h-4" />,
      status: "completed",
    },
    {
      id: 2,
      label: "Passenger Details",
      icon: <User className="w-4 h-4" />,
      status: "active",
    },
    {
      id: 3,
      label: "Additional Services",
      icon: <Star className="w-4 h-4" />,
      status: "pending",
    },
    {
      id: 4,
      label: "Details and Payment",
      icon: <Wallet className="w-4 h-4" />,
      status: "pending",
    },
    {
      id: 5,
      label: "Confirmation",
      icon: <Check className="w-4 h-4" />,
      status: "pending",
    },
  ];

  if (loading && outboundId) {
    return (
      <div className="p-20 text-center font-bold text-[#01357E]">
        Loading passenger checkout...
      </div>
    );
  }

  const handleConfirm = async () => {
    if (submitting) return;
    if (!isAuthenticated || !user) {
      toast.error(t("toast.loginRequired"));
      navigate({ to: "/login" });
      return;
    }

    setSubmitting(true);
    try {
      const api = new ApiServices(import.meta.env.VITE_API_URL);

      console.log("Full User Object from Context:", user);

      const commonData = {
        passengerDetails: {
          passengers: forms,
          contactMetadata: {
            whoseDetails: contactInfo.whoseDetails,
            whatsappConsent: contactInfo.whatsappConsent,
            countryCode: contactInfo.countryCode,
          },
        },
        email: contactInfo.email,
        phone: `${contactInfo.countryCode}${contactInfo.phone}`,
        totalPrice: totalPrice,
        status: "pending",
      };

      console.log("Creating booking with payload [FORCE RELOAD]:", {
        data: {
          ...commonData,
          flight: outboundId,
        },
      });

      // Create outbound booking
      const res = await api.postData("/bookings", {
        data: {
          ...commonData,
          flight: outboundId,
        },
      });
      console.log("Outbound booking response:", res);

      const bookingId =
        res.data?.documentId || res.documentId || res.data?.id || res.id;

      if (!bookingId) {
        throw new Error("Booking created but ID not found");
      }

      // Create inbound booking if it's a round trip
      if (inboundId && inboundId !== outboundId) {
        const resInbound = await api.postData("/bookings", {
          data: {
            ...commonData,
            flight: inboundId,
          },
        });
        console.log("Inbound booking response:", resInbound);
      }

      toast.success(
        t("toast.bookingSuccess") || "Booking created successfully"
      );

      navigate({
        to: "/data-confirmation",
        search: { bookingId } as any,
      });
    } catch (err: any) {
      console.error("Booking error full response:", err.response?.data);
      console.error(
        "Booking error details:",
        err.response?.data?.error?.details
      );
      toast.error(
        err.response?.data?.error?.message ||
          t("toast.bookingError") ||
          "Failed to create booking"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8 bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden h-16">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex-1 flex items-center justify-center h-full px-2 gap-3 border-r last:border-r-0 border-gray-100 transition-all duration-300 ${
              step.status === "active"
                ? "bg-[#4BACE1] text-white"
                : "text-[#8E9093]"
            }`}
          >
            <div className="relative flex items-center justify-center">
              <div
                className={`${
                  step.status === "active" ? "text-white" : "text-[#4BACE1]"
                }`}
              >
                {step.id === 1 && <Plane className="w-5 h-5 -rotate-45" />}
                {step.id === 2 && <User className="w-5 h-5" />}
                {step.id === 3 && <Star className="w-5 h-5" />}
                {step.id === 4 && <Wallet className="w-5 h-5" />}
                {step.id === 5 && <Check className="w-5 h-5" />}
              </div>
              {step.status === "completed" && (
                <div className="absolute -right-5 -top-1">
                  <Check className="w-3 h-3 text-[#4BACE1]" />
                </div>
              )}
            </div>
            <span className="text-[14px] font-bold whitespace-nowrap tracking-tight">
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-normal text-gray-800 mb-8">
        Complete Passenger Information
      </h1>

      {forms.map((form, idx) => (
        <div
          key={form.id}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8"
        >
          <div className="bg-[#01357E] p-4 flex items-center gap-3">
            <User className="text-white w-5 h-5" />
            <span className="text-white font-bold">
              {form.type} {idx + 1}
            </span>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  First Name (Latin) *
                </label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => {
                    const newForms = [...forms];
                    newForms[idx].firstName = e.target.value;
                    setForms(newForms);
                  }}
                  className="border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Last Name (Latin) *
                </label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => {
                    const newForms = [...forms];
                    newForms[idx].lastName = e.target.value;
                    setForms(newForms);
                  }}
                  className="border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Gender *
                </label>
                <div className="flex gap-2 h-[50px]">
                  <button
                    onClick={() => {
                      const newForms = [...forms];
                      newForms[idx].gender = "M";
                      setForms(newForms);
                    }}
                    className={`flex-1 border border-gray-200 rounded-lg font-bold transition-colors ${
                      form.gender === "M"
                        ? "bg-blue-50 border-blue-400 text-[#01357E]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    M
                  </button>
                  <button
                    onClick={() => {
                      const newForms = [...forms];
                      newForms[idx].gender = "F";
                      setForms(newForms);
                    }}
                    className={`flex-1 border border-gray-200 rounded-lg font-bold transition-colors ${
                      form.gender === "F"
                        ? "bg-pink-50 border-pink-400 text-[#BE2044]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    F
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Date of Birth *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="DD-MM-YYYY"
                    value={form.birthDate}
                    onChange={(e) => {
                      const newForms = [...forms];
                      newForms[idx].birthDate = e.target.value;
                      setForms(newForms);
                    }}
                    className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-400"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 my-8"></div>

            <h2 className="text-2xl font-normal text-gray-800 mb-6">
              Document Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Document Type *
                </label>
                <select
                  value={form.docType}
                  onChange={(e) => {
                    const newForms = [...forms];
                    newForms[idx].docType = e.target.value;
                    setForms(newForms);
                  }}
                  className="border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-400 bg-white"
                >
                  <option>Passport</option>
                  <option>ID Card</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Document Number *
                </label>
                <input
                  type="text"
                  value={form.docNumber}
                  onChange={(e) => {
                    const newForms = [...forms];
                    newForms[idx].docNumber = e.target.value;
                    setForms(newForms);
                  }}
                  className="border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-400 bg-gray-50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Issuing Country *
                </label>
                <select
                  value={form.issuingCountry}
                  onChange={(e) => {
                    const newForms = [...forms];
                    newForms[idx].issuingCountry = e.target.value;
                    setForms(newForms);
                  }}
                  className="border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-400 bg-gray-50"
                >
                  <option>Azerbaijan</option>
                  <option>Turkey</option>
                  <option>United States</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Document Expiry Date *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="DD-MM-YYYY"
                    value={form.docExpiry}
                    onChange={(e) => {
                      const newForms = [...forms];
                      newForms[idx].docExpiry = e.target.value;
                      setForms(newForms);
                    }}
                    className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-400 bg-gray-50"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="mt-8 bg-[#F8FBFE] rounded-xl p-4 border border-blue-50 flex items-center justify-between cursor-pointer group hover:bg-blue-50/50 transition-colors mb-4">
              <div className="flex items-center gap-4">
                <div className="bg-[#4BACE1] p-2 rounded-lg">
                  <Accessibility className="text-white w-5 h-5" />
                </div>
                <span className="text-gray-700 font-medium">
                  Passenger with limited mobility
                </span>
              </div>
              <ChevronDown className="text-gray-400 group-hover:text-blue-400 transition-colors w-5 h-5" />
            </div>

            <div className="mt-4 bg-[#F8FBFE] rounded-xl p-4 border border-blue-50 flex items-center justify-between cursor-pointer group hover:bg-blue-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="text-[#01357E] font-bold italic tracking-tighter text-xl">
                  AZAL<span className="text-[#4BACE1]">Miles</span>
                </div>
                <span className="text-gray-700 font-medium">
                  Collect Miles from this flight
                </span>
              </div>
              <ChevronDown className="text-gray-400 group-hover:text-blue-400 transition-colors w-5 h-5" />
            </div>
          </div>
        </div>
      ))}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="bg-[#01357E] p-4 flex items-center gap-3">
          <Phone className="text-white w-5 h-5" />
          <span className="text-white font-bold">Contact Information</span>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Phone Number *
              </label>
              <div className="flex gap-2">
                <div className="relative min-w-[100px]">
                  <select
                    value={contactInfo.countryCode}
                    onChange={(e) =>
                      setContactInfo({
                        ...contactInfo,
                        countryCode: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-400 bg-white appearance-none pr-8 font-medium"
                  >
                    <option value="+994">🇦🇿 +994</option>
                    <option value="+90">🇹🇷 +90</option>
                    <option value="+1">🇺🇸 +1</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo({ ...contactInfo, phone: e.target.value })
                  }
                  className="flex-1 border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-400 placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Email *
              </label>
              <input
                type="email"
                placeholder="Email address"
                value={contactInfo.email}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, email: e.target.value })
                }
                className="border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-400 placeholder:text-gray-300"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Whose details are these?*
              </label>
              <div className="relative">
                <select
                  value={contactInfo.whoseDetails}
                  onChange={(e) =>
                    setContactInfo({
                      ...contactInfo,
                      whoseDetails: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-blue-400 bg-gray-50 appearance-none pr-10 text-gray-500"
                >
                  <option value="">Select passenger</option>
                  {forms.map((f, i) => (
                    <option key={i} value={`${f.firstName} ${f.lastName}`}>
                      {f.firstName} {f.lastName || `Passenger ${i + 1}`}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <input
              type="checkbox"
              id="whatsapp"
              checked={contactInfo.whatsappConsent}
              onChange={(e) =>
                setContactInfo({
                  ...contactInfo,
                  whatsappConsent: e.target.checked,
                })
              }
              className="w-5 h-5 accent-[#4BACE1]"
            />
            <label
              htmlFor="whatsapp"
              className="text-sm text-[#01357E] font-medium"
            >
              I confirm my phone number is linked to WhatsApp and consent to
              receiving flight updates from Azerbaijan Airlines.
            </label>
          </div>

          <div className="bg-[#F8FBFE] border border-blue-50 rounded-xl p-4 flex items-start gap-3">
            <Info className="text-[#4BACE1] w-5 h-5 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-500 leading-relaxed">
              It is important to provide accurate contact information, as it
              will be used for processing the request in case of a refund.
            </p>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-[#BE2044] text-white shadow-[0_-8px_30px_rgba(0,0,0,0.2)] z-50 py-5">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between px-8">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/10">
              <User className="w-5 h-5" />
              <span className="text-sm font-bold tracking-wide">
                {totalAdults} Adults{" "}
                {totalChildren > 0 && `, ${totalChildren} Children`}{" "}
                {totalInfants > 0 && `, ${totalInfants} Infants`}
              </span>
            </div>
            <button className="text-sm font-bold underline hover:text-white/80 transition-opacity">
              Flight Details
            </button>
          </div>

          <div className="flex items-center gap-12">
            <div className="text-right">
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-bold tracking-tight">
                  {totalPrice.toFixed(2)}
                </span>
                <span className="text-xl font-bold ml-1">₼</span>
              </div>
              <div className="text-[11px] font-bold text-white/70 uppercase tracking-widest mt-0.5">
                For all passengers
              </div>
            </div>
            <button
              onClick={handleConfirm}
              disabled={submitting}
              className="border-2 border-white text-white px-20 py-3.5 rounded-xl font-bold text-lg hover:bg-white hover:text-[#BE2044] transition-all duration-300 tracking-wide outline-none active:scale-[0.98] disabled:opacity-50"
            >
              {submitting ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PassengerInfo;
