interface FlightRoadCardProps {
  type: "outbound" | "inbound";
  isActive: boolean;
  from: string;
  to: string;
}

const FlightRoadCard = ({ type, isActive, from, to }: FlightRoadCardProps) => {
  return (
    <div
      className={`bg-white rounded-lg border flex items-center overflow-hidden shadow-sm transition-all ${
        isActive ? "border-[#4db3e8]" : "border-gray-200"
      }`}
    >
      <div
        className={`w-16 h-16 flex items-center justify-center transition-colors ${
          isActive ? "bg-[#24A8E0]" : "bg-gray-100"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 20 20"
          className={`transition-all ${
            isActive ? "text-white" : "text-gray-400"
          } ${type === "inbound" ? "rotate-90" : ""}`}
        >
          <path d="M5.196 2.624a.837.837 0 0 0-.604 1.405l3.501 3.783-3.205 1.401-1.973-1.158a.828.828 0 0 0-1.12 1.157l1.116 1.772a2.355 2.355 0 0 0 2.935.902l11.64-5.095a1.413 1.413 0 0 0-1.131-2.589l-4.377 1.913-6.38-3.394a.836.836 0 0 0-.402-.097Zm-2.071 13.21a.628.628 0 0 0-.634.624.625.625 0 0 0 .634.625h13.75a.624.624 0 1 0 0-1.25H3.125Z"></path>
        </svg>
      </div>

      <div className="flex-1 px-6 flex justify-between items-center">
        <div>
          <p
            className={`font-medium text-lg ${
              isActive ? "text-[#24A8E0]" : "text-gray-400"
            }`}
          >
            {type === "outbound"
              ? "Choose outbound flight"
              : "Choose inbound flight"}
          </p>
        </div>
        <div className="flex gap-8">
          <div className="text-right">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">
              Departure
            </span>
            <span
              className={`text-sm font-bold ${
                isActive ? "text-[#24A8E0]" : "text-gray-400"
              }`}
            >
              {from}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-400 font-bold uppercase block">
              Arrival
            </span>
            <span
              className={`text-sm font-bold ${
                isActive ? "text-[#24A8E0]" : "text-gray-400"
              }`}
            >
              {to}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightRoadCard;
