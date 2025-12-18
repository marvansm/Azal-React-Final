import { Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

export type CabinClass = "Economy" | "Business";

export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}

interface PassengerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPassengers: Passengers;
  currentClass: CabinClass;
  onApply: (passengers: Passengers, cabinClass: CabinClass) => void;
}

const PassengerModal = ({
  isOpen,
  onClose,
  currentPassengers,
  currentClass,
  onApply,
}: PassengerModalProps) => {
  const [passengers, setPassengers] = useState<Passengers>(currentPassengers);
  const [cabinClass, setCabinClass] = useState<CabinClass>(currentClass);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setPassengers(currentPassengers);
      setCabinClass(currentClass);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentPassengers, currentClass]);

  const updatePassenger = (type: keyof Passengers, delta: number) => {
    setPassengers((prev) => {
      const newValue = prev[type] + delta;
      if (newValue < 0) return prev;
      // Rules:
      // - Adults min 1 (unless we allow 0 for unaccompanied minors selection, but usually 1)
      // - Infants cannot exceed Adults? (Common rule, but let's keep it simple for now or implement if requested. Let's enforce 1 adult min)
      if (type === "adults" && newValue < 1) return prev;

      return { ...prev, [type]: newValue };
    });
  };

  // Calculate total for display limits if needed, practically max 9
  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  const handleApply = () => {
    onApply(passengers, cabinClass);
    onClose();
  };

  if (!isVisible && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 pointer-events-auto"
        onClick={handleApply}
      />

      {/* Modal Content */}
      <div
        className={`relative bg-white w-full max-w-md rounded-xl p-6 shadow-2xl pointer-events-auto transform transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            Passengers & Class
          </h3>
          <button
            onClick={handleApply}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Cabin Class Selection */}
        <div className="bg-gray-100 p-1 rounded-lg flex mb-8">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition duration-200 ${
              cabinClass === "Economy"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setCabinClass("Economy")}
          >
            Economy
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition duration-200 ${
              cabinClass === "Business"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setCabinClass("Business")}
          >
            Business
          </button>
        </div>

        {/* Passengers Counters */}
        <div className="space-y-6 mb-8">
          {/* Adults */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-800">Adults</div>
              <div className="text-sm text-gray-500">Over 12 years</div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => updatePassenger("adults", -1)}
                disabled={passengers.adults <= 1}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 disabled:opacity-30 disabled:hover:border-gray-300 disabled:hover:text-gray-600 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-4 text-center font-medium text-lg">
                {passengers.adults}
              </span>
              <button
                onClick={() => updatePassenger("adults", 1)}
                disabled={totalPassengers >= 9}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 disabled:opacity-30 disabled:hover:border-gray-300 disabled:hover:text-gray-600 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-800">Children</div>
              <div className="text-sm text-gray-500">2 - 11 years</div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => updatePassenger("children", -1)}
                disabled={passengers.children <= 0}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 disabled:opacity-30 disabled:hover:border-gray-300 disabled:hover:text-gray-600 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-4 text-center font-medium text-lg">
                {passengers.children}
              </span>
              <button
                onClick={() => updatePassenger("children", 1)}
                disabled={totalPassengers >= 9}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 disabled:opacity-30 disabled:hover:border-gray-300 disabled:hover:text-gray-600 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Infants */}
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-800">Infants</div>
              <div className="text-sm text-gray-500">Under 2 years</div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => updatePassenger("infants", -1)}
                disabled={passengers.infants <= 0}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 disabled:opacity-30 disabled:hover:border-gray-300 disabled:hover:text-gray-600 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-4 text-center font-medium text-lg">
                {passengers.infants}
              </span>
              <button
                onClick={() => updatePassenger("infants", 1)}
                disabled={totalPassengers >= 9}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-blue-500 hover:text-blue-500 disabled:opacity-30 disabled:hover:border-gray-300 disabled:hover:text-gray-600 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleApply}
            className="w-full bg-[#00357e] text-white py-3 rounded-xl font-semibold hover:bg-[#002860] transition shadow-lg active:scale-95"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerModal;
