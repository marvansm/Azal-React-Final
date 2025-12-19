import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  Plane,
  Clock,
  Edit2,
  Check,
  X,
  ShieldCheck,
  Info,
  User,
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
  const [fareLockActive, setFareLockActive] = useState(false);
  const [disruptionAssistance, setDisruptionAssistance] = useState<
    "add" | "decline" | null
  >(null);

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

  const totalPrice =
    (getPrice(outbound) + getPrice(inbound)) * totalPax +
    (fareLockActive ? 20 : 0) +
    (disruptionAssistance === "add" ? 53 : 0);

  return (
    <div className="max-w-[1240px] mx-auto px-4 py-8 pb-32">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
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
            <div className="flex items-center gap-2 text-gray-700">
              <Plane className="w-5 h-5 -rotate-45" />
              <h2 className="text-xl font-bold">
                Outbound flight: {getCity(outbound.origin)} -{" "}
                {getCity(outbound.destination)}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <Plane className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    Azerbaijan Airlines
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs font-bold text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                    Route details
                  </button>
                  <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-8">
                <div>
                  <div className="text-xs font-bold text-gray-400 mb-1">
                    {formatDate(outbound.departureDate)}
                  </div>
                  <div className="text-3xl font-black text-[#01357E]">
                    {formatTime(outbound.departureDate)}
                  </div>
                  <div className="text-sm font-bold text-gray-400 mt-1 uppercase">
                    {getCode(outbound.origin)}
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-gray-400 mb-2">
                    {calculateDuration(
                      outbound.departureDate,
                      outbound.arrivalDate
                    )}
                  </span>
                  <div className="w-full relative flex items-center">
                    <div className="w-full h-0.5 bg-gray-200"></div>
                    <div className="absolute left-1/2 -top-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#37A6DB] rounded-full"></div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase">
                    Without stops
                  </span>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-gray-400 mb-1">
                    {formatDate(outbound.arrivalDate)}
                  </div>
                  <div className="text-3xl font-black text-[#01357E]">
                    {formatTime(outbound.arrivalDate)}
                  </div>
                  <div className="text-sm font-bold text-gray-400 mt-1 uppercase">
                    {getCode(outbound.destination)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black text-gray-400">
                      ECONOMY
                    </span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                      Budget
                    </span>
                  </div>
                  <div className="space-y-2 mb-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
                        <User className="w-3 h-3" />{" "}
                        <span>Baggage 1x23 kg</span>
                      </div>
                      <X className="w-3 h-3 text-red-500" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-600">
                      <span>Refund before departure</span>
                      <X className="w-3 h-3 text-red-500" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-600">
                      <span>Change before departure</span>
                      <X className="w-3 h-3 text-red-500" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border-2 border-green-500 flex flex-col relative overflow-hidden">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black text-gray-400">
                      ECONOMY
                    </span>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase">
                      Classic
                    </span>
                  </div>
                  <div className="space-y-2 mb-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
                        <User className="w-3 h-3" />{" "}
                        <span>Baggage 1x23 kg</span>
                      </div>
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-600">
                      <span>Refund before departure 75€</span>
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-600">
                      <span>Change before departure 60€</span>
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-black text-pink-600">
                      + 59.90 ₼
                    </div>
                    <div className="text-[9px] font-bold text-gray-400 mb-2 uppercase">
                      for 1 passenger
                    </div>
                    <button className="w-full py-2 bg-blue-500 text-white rounded-lg text-xs font-bold hover:bg-blue-600">
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
            <div className="flex items-center gap-2 text-gray-700">
              <Plane className="w-5 h-5 -rotate-45" />
              <h2 className="text-xl font-bold">
                Inbound flight: {getCity(inbound.origin)} -{" "}
                {getCity(inbound.destination)}
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <Plane className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    Azerbaijan Airlines
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs font-bold text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                    Route details
                  </button>
                  <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-6 mb-8">
                <div>
                  <div className="text-xs font-bold text-gray-400 mb-1">
                    {formatDate(inbound.departureDate)}
                  </div>
                  <div className="text-3xl font-black text-[#01357E]">
                    {formatTime(inbound.departureDate)}
                  </div>
                  <div className="text-sm font-bold text-gray-400 mt-1 uppercase">
                    {getCode(inbound.origin)}
                  </div>
                </div>

                <div className="flex-1 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-gray-400 mb-2">
                    {calculateDuration(
                      inbound.departureDate,
                      inbound.arrivalDate
                    )}
                  </span>
                  <div className="w-full relative flex items-center">
                    <div className="w-full h-0.5 bg-gray-200"></div>
                    <div className="absolute left-1/2 -top-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#37A6DB] rounded-full"></div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 mt-2 uppercase">
                    Without stops
                  </span>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-gray-400 mb-1">
                    {formatDate(inbound.arrivalDate)}
                  </div>
                  <div className="text-3xl font-black text-[#01357E]">
                    {formatTime(inbound.arrivalDate)}
                  </div>
                  <div className="text-sm font-bold text-gray-400 mt-1 uppercase">
                    {getCode(inbound.destination)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black text-gray-400">
                      ECONOMY
                    </span>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">
                      Budget
                    </span>
                  </div>
                  <div className="space-y-2 mb-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
                        <User className="w-3 h-3" />{" "}
                        <span>Baggage 1x23 kg</span>
                      </div>
                      <X className="w-3 h-3 text-red-500" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-600">
                      <span>Refund before departure</span>
                      <X className="w-3 h-3 text-red-500" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-600">
                      <span>Change before departure</span>
                      <X className="w-3 h-3 text-red-500" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border-2 border-green-500 flex flex-col relative overflow-hidden">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black text-gray-400">
                      ECONOMY
                    </span>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase">
                      Classic
                    </span>
                  </div>
                  <div className="space-y-2 mb-4 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
                        <User className="w-3 h-3" />{" "}
                        <span>Baggage 1x23 kg</span>
                      </div>
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-600">
                      <span>Refund before departure 75€</span>
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-600">
                      <span>Change before departure 60€</span>
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-black text-pink-600">
                      + 59.89 ₼
                    </div>
                    <div className="text-[9px] font-bold text-gray-400 mb-2 uppercase">
                      for 1 passenger
                    </div>
                    <button className="w-full py-2 bg-blue-500 text-white rounded-lg text-xs font-bold hover:bg-blue-600">
                      Upgrade to Economy Classic
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fare Lock */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Fare Lock Service
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              No need to worry about price increases or tickets selling out —
              now you can lock in your airfare for 72 hours.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 py-4 border-t border-gray-50">
          <button
            onClick={() => setFareLockActive(!fareLockActive)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              fareLockActive ? "bg-pink-500" : "bg-gray-200"
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                fareLockActive ? "left-7" : "left-1"
              }`}
            ></div>
          </button>
          <span className="text-lg font-black text-pink-600">Total 20 ₼</span>
        </div>
        <p className="text-[11px] text-blue-500 font-bold underline cursor-pointer">
          Terms and conditions of the service
        </p>
        <p className="text-[11px] text-red-500 font-medium mt-4">
          * This fee is non-refundable and will not be deducted from the total
          amount due.
        </p>
      </div>

      {/* Disruption Assistance */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 relative overflow-hidden">
        <div className="absolute right-6 top-6 bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
          New
        </div>
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Disruption Assistance
            </h3>
            <p className="text-sm text-gray-500 font-medium mb-4">
              If your flight is canceled or delayed for 2+ hours on the day of
              travel, we'll proactively notify you and then:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <Check className="w-4 h-4 text-blue-500" /> We'll rebook you on
                a new flight on any airline (up to 5,100 ₼ total for all
                passengers); or
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <Check className="w-4 h-4 text-blue-500" /> Get a refund of 100%
                and keep your original flight, if you aren't happy with the
                rebooking options
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                <Info className="w-4 h-4 text-blue-500" /> Use our self-serve
                tools or speak to an agent!
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => setDisruptionAssistance("add")}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              disruptionAssistance === "add"
                ? "border-pink-500 bg-pink-50/10"
                : "border-gray-100 hover:border-blue-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  disruptionAssistance === "add"
                    ? "border-pink-500 bg-pink-500"
                    : "border-gray-300"
                }`}
              >
                {disruptionAssistance === "add" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div>
                <div className="text-sm font-bold">
                  Add Disruption Assistance
                </div>
                <div className="text-sm font-black text-pink-600">
                  +53 ₼{" "}
                  <span className="text-[10px] text-gray-400 font-bold uppercase ml-1">
                    total for all passengers
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={() => setDisruptionAssistance("decline")}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              disruptionAssistance === "decline"
                ? "border-pink-500 bg-pink-50/10"
                : "border-gray-100 hover:border-blue-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  disruptionAssistance === "decline"
                    ? "border-pink-500 bg-pink-500"
                    : "border-gray-300"
                }`}
              >
                {disruptionAssistance === "decline" && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div>
                <div className="text-sm font-bold">Decline</div>
                <div className="text-[10px] text-gray-400 font-bold">
                  I don't want to add this option
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between p-4 px-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#01357E] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-gray-700">Adults: 1</span>
            </div>
            <button className="text-sm font-bold text-pink-600 underline">
              Flight Details
            </button>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[#01357E]">
                  {totalPrice.toFixed(2)}
                </span>
                <span className="text-sm font-black text-[#01357E]">₼</span>
              </div>
              <div className="text-[10px] font-bold text-gray-400 uppercase">
                For all passengers
              </div>
            </div>
            <button
              onClick={() => navigate({ to: "/" })}
              className="bg-pink-600 text-white px-12 py-3.5 rounded-xl font-bold text-lg hover:bg-pink-700 transition shadow-lg shadow-pink-200"
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
