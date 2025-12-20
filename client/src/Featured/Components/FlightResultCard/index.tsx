import { Plane } from "lucide-react";
import type { Flight } from "../../../Types/strapi";

interface FlightResultCardProps {
  flight: Flight;
  onSelect: (flight: Flight, seatClass: "economy" | "business") => void;
}

const FlightResultCard = ({ flight, onSelect }: FlightResultCardProps) => {
  const data = flight.attributes || flight;

  const depDate = new Date(data.departureDate);
  const arrDate = new Date(data.arrivalDate);

  const duration = arrDate.getTime() - depDate.getTime();
  const hours = Math.floor(duration / 3600000);
  const mins = Math.round((duration % 3600000) / 60000);

  const formatTime = (date: Date) => {
    return isNaN(date.getTime())
      ? "--:--"
      : date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
  };

  const formatDate = (date: Date) => {
    return isNaN(date.getTime())
      ? "---"
      : date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          weekday: "short",
        });
  };

  const getLocInfo = (loc: any) => {
    if (!loc) return { city: "Unknown", code: "???" };
    if (loc.data?.attributes) return loc.data.attributes;
    return loc;
  };

  const origin = getLocInfo(data.origin);
  const destination = getLocInfo(data.destination);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full hover:border-[#37A6DB] transition-all duration-300">
      <div className="flex items-start justify-between gap-10">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
              <Plane className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-700">
              Azerbaijan Airlines
            </span>
          </div>

          <div className="flex items-center gap-8">
            <div className="min-w-[100px]">
              <div className="text-4xl font-black text-[#01357E]">
                {formatTime(depDate)}
              </div>
              <div className="text-base font-bold text-gray-900 mt-1">
                {origin.city}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                Terminal 2
              </div>
              <div className="text-sm text-gray-400 font-medium">
                {formatDate(depDate)}
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <div className="text-xs font-bold text-[#37A6DB] mb-2 px-3 py-1 bg-blue-50 rounded-full">
                {hours} h {mins > 0 ? `${mins} m` : ""}
              </div>
              <div className="w-full relative px-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-dashed border-gray-200"></div>
                </div>
                <div className="relative flex justify-between">
                  <div className="w-3 h-3 bg-white border-2 border-[#37A6DB] rounded-full"></div>
                  <div className="absolute left-1/2 -top-2 transform -translate-x-1/2">
                    <Plane className="w-4 h-4 text-gray-300 rotate-90" />
                  </div>
                  <div className="w-3 h-3 bg-[#37A6DB] rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                  Direct flight
                </span>
              </div>
            </div>

            <div className="text-right min-w-[100px]">
              <div className="text-4xl font-black text-[#01357E]">
                {formatTime(arrDate)}
              </div>
              <div className="text-base font-bold text-gray-900 mt-1">
                {destination.city}
              </div>
              <div className="text-sm text-[#37A6DB] font-bold">
                {destination.code}
              </div>
              <div className="text-sm text-gray-400 font-medium">
                {formatDate(arrDate)}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
              <span className="text-[10px] font-bold text-gray-500">
                {data.flightNumber}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
              <Plane className="w-3 h-3 text-gray-400" />
              <span className="text-[10px] font-bold text-gray-500">
                A320 Neo
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onSelect(flight, "economy")}
            className="group relative border border-gray-200 bg-white rounded-xl h-[160px] w-36 overflow-hidden cursor-pointer hover:border-[#37A6DB] hover:shadow-md transition-all flex flex-col"
          >
            <div className="w-full py-2 bg-gray-50 border-b border-gray-100 text-center">
              <span className="text-[10px] font-black tracking-widest text-gray-400 group-hover:text-[#37A6DB]">
                ECONOMY
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-black text-[#01357E]">
                  {Math.floor(data.priceEconomy)}
                </span>
                <span className="text-xs font-bold text-[#01357E]">
                  .
                  {Math.round((data.priceEconomy % 1) * 100)
                    .toString()
                    .padStart(2, "0")}
                </span>
                <span className="text-[10px] font-bold text-gray-400 ml-1">
                  AZN
                </span>
              </div>
              <div className="text-[9px] font-bold text-gray-400 mt-2">
                ONE WAY
              </div>
            </div>
            <div className="w-full py-2 bg-[#01357E] text-white text-center text-[10px] font-bold uppercase transition-colors group-hover:bg-[#37A6DB]">
              Select
            </div>
          </button>

          <button
            onClick={() => onSelect(flight, "business")}
            className="group relative border border-gray-200 bg-white rounded-xl h-[160px] w-36 overflow-hidden cursor-pointer hover:border-[#37A6DB] hover:shadow-md transition-all flex flex-col"
          >
            <div className="w-full py-2 bg-[#3F5B98]/10 border-b border-[#3F5B98]/20 text-center">
              <span className="text-[10px] font-black tracking-widest text-[#3F5B98]">
                BUSINESS
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-black text-[#01357E]">
                  {Math.floor(data.priceBusiness)}
                </span>
                <span className="text-xs font-bold text-[#01357E]">
                  .
                  {Math.round((data.priceBusiness % 1) * 100)
                    .toString()
                    .padStart(2, "0")}
                </span>
                <span className="text-[10px] font-bold text-gray-400 ml-1">
                  AZN
                </span>
              </div>
              <div className="text-[9px] font-bold text-gray-400 mt-2">
                ONE WAY
              </div>
            </div>
            <div className="w-full py-2 bg-[#3F5B98] text-white text-center text-[10px] font-bold uppercase transition-colors group-hover:bg-[#37A6DB]">
              Select
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightResultCard;
