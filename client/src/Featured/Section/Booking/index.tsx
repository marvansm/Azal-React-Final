import { Search, Check } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import ApiServices from "../../../Services/api.tsx";
import type { Flight } from "../../../Types/strapi";
import FlightResultCard from "../../Components/FlightResultCard";
import PriceCard from "../../Components/FlightPriceCard";
import FlightRoadCard from "../../Components/FlightRoadCard";
import LocationModal, {
  type Location,
} from "../../../Components/ui/LocationModal";
import PassengerModal, {
  type Passengers,
  type CabinClass,
} from "../../../Components/ui/PassengerModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../Section/Home/BannerSection/datepicker-custom.css";

const BookingMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.search as any;

  const {
    from,
    to,
    start,
    end,
    adults: initialAdults,
    children: initialChildren,
    infants: initialInfants,
    class: initialClass,
  } = searchParams;

  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [locations, setLocations] = useState<Location[]>([]);
  const [fromLoc, setFromLoc] = useState<Location | null>(null);
  const [toLoc, setToLoc] = useState<Location | null>(null);
  const [modalMode, setModalMode] = useState<"from" | "to" | null>(null);

  const [startDate, setStartDate] = useState<Date | null>(
    start ? new Date(start) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    end ? new Date(end) : null
  );

  const [passengerModalOpen, setPassengerModalOpen] = useState(false);
  const [passengers, setPassengers] = useState<Passengers>({
    adults: Number(initialAdults) || 1,
    children: Number(initialChildren) || 0,
    infants: Number(initialInfants) || 0,
  });
  const [cabinClass, setCabinClass] = useState<CabinClass>(
    initialClass || "Economy"
  );

  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  const [selectionStep, setSelectionStep] = useState<"outbound" | "inbound">(
    "outbound"
  );
  const [selectedOutbound, setSelectedOutbound] = useState<Flight | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const api = new ApiServices(import.meta.env.VITE_API_URL);
        const data = await api.getData("/locations");
        if (data && data.data) {
          const mapped = data.data.map((item: any) => ({
            id: item.id,
            ...(item.attributes || item),
          }));
          setLocations(mapped);

          const fromObj = mapped.find((l: any) => l.code === from);
          const toObj = mapped.find((l: any) => l.code === to);
          if (fromObj) setFromLoc(fromObj);
          if (toObj) setToLoc(toObj);
        }
      } catch (err) {
        console.error("Failed to fetch locations", err);
      }
    };
    fetchLocations();
  }, [from, to]);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError(null);
      try {
        const api = new ApiServices(import.meta.env.VITE_API_URL);
        const query = `/flights?populate=*`;
        const data = await api.getData(query);

        if (data && data.data) {
          const allFlights = data.data;

          const getCode = (loc: any) => {
            if (!loc) return "";
            if (loc.data?.attributes) return loc.data.attributes.code;
            return loc.code || "";
          };

          const sorted = [...allFlights].sort((a: any, b: any) => {
            const aData = a.attributes || a;
            const bData = b.attributes || b;

            const aOrigin = getCode(aData.origin);
            const aDest = getCode(aData.destination);
            const bOrigin = getCode(bData.origin);
            const bDest = getCode(bData.destination);

            const currentFrom = selectionStep === "outbound" ? from : to;
            const currentTo = selectionStep === "outbound" ? to : from;

            const aMatch = aOrigin === currentFrom && aDest === currentTo;
            const bMatch = bOrigin === currentFrom && bDest === currentTo;

            if (aMatch && !bMatch) return -1;
            if (!aMatch && bMatch) return 1;
            return 0;
          });

          setFlights(sorted);
        }
      } catch (err) {
        console.error("Error fetching flights:", err);
        setError("Failed to load flights. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [from, to, start, selectionStep]);

  const handleSearch = () => {
    if (!fromLoc || !toLoc || !startDate) return;

    navigate({
      to: "/booking",
      search: {
        from: fromLoc.code,
        to: toLoc.code,
        start: startDate.toISOString(),
        end: endDate?.toISOString(),
        adults: passengers.adults,
        children: passengers.children,
        infants: passengers.infants,
        class: cabinClass,
      } as any,
    });
  };

  const handleSwap = () => {
    const temp = fromLoc;
    setFromLoc(toLoc);
    setToLoc(temp);
  };

  const handleSelect = (flight: Flight, seatClass: "economy" | "business") => {
    if (end && selectionStep === "outbound") {
      setSelectedOutbound(flight);
      setSelectionStep("inbound");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate({
        to: "/confirmation",
        search: {
          outboundId: selectedOutbound ? selectedOutbound.id : flight.id,
          inboundId: selectedOutbound ? flight.id : undefined,
          class: seatClass,
          adults: passengers.adults,
          children: passengers.children,
          infants: passengers.infants,
        } as any,
      });
    }
  };

  return (
    <div className="max-w-[1160px] mx-auto w-full">
      <div className="w-full rounded-r-xl overflow-hidden rounded-b-xl bg-transparent py-6">
        <div className="rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div
              className="px-6 py-4 flex items-center bg-transparent w-full border-r border-gray-200 relative cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setModalMode("from")}
            >
              <div className="flex flex-col">
                <span className="text-pink-600 font-medium text-xs">From</span>
                <span className="text-[#01357E] font-bold text-lg">
                  {fromLoc ? fromLoc.city : "Select"}
                  {fromLoc && (
                    <span className="text-gray-400 font-normal ml-2">
                      {fromLoc.code}
                    </span>
                  )}
                </span>
              </div>

              <div
                className="z-10 bg-white w-8 h-8 rounded-full border border-gray-200 px-1 absolute right-[-17px] flex items-center justify-center shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSwap();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="9.49 6.4 11.02 13.2"
                  className="w-4 h-4 text-gray-600"
                >
                  <g
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="m17.727 7 2.182 2.182-2.182 2.182"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M10.09 12.454v-1.09a2.182 2.182 0 0 1 2.183-2.182h7.636"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M12.273 19 10.09 16.82l2.182-2.182"
                      stroke="currentColor"
                    ></path>
                    <path
                      d="M19.909 13.545v1.09a2.182 2.182 0 0 1-2.182 2.183h-7.636"
                      stroke="currentColor"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>

            {/* To */}
            <div
              className="px-6 py-4 flex items-center w-full border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setModalMode("to")}
            >
              <div className="flex flex-col">
                <span className="text-gray-600 text-xs">To</span>
                <span className="text-[#01357E] font-bold text-lg">
                  {toLoc ? toLoc.city : "Select"}
                  {toLoc && (
                    <span className="text-gray-400 font-normal ml-2">
                      {toLoc.code}
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Date */}
            <div className="px-6 py-4 flex flex-col justify-center w-full border-r border-gray-200 min-w-[220px]">
              <span className="text-gray-600 text-xs mb-1">Flight date</span>
              <DatePicker
                selected={startDate}
                onChange={(dates: [Date | null, Date | null]) => {
                  const [start, end] = dates;
                  setStartDate(start);
                  setEndDate(end);
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                minDate={new Date()}
                dateFormat="dd MMM yyyy"
                className="w-full outline-none font-bold text-[#01357E] text-lg bg-transparent cursor-pointer"
                placeholderText="Select date"
              />
            </div>

            <div
              className="px-6 py-4 flex items-center gap-2 w-full border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setPassengerModalOpen(true)}
            >
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm block leading-none mb-1">
                  Passengers
                </span>
                <span className="text-[#01357E] font-bold text-lg">
                  {totalPassengers}, {cabinClass}
                </span>
              </div>
              <span className="text-gray-400 ml-auto">⌄</span>
            </div>

            <div
              className="bg-[#0067dd] py-6 px-8 flex items-center justify-center hover:bg-[#005a9e] transition cursor-pointer disabled:opacity-50"
              onClick={handleSearch}
            >
              <button disabled={!fromLoc || !toLoc || !startDate}>
                <Search className="text-white w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <LocationModal
        isOpen={modalMode !== null}
        onClose={() => setModalMode(null)}
        onSelect={(loc) => {
          setModalMode(null);
          modalMode === "from" ? setFromLoc(loc) : setToLoc(loc);
        }}
        title={modalMode === "from" ? "Select Origin" : "Select Destination"}
        locations={locations}
      />
      <PassengerModal
        isOpen={passengerModalOpen}
        onClose={() => setPassengerModalOpen(false)}
        currentPassengers={passengers}
        currentClass={cabinClass}
        onApply={(p, c) => {
          setPassengers(p);
          setCabinClass(c);
          setPassengerModalOpen(false);
        }}
      />

      <div className={`grid ${end ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
        <FlightRoadCard
          type="outbound"
          isActive={selectionStep === "outbound"}
          from={fromLoc?.city || from || ""}
          to={toLoc?.city || to || ""}
        />
        {end && (
          <FlightRoadCard
            type="inbound"
            isActive={selectionStep === "inbound"}
            from={toLoc?.city || to || ""}
            to={fromLoc?.city || from || ""}
          />
        )}
      </div>

      <Swiper
        slidesPerView={6}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper  mt-10  flex items-center gap-6"
      >
        {[...Array(7)].map((_, i) => (
          <SwiperSlide key={i}>
            <PriceCard />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-gray-700">Sort by:</span>
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm cursor-pointer">
              <option>Recommended</option>
              <option>Price (Low to High)</option>
              <option>Duration</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-start flex-col gap-5">
          {loading && (
            <div className="w-full text-center py-10">Loading flights...</div>
          )}
          {error && (
            <div className="w-full text-center py-10 text-red-500">{error}</div>
          )}
          {!loading && !error && flights.length === 0 && (
            <div className="w-full text-center py-10">
              No flights found for your search.
            </div>
          )}

          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-2xl font-bold text-[#01357E]">
              {selectionStep === "outbound"
                ? "Select Outbound Flight"
                : "Select Inbound Flight"}
            </h2>
            {selectedOutbound && (
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-bold border border-green-100">
                <Check className="w-4 h-4" /> Outbound Selected
              </div>
            )}
          </div>

          {flights.map((flight) => (
            <FlightResultCard
              key={flight.id}
              flight={flight}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingMenu;
