import React, { useState } from "react";
import MainLogo from "../Components/Logo/mainLogo";
import { Hand, CreditCard, Eye, EyeOff, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../Layout/Header/components/LanguageSelector";
import { Link } from "@tanstack/react-router";
import ApiServices from "../../Services/api";

const Login = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const api = new ApiServices(import.meta.env.VITE_API_URL);
      const response = await api.PostData("/auth/local", {
        identifier: formData.identifier,
        password: formData.password,
      });

      // Handle success - e.g., store JWT and redirect
      if (response && response.jwt) {
        localStorage.setItem("token", response.jwt);
        window.location.href = "/";
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error?.message ||
          "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen bg-white font-sans">
      {/* Left Sidebar - Reused from PersonalCabinet */}
      <div className="col-span-12 md:col-span-5 lg:col-span-3 pt-[132px] px-2.5 relative overflow-hidden bg-[#0033a1] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(95.22%_95.22%_at_9.5%_4.78%,rgb(14_103_227/100%)_0%,rgb(13_17_52/100%)_100%)] z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 364 588"
            preserveAspectRatio="xMidYMid slice"
            className="opacity-50 mix-blend-overlay absolute right-0 bottom-0"
          >
            <path
              fill="url(#paint0_linear_1_1327)"
              d="M-209.836 682.219c242.714-19.648 483.429-56.869 719.974-111.327l-10.981 45.872c-232.08 51.635-470.58 73.661-708.993 65.476"
            ></path>
            <path
              fill="url(#paint1_linear_1_1327)"
              d="M-171.244 659.779c237.446-35.182 471.238-89.257 698.824-161.634l-11.259 46.954C251.335 622.995 25.22 657.616-171.244 659.779Z"
            ></path>
            <path
              fill="url(#paint2_linear_1_1327)"
              d="M-134.248 635.811c231.514-55.596 458.571-126.28 679.504-211.531l-11.328 47.257C290.694 560.771 65.505 619.518-134.248 635.811Z"
            ></path>
            <path
              fill="url(#paint3_linear_1_1327)"
              d="M-97.326 607.481c231.467-68.856 454.259-160.95 664.47-274.67l-13.899 57.967C291.293 512.275 69.301 590.171-97.326 607.481Z"
            ></path>
            <path
              fill="url(#paint4_linear_1_1327)"
              d="M-49.484 577.604c223.831-101.145 438.64-218.855 642.37-352.004l-15.312 63.853C367.975 414.411 158.817 517.948-49.484 577.604Z"
            ></path>
            <path
              fill="url(#paint5_linear_1_1327)"
              d="M-12.713 540.555C214.187 410.066 427.58 260.117 624.7 92.653l-18.671 77.896C418.796 319.586 210.62 444.003-12.713 540.339M638.877 0l-70.213 1.71c-81.463 92.75-169.068 180.642-262.3 263.158C211.04 349.71 115.228 425.788 19.301 500.72 229.386 368.297 437.85 220.013 638.877.065"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_1_1327"
                x1="-168.967"
                x2="-72.722"
                y1="633.438"
                y2="965.79"
                gradientUnits="userSpaceOnUse outline-none"
              >
                <stop stopColor="#01357E"></stop>
                <stop offset="1" stopColor="#0260E4"></stop>
              </linearGradient>
              <linearGradient
                id="paint1_linear_1_1327"
                x1="-131.576"
                x2="54.404"
                y1="587.6"
                y2="1023.44"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#01357E"></stop>
                <stop offset="1" stopColor="#0260E4"></stop>
              </linearGradient>
              <linearGradient
                id="paint2_linear_1_1327"
                x1="-95.677"
                x2="195.511"
                y1="541.35"
                y2="1048.36"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#01357E"></stop>
                <stop offset="1" stopColor="#0260E4"></stop>
              </linearGradient>
              <linearGradient
                id="paint3_linear_1_1327"
                x1="-59.608"
                x2="362.546"
                y1="484.824"
                y2="1038.39"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#01357E"></stop>
                <stop offset="1" stopColor="#0260E4"></stop>
              </linearGradient>
              <linearGradient
                id="paint4_linear_1_1327"
                x1="-13.021"
                x2="547.946"
                y1="420.413"
                y2="975.301"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#01357E"></stop>
                <stop offset="1" stopColor="#0260E4"></stop>
              </linearGradient>
              <linearGradient
                id="paint5_linear_1_1327"
                x1="24.274"
                x2="813.236"
                y1="299.165"
                y2="814.656"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#01357E"></stop>
                <stop offset="1" stopColor="#0260E4"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-10 w-full h-full flex flex-col justify-center px-12 lg:px-20 py-12">
          <div className="mb-12">
            <h2 className="text-[20px] md:text-[24px] font-normal leading-[32px] mb-6">
              {t("cabinet.marketing.title")}
            </h2>
            <p className="text-lg text-blue-100 font-medium">
              {t("cabinet.marketing.subtitle")}
            </p>
          </div>

          <div className="space-y-8 mb-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Hand className="text-yellow-400" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">
                  {t("cabinet.marketing.welcomeMiles")}
                </h3>
                <p className="text-blue-100/80 text-sm leading-relaxed max-w-xs">
                  {t("cabinet.marketing.welcomeMilesDesc")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <CreditCard className="text-yellow-400" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">
                  {t("cabinet.marketing.awardTicket")}
                </h3>
                <p className="text-blue-100/80 text-sm leading-relaxed max-w-xs">
                  {t("cabinet.marketing.awardTicketDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="col-span-12 md:col-span-7 lg:col-span-9 bg-white flex flex-col h-full relative">
        {/* Top Bar */}
        <div className="flex justify-between items-center p-8 border-b border-transparent">
          <div className="flex items-center gap-6">
            <div className="w-[140px]">
              <MainLogo />
            </div>
            <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
            <span className="text-[#005eb8] font-bold text-xl italic tracking-tight hidden sm:block">
              AZALMiles
            </span>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSelector isTransparent={false} />
            <Link to="/cabinet">
              <button className="px-6 py-2.5 bg-[#0067dd] hover:bg-[#005a9e] text-white rounded-lg text-sm font-bold shadow-sm transition">
                {t("cabinet.register")}
              </button>
            </Link>
          </div>
        </div>

        {/* Login Form Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 lg:px-24">
          <div className="max-w-[400px] w-full">
            <div className="mb-8">
              <h1 className="text-[28px] font-bold text-[#2E3034] mb-2">
                {t("cabinet.login_page.title")}
              </h1>
              <p className="text-[#6B7280] text-base">
                {t("cabinet.login_page.subtitle")}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#2E3034]">
                  {t("cabinet.login_page.membership")}
                </label>
                <input
                  type="text"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder={t("cabinet.login_page.membershipPlaceholder")}
                  className="w-full px-4 py-3 rounded-[10px] border border-[#D1D5DB] focus:border-[#3CA8FB] focus:ring-1 focus:ring-[#3CA8FB] outline-none transition placeholder:text-gray-400 text-[#2E3034]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-[#2E3034]">
                  {t("cabinet.login_page.password")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t("cabinet.login_page.passwordPlaceholder")}
                    className="w-full px-4 py-3 rounded-[10px] border border-[#D1D5DB] focus:border-[#3CA8FB] focus:ring-1 focus:ring-[#3CA8FB] outline-none transition placeholder:text-gray-400 text-[#2E3034] pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-300 text-[#3CA8FB] focus:ring-[#3CA8FB]"
                  />
                  <span className="text-[14px] text-[#2E3034]">
                    {t("cabinet.login_page.keepMeLoggedIn")}
                  </span>
                </label>
                <button
                  type="button"
                  className="text-[14px] text-[#3CA8FB] hover:text-[#005eb8] font-medium"
                >
                  {t("cabinet.login_page.restoreAccount")}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-[10px] font-bold text-white transition shadow-sm ${
                  loading
                    ? "bg-[#3CA8FB]/70 cursor-not-allowed"
                    : "bg-[#9ACCEB] hover:bg-[#3CA8FB]"
                } flex items-center justify-center gap-2`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  t("cabinet.login_page.loginBtn")
                )}
              </button>
            </form>

            <div className="my-8 flex items-center gap-4 text-gray-400 text-sm">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span>{t("cabinet.login_page.or")}</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="space-y-4">
              <Link to="/cabinet" className="block w-full">
                <button className="w-full py-3.5 bg-[#F3F4F6] hover:bg-gray-200 text-[#2E3034] font-bold rounded-[10px] transition flex items-center justify-center gap-2">
                  <User size={18} className="text-[#3CA8FB]" />
                  {t("cabinet.login_page.registerBtn")}
                </button>
              </Link>

              <button className="w-full py-3.5 bg-[#F3F4F6] hover:bg-gray-200 text-[#2E3034] font-bold rounded-[10px] transition flex items-center justify-center gap-3">
                <svg width="20" height="20" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.13-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                </svg>
                {t("cabinet.login_page.registerGoogle")}
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Footer */}
        <div className="p-8 text-center md:text-left text-gray-400 text-sm mt-auto">
          © Azerbaijan Airlines 2025
        </div>
      </div>
    </div>
  );
};

export default Login;
