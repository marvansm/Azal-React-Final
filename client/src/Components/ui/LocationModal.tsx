import { Search, Plane, X } from "lucide-react";
import { useEffect, useState } from "react";

export interface Location {
  id: number;
  city: string;
  country: string;
  code: string;
}

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: Location) => void;
  title: string;
  locations?: Location[];
}

const locationsData: Location[] = [
  { id: 1, city: "Baku", country: "Azerbaijan", code: "GYD" },
  { id: 2, city: "Istanbul", country: "Türkiye", code: "IST" },
  { id: 3, city: "Moscow", country: "Russia", code: "VKO" },
  { id: 4, city: "Dubai", country: "United Arab Emirates", code: "DXB" },
  { id: 5, city: "London", country: "United Kingdom", code: "LHR" },
  { id: 6, city: "Paris", country: "France", code: "CDG" },
  { id: 7, city: "New York", country: "United States", code: "JFK" },
  { id: 8, city: "Tbilisi", country: "Georgia", code: "TBS" },
];

const LocationModal = ({
  isOpen,
  onClose,
  onSelect,
  title,
  locations = locationsData,
}: LocationModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLocations, setFilteredLocations] =
    useState<Location[]>(locations);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setSearchTerm("");
      setFilteredLocations(locations);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Wait for animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    setFilteredLocations(
      locations.filter(
        (loc) =>
          loc.city.toLowerCase().includes(lowerTerm) ||
          loc.country.toLowerCase().includes(lowerTerm) ||
          loc.code.toLowerCase().includes(lowerTerm)
      )
    );
  }, [searchTerm]);

  if (!isVisible && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center sm:items-center pointer-events-none transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 pointer-events-auto"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative bg-white w-full max-w-lg sm:rounded-xl rounded-t-xl p-6 shadow-2xl pointer-events-auto transition-transform duration-300 transform ${
          isOpen
            ? "translate-y-0"
            : "translate-y-full sm:translate-y-10 sm:scale-95"
        }`}
        style={{ maxHeight: "85vh" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search country, city or airport"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            autoFocus
          />
        </div>

        <div className="overflow-y-auto max-h-[50vh] flex flex-col gap-2">
          {filteredLocations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => onSelect(loc)}
              className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg group transition text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">{loc.city}</div>
                  <div className="text-sm text-gray-500">{loc.country}</div>
                </div>
              </div>
              <span className="text-gray-400 font-mono font-medium group-hover:text-blue-600 transition">
                {loc.code}
              </span>
            </button>
          ))}
          {filteredLocations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No locations found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
