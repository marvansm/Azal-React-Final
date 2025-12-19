import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const currencies = [
  { code: "AZN", name: "Manat" },
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "RUB", name: "Ruble" },
];

interface CurrencySelectorProps {
  isTransparent?: boolean;
}

import { useLoading } from "../../../Provider/LoadingProvider";

const CurrencySelector = ({ isTransparent = true }: CurrencySelectorProps) => {
  const { triggerLoading } = useLoading();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(currencies[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const buttonClasses = isTransparent
    ? "text-white border-transparent bg-[hsla(0,0%,100%,.1)] hover:bg-[#40b7de]"
    : "text-[#2E3034] border-[#d9d9d9] bg-[hsla(0,0%,100%,.1)] hover:bg-[#37A6DB] hover:text-white border";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-[14px] leading-6 h-12 flex items-center gap-2 p-3 rounded-xl cursor-pointer duration-300 ${buttonClasses}`}
      >
        {selected.code}
        <ChevronDown
          size={20}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 overflow-hidden z-50">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              className={`w-full text-left px-4 py-2 text-sm text-[#01357e] hover:bg-gray-50 flex items-center justify-between ${
                selected.code === curr.code ? "bg-blue-50 font-bold" : ""
              }`}
              onClick={() => {
                triggerLoading();
                setSelected(curr);
                setIsOpen(false);
              }}
            >
              <span>
                {curr.name} ({curr.code})
              </span>
              {selected.code === curr.code && (
                <span className="text-blue-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
