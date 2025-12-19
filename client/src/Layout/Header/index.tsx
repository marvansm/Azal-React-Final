import { List } from "lucide-react";
import Logo from "../../Featured/Components/Logo";
import { useLocation } from "@tanstack/react-router";
import MainLogo from "../../Featured/Components/Logo/mainLogo";
import CurrencySelector from "./components/CurrencySelector";
import LanguageSelector from "./components/LanguageSelector";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const userButtonClasses = isHomePage
    ? "text-[14px] leading-6 h-12 flex items-center gap-2 p-3 border border-transparent rounded-xl cursor-pointer text-white bg-[hsla(0,0%,100%,.1)] hover:bg-[#40b7de] duration-300"
    : "text-[14px] leading-6 h-12 flex items-center gap-2 p-3 border hover:text-white border-[#d9d9d9] rounded-xl cursor-pointer text-[#2E3034] bg-[hsla(0,0%,100%,.1)] hover:bg-[#37A6DB] duration-300";

  return (
    <header className={`flex items-center justify-between p-8 relative z-22 `}>
      <div>
        <h1 className="text-2xl">{isHomePage ? <Logo /> : <MainLogo />}</h1>
      </div>
      <nav
        className={`flex items-center gap-4 ${
          isHomePage ? "text-white" : "text-[#2E3034]"
        }`}
      >
        <CurrencySelector isTransparent={isHomePage} />
        <LanguageSelector isTransparent={isHomePage} />

        <button className={userButtonClasses}>
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="4 2 16 20"
            className="_root_1q0tt_1 _size_20_1q0tt_30"
          >
            <path d="M12 2C9.247 2 7 4.247 7 7s2.247 5 5 5c2.752 0 5-2.247 5-5s-2.248-5-5-5zm0 1.5c1.942 0 3.5 1.558 3.5 3.5s-1.558 3.5-3.5 3.5A3.489 3.489 0 0 1 8.5 7c0-1.942 1.558-3.5 3.5-3.5zM6.25 14A2.261 2.261 0 0 0 4 16.25v.6c0 1.47.932 2.789 2.354 3.696C7.777 21.453 9.722 22 12 22s4.223-.547 5.645-1.454C19.069 19.639 20 18.32 20 16.85v-.6A2.261 2.261 0 0 0 17.75 14H6.25zm0 1.5h11.5c.423 0 .75.327.75.75v.6c0 .832-.536 1.714-1.661 2.431C15.714 20 14.034 20.5 12 20.5c-2.034 0-3.714-.501-4.839-1.219C6.036 18.564 5.5 17.682 5.5 16.85v-.6c0-.423.327-.75.75-.75z"></path>
          </svg>
          {t("header.cabinet")}
        </button>
        {isHomePage && (
          <button className="text-[14px] leading-6 h-12 flex items-center gap-2 p-3 border border-transparent rounded-xl cursor-pointer text-white bg-[hsla(0,0%,100%,.1)] hover:bg-[#40b7de] duration-300">
            <List size={20} />
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
