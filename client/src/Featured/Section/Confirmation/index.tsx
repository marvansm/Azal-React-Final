import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  Plane,
  Edit2,
  Check,
  X,
  User,
  Briefcase,
  RotateCcw,
} from "lucide-react";
import ApiServices from "../../../Services/api";
import type { Flight } from "../../../Types/strapi";

const ConfirmationSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.search as any;
  const {
    outboundId,
    inboundId,
    class: seatClassParam,
    adults,
    children,
    infants,
  } = searchParams;

  const [outbound, setOutbound] = useState<Flight | null>(null);
  const [inbound, setInbound] = useState<Flight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const api = new ApiServices(import.meta.env.VITE_API_URL);

        if (outboundId) {
          const outData = await api.getData(
            `/flights/${outboundId}?populate=*`
          );
          if (outData?.data) {
            setOutbound(outData.data.attributes || outData.data);
          }
        }

        if (inboundId) {
          const inData = await api.getData(`/flights/${inboundId}?populate=*`);
          if (inData?.data) {
            setInbound(inData.data.attributes || inData.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch confirmation flights", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [outboundId, inboundId]);

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? "--:--"
      : date.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? "---"
      : date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          weekday: "short",
        });
  };

  const getCity = (loc: any) => {
    if (!loc) return "Unknown";
    if (loc.data?.attributes) return loc.data.attributes.city;
    return loc.city || "Unknown";
  };

  const getCode = (loc: any) => {
    if (!loc) return "???";
    if (loc.data?.attributes) return loc.data.attributes.code;
    return loc.code || "???";
  };

  const calculateDuration = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    const diff = e.getTime() - s.getTime();
    const hrs = Math.floor(diff / 3600000);
    const mins = Math.round((diff % 3600000) / 60000);
    return `${hrs} h ${mins} min`;
  };

  if (loading)
    return (
      <div className="p-20 text-center font-bold text-[#01357E]">
        Loading selection...
      </div>
    );

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

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-8 pb-40">
      <header className="mb-8 pl-2">
        <h1 className="text-4xl font-normal text-gray-800 mb-2">
          Confirm selected tickets
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          If the selected tickets are displayed correctly, click the "Confirm"
          button
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Outbound Flight */}
        {outbound && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700 pl-1">
              <Plane className="w-5 h-5 -rotate-45" />
              <h2 className="text-2xl font-normal">
                Outbound flight:{" "}
                <span className="font-bold">
                  {getCity(outbound.origin)} - {getCity(outbound.destination)}
                </span>
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-blue-100 flex items-center justify-center p-1.5 overflow-hidden bg-blue-50/10">
                    <Plane className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm font-bold text-blue-400">
                    Azerbaijan Airlines
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-sm font-bold text-gray-400 border border-gray-200 px-5 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                    Route details
                  </button>
                  <button className="p-2.5 bg-[#4BACE1] text-white rounded-full hover:bg-blue-500 transition-colors shadow-lg shadow-blue-100">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-8 mb-10">
                <div className="min-w-[80px]">
                  <div className="text-[13px] font-bold text-gray-800 mb-1">
                    {formatDate(outbound.departureDate)}
                  </div>
                  <div className="text-4xl font-bold text-gray-800">
                    {formatTime(outbound.departureDate)}
                  </div>
                  <div className="text-[12px] font-bold text-gray-400 absolute translate-x-12 -translate-y-6">
                    {getCode(outbound.origin)}
                  </div>
                  <div className="text-[14px] font-bold text-gray-700 mt-1">
                    {getCity(outbound.origin)}
                  </div>
                  <div className="text-[11px] font-medium text-gray-400">
                    Terminal 1
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center px-4 relative">
                  <span className="text-[11px] font-bold text-gray-400 mb-2">
                    {calculateDuration(
                      outbound.departureDate,
                      outbound.arrivalDate
                    )}
                  </span>
                  <div className="w-full relative flex items-center justify-between">
                    <div className="w-1.5 h-1.5 border border-gray-300 rounded-full bg-white z-10"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-gray-900 -translate-y-1/2"></div>
                    <div className="w-1.5 h-1.5 border border-gray-300 rounded-full bg-white z-10"></div>
                  </div>
                  <span className="text-[11px] font-bold text-black mt-2">
                    Without stops
                  </span>
                </div>

                <div className="min-w-[80px] text-right">
                  <div className="text-[13px] font-bold text-gray-800 mb-1">
                    {formatDate(outbound.arrivalDate)}
                  </div>
                  <div className="text-4xl font-bold text-gray-800">
                    {formatTime(outbound.arrivalDate)}
                  </div>
                  <div className="text-[12px] font-bold text-gray-400 absolute -translate-x-12 -translate-y-6">
                    {getCode(outbound.destination)}
                  </div>
                  <div className="text-[14px] font-bold text-gray-700 mt-1">
                    {getCity(outbound.destination)}
                  </div>
                  <div className="text-[11px] font-medium text-gray-400">
                    Terminal A
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-[#F8FBFE] rounded-2xl border border-blue-50/50 flex flex-col relative">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[13px] font-bold text-[#01357E]">
                      Economy
                    </span>
                    <span className="text-[11px] font-bold text-blue-400 bg-white px-3 py-1 rounded-full border border-blue-100 uppercase">
                      Budget
                    </span>
                  </div>
                  <div className="space-y-3 mb-4 flex-1 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[12px] text-gray-500 font-medium">
                        <Briefcase className="w-4 h-4 text-gray-400" />{" "}
                        <span>Baggage 1x23 kg</span>
                      </div>
                      <X className="w-4 h-4 text-[#D32F4D]" />
                    </div>
                    <div className="flex items-center justify-between text-[12px] text-gray-500 font-medium">
                      <span className="flex items-center gap-3">
                        <RotateCcw className="w-4 h-4 text-gray-400" /> Refund
                        before departure
                      </span>
                      <X className="w-4 h-4 text-[#D32F4D]" />
                    </div>
                    <div className="flex items-center justify-between text-[12px] text-gray-500 font-medium">
                      <span className="flex items-center gap-3">
                        <RotateCcw className="w-4 h-4 text-gray-400" /> Change
                        before departure
                      </span>
                      <X className="w-4 h-4 text-[#D32F4D]" />
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col relative overflow-hidden ring-1 ring-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[13px] font-bold text-[#01357E]">
                      Economy
                    </span>
                    <span className="text-[11px] font-bold text-white bg-[#6FB048] px-5 py-1.5 rounded-full uppercase absolute -top-1 right-0 rounded-t-none rounded-r-none">
                      Classic
                    </span>
                  </div>
                  <div className="space-y-3 mb-6 flex-1 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[12px] text-gray-500 font-medium">
                        <Briefcase className="w-4 h-4 text-gray-400" />{" "}
                        <span>Baggage 1x23 kg</span>
                      </div>
                      <Check className="w-4 h-4 text-[#6FB048]" />
                    </div>
                    <div className="flex items-center justify-between text-[12px] text-gray-500 font-medium">
                      <span className="flex items-center gap-3">
                        <RotateCcw className="w-4 h-4 text-gray-400" /> Refund
                        before departure 75€
                      </span>
                      <Check className="w-4 h-4 text-[#6FB048]" />
                    </div>
                    <div className="flex items-center justify-between text-[12px] text-gray-500 font-medium">
                      <span className="flex items-center gap-3">
                        <RotateCcw className="w-4 h-4 text-gray-400" /> Change
                        before departure 60€
                      </span>
                      <Check className="w-4 h-4 text-[#6FB048]" />
                    </div>
                  </div>
                  <div className="text-center mt-auto">
                    <div className="text-3xl font-bold text-pink-600 mb-0.5 tracking-tight">
                      + 59.89 ₼
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-widest">
                      for 1 passenger
                    </div>
                    <button className="w-full py-3 bg-[#37A6DB] text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-md">
                      Upgrade to Economy Classic
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Inbound Flight */}
        {inbound && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-700 pl-1">
              <Plane className="w-5 h-5 rotate-135" />
              <h2 className="text-2xl font-normal">
                Inbound flight:{" "}
                <span className="font-bold">
                  {getCity(inbound.origin)} - {getCity(inbound.destination)}
                </span>
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-blue-100 flex items-center justify-center p-1.5 bg-blue-50/10 overflow-hidden">
                    <Plane className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-sm font-bold text-blue-400">
                    Azerbaijan Airlines
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-sm font-bold text-gray-400 border border-gray-200 px-5 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                    Route details
                  </button>
                  <button className="p-2.5 bg-[#4BACE1] text-white rounded-full hover:bg-blue-500 transition-colors shadow-lg shadow-blue-100">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-8 mb-10">
                <div className="min-w-[80px]">
                  <div className="text-[13px] font-bold text-gray-800 mb-1">
                    {formatDate(inbound.departureDate)}
                  </div>
                  <div className="text-4xl font-bold text-gray-800">
                    {formatTime(inbound.departureDate)}
                  </div>
                  <div className="text-[12px] font-bold text-gray-400 absolute translate-x-12 -translate-y-6">
                    {getCode(inbound.origin)}
                  </div>
                  <div className="text-[14px] font-bold text-gray-700 mt-1">
                    {getCity(inbound.origin)}
                  </div>
                  <div className="text-[11px] font-medium text-gray-400">
                    Terminal A
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center px-4 relative">
                  <span className="text-[11px] font-bold text-gray-400 mb-2">
                    {calculateDuration(
                      inbound.departureDate,
                      inbound.arrivalDate
                    )}
                  </span>
                  <div className="w-full relative flex items-center justify-between">
                    <div className="w-1.5 h-1.5 border border-gray-300 rounded-full bg-white z-10"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-gray-900 -translate-y-1/2"></div>
                    <div className="w-1.5 h-1.5 border border-gray-300 rounded-full bg-white z-10"></div>
                  </div>
                  <span className="text-[11px] font-bold text-black mt-2">
                    Without stops
                  </span>
                </div>

                <div className="min-w-[80px] text-right">
                  <div className="text-[13px] font-bold text-gray-800 mb-1">
                    {formatDate(inbound.arrivalDate)}
                  </div>
                  <div className="text-4xl font-bold text-gray-800">
                    {formatTime(inbound.arrivalDate)}
                  </div>
                  <div className="text-[12px] font-bold text-gray-400 absolute -translate-x-12 -translate-y-6">
                    {getCode(inbound.destination)}
                  </div>
                  <div className="text-[14px] font-bold text-gray-700 mt-1">
                    {getCity(inbound.destination)}
                  </div>
                  <div className="text-[11px] font-medium text-gray-400">
                    Terminal 1
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-[#F8FBFE] rounded-2xl border border-blue-50/50 flex flex-col relative">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[13px] font-bold text-[#01357E]">
                      Economy
                    </span>
                    <span className="text-[11px] font-bold text-blue-400 bg-white px-3 py-1 rounded-full border border-blue-100 uppercase">
                      Budget
                    </span>
                  </div>
                  <div className="space-y-3 mb-4 flex-1 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[12px] text-gray-500 font-medium">
                        <Briefcase className="w-4 h-4 text-gray-400" />{" "}
                        <span>Baggage 1x23 kg</span>
                      </div>
                      <X className="w-4 h-4 text-[#D32F4D]" />
                    </div>
                    <div className="flex items-center justify-between text-[12px] text-gray-500 font-medium">
                      <span className="flex items-center gap-3">
                        <RotateCcw className="w-4 h-4 text-gray-400" /> Refund
                        before departure
                      </span>
                      <X className="w-4 h-4 text-[#D32F4D]" />
                    </div>
                    <div className="flex items-center justify-between text-[12px] text-gray-500 font-medium">
                      <span className="flex items-center gap-3">
                        <RotateCcw className="w-4 h-4 text-gray-400" /> Change
                        before departure
                      </span>
                      <X className="w-4 h-4 text-[#D32F4D]" />
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col relative overflow-hidden ring-1 ring-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[13px] font-bold text-[#01357E]">
                      Economy
                    </span>
                    <span className="text-[11px] font-bold text-white bg-[#6FB048] px-5 py-1.5 rounded-full uppercase absolute -top-1 right-0 rounded-t-none rounded-r-none">
                      Classic
                    </span>
                  </div>
                  <div className="space-y-3 mb-6 flex-1 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-[12px] text-gray-500 font-medium">
                        <Briefcase className="w-4 h-4 text-gray-400" />{" "}
                        <span>Baggage 1x23 kg</span>
                      </div>
                      <Check className="w-4 h-4 text-[#6FB048]" />
                    </div>
                    <div className="flex items-center justify-between text-[12px] text-gray-500 font-medium">
                      <span className="flex items-center gap-3">
                        <RotateCcw className="w-4 h-4 text-gray-400" /> Refund
                        before departure 75€
                      </span>
                      <Check className="w-4 h-4 text-[#6FB048]" />
                    </div>
                    <div className="flex items-center justify-between text-[12px] text-gray-500 font-medium">
                      <span className="flex items-center gap-3">
                        <RotateCcw className="w-4 h-4 text-gray-400" /> Change
                        before departure 60€
                      </span>
                      <Check className="w-4 h-4 text-[#6FB048]" />
                    </div>
                  </div>
                  <div className="text-center mt-auto">
                    <div className="text-3xl font-bold text-pink-600 mb-0.5 tracking-tight">
                      + 59.89 ₼
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-widest">
                      for 1 passenger
                    </div>
                    <button className="w-full py-3 bg-[#37A6DB] text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-md">
                      Upgrade to Economy Classic
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#BE2044] text-white shadow-[0_-8px_30px_rgba(0,0,0,0.2)] z-50 py-5">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between px-8">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
              <User className="w-5 h-5" />
              <span className="text-sm font-bold tracking-wide">
                Adults: {totalAdults}
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
              onClick={() => navigate({ to: "/" })}
              className="border-2 border-white text-white px-20 py-3.5 rounded-xl font-bold text-lg hover:bg-white hover:text-[#BE2044] transition-all duration-300 tracking-wide outline-none"
            >
              Confirm
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConfirmationSection;
