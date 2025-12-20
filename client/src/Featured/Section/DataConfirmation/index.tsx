import { useEffect, useState } from "react";
import { useSearch, useNavigate } from "@tanstack/react-router";
import { User, Plane, Check, Clock, Wallet, Star } from "lucide-react";
import ApiServices from "../../../Services/api";

const DataConfirmation = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: "/data-confirmation" }) as any;
  const { bookingId } = search;

  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(900);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!bookingId) {
        setLoading(false);
        return;
      }
      try {
        const api = new ApiServices(import.meta.env.VITE_API_URL);

        let res;
        try {
          res = await api.getData(
            `/bookings/${bookingId}?populate[flight][populate]=*`
          );
          console.log("Booking fetch by ID response:", res);

          if (res?.data) {
            setBooking(res.data.attributes || res.data);
            setLoading(false);
            return;
          }
        } catch (idError) {
          console.log("ID fetch failed, trying documentId filter");
        }

        res = await api.getData(
          `/bookings?filters[documentId][$eq]=${bookingId}&populate[flight][populate]=*`
        );
        console.log("Booking fetch by documentId response:", res);

        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          setBooking(res.data[0].attributes || res.data[0]);
        } else if (res?.data) {
          setBooking(res.data.attributes || res.data);
        }
      } catch (err) {
        console.error("Booking fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bookingId]);

  const steps = [
    { id: 1, label: "Select Flights", status: "completed" },
    { id: 2, label: "Passenger Details", status: "completed" },
    { id: 3, label: "Additional Services", status: "completed" },
    { id: 4, label: "Details and Payment", status: "active" },
    { id: 5, label: "Confirmation", status: "pending" },
  ];

  if (loading) {
    return (
      <div className="p-20 text-center font-bold text-[#01357E]">
        Loading confirmation...
      </div>
    );
  }

  const flight = booking?.flight?.data?.attributes || booking?.flight;
  const passengers =
    booking?.passengerDetails?.passengers || booking?.passengerDetails || [];
  const price = Number(booking?.totalPrice);
  const validPrice = !isNaN(price) && price > 0;

  const total = validPrice ? price : 0;
  const tariff = (total * 0.535).toFixed(2);
  const tax = (total - Number(tariff)).toFixed(2);

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-8 font-sans">
      <div className="flex items-center mb-12 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-14">
        {steps.map((step, idx) => (
          <div
            key={step.id}
            className={`flex-1 flex items-center justify-center h-full gap-2 relative transition-colors duration-300 ${
              step.status === "active"
                ? "bg-[#4BACE1] text-white"
                : "text-blue-400"
            }`}
          >
            <div className="flex items-center gap-2">
              {step.id === 1 && <Plane className="w-4 h-4 -rotate-45" />}
              {step.id === 2 && <User className="w-4 h-4" />}
              {step.id === 3 && <Star className="w-4 h-4" />}
              {step.id === 4 && <Wallet className="w-4 h-4" />}
              {step.id === 5 && <Check className="w-4 h-4" />}
              <span
                className={`text-[13px] ${
                  step.status === "active" ? "font-bold" : "font-medium"
                } whitespace-nowrap`}
              >
                {step.label}
              </span>
              {step.status === "completed" && (
                <Check className="w-4 h-4 ml-1" />
              )}
            </div>
            {idx < steps.length - 1 &&
              step.status !== "active" &&
              steps[idx + 1].status !== "active" && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-6 bg-gray-100"></div>
              )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-[32px] font-normal text-gray-800 tracking-tight">
          Data Confirmation
        </h1>
        <div className="flex items-center gap-3">
          <div className="bg-[#BE2044] text-white px-5 py-2.5 rounded-lg flex items-center gap-2.5 font-bold shadow-sm">
            <Clock className="w-5 h-5 text-white/90" />
            <span className="text-sm">
              Time remaining for payment: {formatTimer(time)}
            </span>
          </div>
          <div className="bg-[#F8F9FB] border border-gray-100 px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2">
            <span className="text-gray-400 font-medium whitespace-nowrap">
              Booking number:
            </span>
            <span className="text-[#01357E] uppercase text-base tracking-wider font-extrabold">
              {bookingId ? `YHWCH${bookingId}` : "YHWCH5"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-12 bg-white p-4 rounded-lg  ">
        <section>
          <h2 className="text-2xl font-normal text-gray-800 mb-6">
            Data for{" "}
            {passengers.length > 1
              ? `${passengers.length} passengers`
              : "one passenger"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {passengers.length > 0 ? (
              passengers.map((p: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden"
                >
                  <div className="bg-[#01357E] p-4 flex items-center gap-3">
                    <User className="text-white w-5 h-5" />
                    <span className="text-white font-bold">
                      {p.firstName} {p.lastName}
                    </span>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm font-medium">
                        Passenger
                      </span>
                      <span className="font-bold text-[#01357E]">
                        {p.firstName} {p.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm font-medium">
                        Type
                      </span>
                      <span className="font-bold text-[#01357E]">{p.type}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm font-medium">
                        Date of Birth
                      </span>
                      <span className="font-bold text-[#01357E]">
                        {p.birthDate || "11 November 2002"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm font-medium">
                        Document Number
                      </span>
                      <span className="font-bold text-[#01357E]">
                        {p.docNumber || "123123"}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden border-t-4 border-t-[#01357E]">
                <div className="bg-[#01357E] p-4 flex items-center gap-3">
                  <User className="text-white w-5 h-5" />
                  <span className="text-white font-bold">Laboris Nisi</span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Passenger</span>
                    <span className="font-bold text-[#01357E]">
                      Laboris Nisi
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Type</span>
                    <span className="font-bold text-[#01357E]">Adult</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Date of Birth</span>
                    <span className="font-bold text-[#01357E]">
                      11 November 2002
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Document Number</span>
                    <span className="font-bold text-[#01357E]">123123</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-normal text-gray-800 mb-6">
            Selected Flights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FlightCard
              flight={flight}
              defaultOrigin="Baku, Terminal 1"
              defaultDest="Moscow, Terminal A"
              defaultClass="Economy / Budget"
              defaultNum="J2807"
              defaultTime1="07:25"
              defaultTime2="09:50"
              defaultCode1="GYD"
              defaultCode2="DME"
            />
            {booking?.inboundId && (
              <FlightCard
                flight={null}
                defaultOrigin="Moscow, Terminal A"
                defaultDest="Baku, Terminal 1"
                defaultClass="Economy / Budget"
                defaultNum="J2186"
                defaultTime1="00:45"
                defaultTime2="05:20"
                defaultCode1="DME"
                defaultCode2="GYD"
              />
            )}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-normal text-gray-800 mb-6 ">Tariffs</h2>
          <div className="max-w-md bg-white rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden border-t-4 border-t-[#01357E]">
            <div className="bg-[#01357E] p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <User className="text-white w-5 h-5 shrink-0" />
                <span className="font-bold text-lg">Adults</span>
              </div>
              <span className="font-bold text-lg">
                {validPrice ? total.toFixed(2) : "651.12"} ₼
              </span>
            </div>
            <div className="p-7 space-y-5">
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-400 font-bold">Tariff</span>
                <span className="font-bold text-[#01357E]">
                  {validPrice ? tariff : "348.62"} ₼
                </span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-400 font-bold">Taxes and Fees</span>
                <span className="font-bold text-[#01357E]">
                  {validPrice ? tax : "302.50"} ₼
                </span>
              </div>
              <div className="border-t border-gray-100 pt-5 flex justify-between items-baseline">
                <span className="text-[#BE2044] font-bold text-base">
                  Total
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-[#BE2044] font-black text-2xl">
                    {validPrice ? total.toFixed(2) : "651.12"}
                  </span>
                  <span className="text-[#BE2044] font-bold text-xl ml-1">
                    ₼
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4 pb-20">
          <button
            onClick={() => {
              navigate({
                to: "/payment",
                search: {
                  bookingId,
                  totalPrice: validPrice ? total : 651.12,
                } as any,
              });
            }}
            className="bg-[#BE2044] text-white px-10 py-1.5 rounded-xl font-bold text-md hover:bg-[#a01a39] transition-all transform active:scale-[0.98] shadow-lg shadow-[#BE204440] tracking-wide"
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};

const FlightCard = ({
  flight,
  defaultOrigin,
  defaultDest,
  defaultClass,
  defaultNum,
  defaultTime1,
  defaultTime2,
  defaultCode1,
  defaultCode2,
}: any) => {
  const depDate = flight?.departureDate || flight?.attributes?.departureDate;
  const dateObj = depDate ? new Date(depDate) : new Date("2025-12-26");

  // Robust helper to get nested location attributes
  const getLocationData = (loc: any) => {
    if (!loc) return null;
    // Strapi v4/5 nested: loc.data.attributes
    if (loc.data?.attributes) return loc.data.attributes;
    // Strapi v4/5 semi-nested: loc.attributes
    if (loc.attributes) return loc.attributes;
    // Strapi v5 flattened: loc directly
    return loc;
  };

  const originData = getLocationData(flight?.origin);
  const destData = getLocationData(flight?.destination);

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-gray-100 p-6 flex items-stretch gap-8">
      <div className="text-center min-w-[70px] flex flex-col justify-center">
        <div className="text-gray-400 text-xs uppercase font-bold mb-1">
          {dateObj.toLocaleDateString("en-GB", { weekday: "short" })}
        </div>
        <div className="text-5xl font-bold text-[#01357E] leading-none mb-1">
          {dateObj.getDate()}
        </div>
        <div className="text-blue-400 text-[11px] font-bold uppercase transition-colors">
          {dateObj.toLocaleDateString("en-GB", { month: "long" })}
        </div>
      </div>
      <div className="flex-1 border-l border-gray-100 pl-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="font-bold text-[17px] text-[#01357E] mb-1">
              {originData?.city || defaultOrigin.split(",")[0]}{" "}
              {originData?.name?.split(" ")[0] || defaultOrigin.split(",")[1]} —{" "}
              {destData?.city || defaultDest.split(",")[0]}{" "}
              {destData?.name?.split(" ")[0] || defaultDest.split(",")[1]}
            </div>
            <div className="text-[13px] text-gray-400 mb-0.5">
              {defaultClass}
            </div>
            <div className="text-[13px] font-bold text-gray-800">
              Flight: {flight?.flightNumber || defaultNum}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Plane className="w-5 h-5 text-blue-300 rotate-45" />
            </div>
            <div className="bg-[#F1F5F9] px-2.5 py-1 rounded-md text-[11px] font-extrabold text-[#94A3B8] border border-gray-100">
              {flight?.origin?.data?.attributes?.code || defaultCode1}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-2xl font-bold text-gray-800">{defaultTime1}</div>
          <div className="flex-1 h-[2px] bg-gray-100 relative mx-2">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-[1.5px] border-gray-200 bg-white"></div>
          </div>
          <div className="text-2xl font-bold text-gray-800">{defaultTime2}</div>
          <div className="text-[11px] text-[#94A3B8] font-bold ml-auto text-right leading-tight uppercase tracking-tight">
            <div>non-stop</div>
            <div className="text-gray-300 mt-0.5">3 h 25 min</div>
          </div>
          <div className="bg-[#F1F5F9] px-2.5 py-1 rounded-md text-[11px] font-extrabold text-[#94A3B8] border border-gray-100 ml-4">
            {flight?.destination?.data?.attributes?.code || defaultCode2}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataConfirmation;
