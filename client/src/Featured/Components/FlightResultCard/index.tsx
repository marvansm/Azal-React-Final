import { Info, Plane } from "lucide-react";
import type { Flight } from "../../../Types/strapi";

interface FlightResultCardProps {   
  flight: Flight;
  onSelect: (flight: Flight, seatClass: "economy" | "business") => void;
}

const FlightResultCard = ({ flight, onSelect }: FlightResultCardProps) => {
  const { attributes } = flight;
  const departureDate = new Date(attributes.departureDate);
  const arrivalDate = new Date(attributes.arrivalDate);

  const durationMs = arrivalDate.getTime() - departureDate.getTime();
  const durationHrs = Math.floor(durationMs / 3600000);
  const durationMins = Math.round((durationMs % 3600000) / 60000);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      weekday: "short",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full">
      <div className="flex items-start justify-between gap-10 ">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
              <Plane className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-gray-700">Azerbaijan Airlines</span>
          </div>

          <div className="flex items-center gap-8">
            <div>
              <div className="text-4xl font-bold text-gray-900">
                {formatTime(departureDate)}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {attributes.origin.data.attributes.city}
              </div>
              <div className="text-sm text-gray-500">Terminal 2</div>
              <div className="text-sm text-gray-500">
                {formatDate(departureDate)}
              </div>
            </div>

            {/* Connection line */}
            <div className="flex-1 flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-2">
                {durationHrs} h {durationMins > 0 ? `${durationMins} m` : ""}
              </div>
              <div className="w-full relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-300"></div>
                </div>
                <div className="relative flex justify-between">
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-xs text-gray-600">Without stops</span>
              </div>
            </div>

            {/* Arrival */}
            <div className="text-right">
              <div className="text-4xl font-bold text-gray-900">
                {formatTime(arrivalDate)}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {attributes.destination.data.attributes.city},{" "}
                {attributes.destination.data.attributes.code}
              </div>
              <div className="text-sm text-gray-500">
                {formatDate(arrivalDate)}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
              <span className="text-xs text-gray-700">
                {attributes.flightNumber}
              </span>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1">
              <Plane className="w-4 h-4 text-gray-600" />
              <span className="text-xs text-gray-700">Airbus A320 Neo</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-600 mb-4">
            <span>124 kg CO₂e</span>
            <Info className="w-3 h-3" />
          </div>
        </div>
        <div className="ml-12 flex flex-col items-end gap-3">
          <div className="flex gap-3">
            <div
              onClick={() => onSelect(flight, "economy")}
              className="border-2 bg-[#F2F5FB] border-gray-200 rounded-xl h-[205px] w-40 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-between flex-col"
            >
              <div className=" flex items-center px-4 justify-between w-full py-3 border-b  border-gray-200 ">
                <span className="text-sm font-semibold text-[#01357E] ">
                  ECONOMY
                </span>
                <svg
                  className="w-4 h-4 text-[#01357E]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <div className=" px-4 py-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#01357E]">
                    {Math.floor(attributes.priceEconomy)}
                  </span>
                  <span className="text-sm text-[#01357E]">
                    .{Math.round((attributes.priceEconomy % 1) * 100)}
                  </span>
                  <span className="text-gray-500 text-xs ml-1">AZN</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Starting price</div>
              </div>
            </div>
            <div
              onClick={() => onSelect(flight, "business")}
              className="border-2 bg-[#F2F5FB] border-gray-200 rounded-xl h-[205px] w-40 overflow-hidden cursor-pointer hover:border-blue-500 transition-colors flex items-center justify-between flex-col"
            >
              <div className=" flex items-center px-4 justify-between w-full py-3 border-b bg-[#3F5B98]  border-gray-200 ">
                <span className="text-sm font-semibold text-white ">
                  BUSINESS
                </span>
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <div className=" px-4 py-4">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#01357E]">
                    {Math.floor(attributes.priceBusiness)}
                  </span>
                  <span className="text-sm text-[#01357E]">
                    .{Math.round((attributes.priceBusiness % 1) * 100)}
                  </span>
                  <span className="text-gray-500 text-xs ml-1">AZN</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Starting price</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightResultCard;
