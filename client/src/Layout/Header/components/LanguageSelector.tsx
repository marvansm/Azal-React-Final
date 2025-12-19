import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "az", name: "Azərbaycan" },
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
];

interface LanguageSelectorProps {
  isTransparent?: boolean;
}

const LanguageSelector = ({ isTransparent = true }: LanguageSelectorProps) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  const [selected, setSelected] = useState(
    languages.find((lang) => lang.code === i18n.language) || languages[0]
  );

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

  const changeLanguage = (lang: (typeof languages)[0]) => {
    setSelected(lang);
    i18n.changeLanguage(lang.code);
    setIsOpen(false);
  };

  const buttonClasses = isTransparent
    ? "text-white border-transparent bg-[hsla(0,0%,100%,.1)] hover:bg-[#40b7de]"
    : "text-[#2E3034] border-[#d9d9d9] bg-[hsla(0,0%,100%,.1)] hover:bg-[#37A6DB] hover:text-white border";

  const iconColor = isTransparent ? "currentColor" : "currentColor"; 

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-[14px] leading-6 h-12 flex items-center gap-2 p-3 rounded-xl cursor-pointer duration-300 ${buttonClasses}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 20 20"
          className="SvgIcon_root__8IE4V SvgIcon_size_20__5gsbQ"
        >
          <path
            fill={iconColor}
            d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0m0 1.5c.366 0 .738.152 1.146.528.409.376.823.973 1.177 1.744.285.62.495 1.416.688 2.228H6.989c.193-.812.403-1.607.688-2.228.354-.77.768-1.368 1.177-1.744.408-.376.78-.528 1.146-.528m-3.111.594c-.207.325-.4.672-.576 1.052-.38.829-.666 1.809-.887 2.854H2.498a8.5 8.5 0 0 1 4.39-3.906m6.222 0A8.5 8.5 0 0 1 17.502 6h-2.928c-.222-1.045-.507-2.025-.887-2.854a9 9 0 0 0-.576-1.052M1.874 7.5H5.23C5.128 8.316 5 9.116 5 10s.128 1.684.23 2.5H1.874a8.53 8.53 0 0 1 0-5m4.86 0h6.533c.111.807.233 1.61.233 2.5s-.122 1.693-.233 2.5H6.733c-.111-.807-.233-1.61-.233-2.5s.122-1.693.233-2.5m8.036 0h3.356a8.53 8.53 0 0 1 0 5h-3.357c.103-.816.231-1.616.231-2.5s-.128-1.684-.23-2.5M2.498 14h2.928c.221 1.045.507 2.025.887 2.854.175.38.369.727.576 1.052A8.5 8.5 0 0 1 2.498 14m4.491 0h6.022c-.193.812-.403 1.607-.688 2.227-.354.772-.768 1.369-1.177 1.745-.408.375-.78.528-1.146.528s-.738-.152-1.146-.528c-.409-.376-.823-.973-1.177-1.745-.285-.62-.495-1.415-.688-2.227m7.585 0h2.928a8.5 8.5 0 0 1-4.39 3.906c.206-.325.4-.672.575-1.052.38-.829.665-1.809.887-2.854"
          ></path>
        </svg>
        {selected.name}
        <ChevronDown
          size={20}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`w-full text-left px-4 py-2 text-sm text-[#01357e] hover:bg-gray-50 flex items-center justify-between ${
                selected.code === lang.code ? "bg-blue-50 font-bold" : ""
              }`}
              onClick={() => changeLanguage(lang)}
            >
              {lang.name}
              {selected.code === lang.code && (
                <span className="text-blue-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
