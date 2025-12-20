import React, { useState } from "react";
import MainLogo from "../Components/Logo/mainLogo";
import {
  ChevronDown,
  Hand,
  CreditCard,
  Mail,
  Phone,
  Lock,
  FileText,
  Check,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../Layout/Header/components/LanguageSelector";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../Provider/AuthProvider";
import PersonalCabinetSection from "../Section/PersonalCabinet";

const PersonalCabinet = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <PersonalCabinetSection />;
  }

  return <RegisterForm />;
};

const RegisterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    dateOfBirth: "",
    gender: "",
    documentNumber: "",
    documentExpiry: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError(t("cabinet.form.errorPasswordMismatch"));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const username = `${formData.name.toLowerCase()}_${formData.surname.toLowerCase()}`;
      const registerSuccess = await register(
        username,
        formData.email,
        formData.password
      );

      if (registerSuccess) {
        setSuccess(true);
        setTimeout(() => {
          navigate({ to: "/cabinet" });
        }, 2000);
      } else {
        setError(t("cabinet.form.errorRegistrationFailed"));
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error?.message ||
          t("cabinet.form.errorRegistrationFailed")
      );
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 animate-fadeIn">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#2E3034]">
                {t("cabinet.form.name")}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("cabinet.form.namePlaceholder")}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-[#0067dd] focus:ring-2 focus:ring-blue-100 outline-none transition placeholder:text-gray-400 text-[#2E3034]"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#2E3034]">
                {t("cabinet.form.surname")}
              </label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder={t("cabinet.form.surnamePlaceholder")}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-[#0067dd] focus:ring-2 focus:ring-blue-100 outline-none transition placeholder:text-gray-400 text-[#2E3034]"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#2E3034]">
                {t("cabinet.form.dob")}
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-[#0067dd] focus:ring-2 focus:ring-blue-100 outline-none transition text-[#2E3034] pr-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#2E3034]">
                {t("cabinet.form.gender")}
              </label>
              <div className="relative">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-[#0067dd] focus:ring-2 focus:ring-blue-100 outline-none transition text-[#2E3034] appearance-none bg-white font-normal"
                >
                  <option value="" disabled>
                    {t("cabinet.form.selectGender")}
                  </option>
                  <option value="male">{t("cabinet.form.male")}</option>
                  <option value="female">{t("cabinet.form.female")}</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={20}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 animate-fadeIn">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#2E3034]">
                {t("cabinet.form.docNumber")}
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="documentNumber"
                  value={formData.documentNumber}
                  onChange={handleChange}
                  placeholder={t("cabinet.form.docNumberPlaceholder")}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-[#0067dd] focus:ring-2 focus:ring-blue-100 outline-none transition placeholder:text-gray-400 text-[#2E3034]"
                />
                <FileText
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#2E3034]">
                {t("cabinet.form.expiryDate")}
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="documentExpiry"
                  value={formData.documentExpiry}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-[#0067dd] focus:ring-2 focus:ring-blue-100 outline-none transition text-[#2E3034]"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 animate-fadeIn">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#2E3034]">
                {t("cabinet.form.email")}
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("cabinet.form.emailPlaceholder")}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-[#0067dd] focus:ring-2 focus:ring-blue-100 outline-none transition placeholder:text-gray-400 text-[#2E3034]"
                />
                <Mail
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#2E3034]">
                {t("cabinet.form.phone")}
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder={t("cabinet.form.phonePlaceholder")}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-[#0067dd] focus:ring-2 focus:ring-blue-100 outline-none transition placeholder:text-gray-400 text-[#2E3034]"
                />
                <Phone
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 animate-fadeIn">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#2E3034]">
                {t("cabinet.form.pass")}
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t("cabinet.form.passPlaceholder")}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-[#0067dd] focus:ring-2 focus:ring-blue-100 outline-none transition placeholder:text-gray-400 text-[#2E3034]"
                />
                <Lock
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#2E3034]">
                {t("cabinet.form.confirmPass")}
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={t("cabinet.form.confirmPassPlaceholder")}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-[#0067dd] focus:ring-2 focus:ring-blue-100 outline-none transition placeholder:text-gray-400 text-[#2E3034]"
                />
                <Lock
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t("cabinet.success.title")}
          </h1>
          <p className="text-gray-600 mb-8">{t("cabinet.success.subtitle")}</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full py-4 bg-[#0067dd] text-white rounded-xl font-bold hover:bg-[#005a9e] transition shadow-lg"
          >
            {t("cabinet.success.returnHome")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen bg-white font-sans">
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
                gradientUnits="userSpaceOnUse"
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
            <h2 className="text-[20px] md:text-[24px] font-normal leading-8 mb-6">
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

          <div className="flex gap-2.5 mt-12">
            <div className="w-2.5 h-2.5 rounded-full bg-white cursor-pointer"></div>
            <div
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
                step >= 2 ? "bg-white" : "bg-white/30"
              }`}
            ></div>
            <div
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
                step >= 3 ? "bg-white" : "bg-white/30"
              }`}
            ></div>
            <div
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
                step >= 4 ? "bg-white" : "bg-white/30"
              }`}
            ></div>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-7 lg:col-span-9 bg-white flex flex-col h-full relative">
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
            <Link to="/login">
              <button className="px-6 py-2.5 bg-[#0067dd] hover:bg-[#005a9e] text-white rounded-lg text-sm font-bold shadow-sm transition">
                {t("cabinet.login")}
              </button>
            </Link>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8 lg:px-24 py-8">
          <div className="flex justify-center items-center gap-4 mb-16 text-sm">
            <div
              className={`flex items-center gap-2 transition ${
                step >= 1 ? "opacity-100" : "opacity-50"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition ${
                  step === 1
                    ? "bg-[#0067dd] text-white"
                    : step > 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {step > 1 ? <Check size={16} /> : "1"}
              </span>
              <span
                className={`font-bold transition ${
                  step >= 1 ? "text-[#0067dd]" : "text-gray-500"
                }`}
              >
                {t("cabinet.stepper.personalInfo")}
              </span>
            </div>
            <div
              className={`w-4 h-0.5 transition ${
                step > 1 ? "bg-green-500" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`flex items-center gap-2 transition ${
                step >= 2 ? "opacity-100" : "opacity-50"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition ${
                  step === 2
                    ? "bg-[#0067dd] text-white"
                    : step > 2
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {step > 2 ? <Check size={16} /> : "2"}
              </span>
              <span
                className={`font-medium hidden sm:inline transition ${
                  step >= 2 ? "text-[#0067dd]" : "text-gray-500"
                }`}
              >
                {t("cabinet.stepper.documentInfo")}
              </span>
            </div>
            <div
              className={`w-4 h-0.5 transition ${
                step > 2 ? "bg-green-500" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`flex items-center gap-2 transition ${
                step >= 3 ? "opacity-100" : "opacity-50"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition ${
                  step === 3
                    ? "bg-[#0067dd] text-white"
                    : step > 3
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {step > 3 ? <Check size={16} /> : "3"}
              </span>
              <span
                className={`font-medium hidden sm:inline transition ${
                  step >= 3 ? "text-[#0067dd]" : "text-gray-500"
                }`}
              >
                {t("cabinet.stepper.contactInfo")}
              </span>
            </div>
            <div
              className={`w-4 h-0.5 transition ${
                step > 3 ? "bg-green-500" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`flex items-center gap-2 transition ${
                step >= 4 ? "opacity-100" : "opacity-50"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition ${
                  step === 4
                    ? "bg-[#0067dd] text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                4
              </span>
              <span
                className={`font-medium hidden sm:inline transition ${
                  step >= 4 ? "text-[#0067dd]" : "text-gray-500"
                }`}
              >
                {t("cabinet.stepper.password")}
              </span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="mb-10">
              <h1 className="text-2xl lg:text-3xl font-bold text-[#2E3034] mb-3">
                {t("cabinet.form.title")}
              </h1>
              <p className="text-gray-500 text-base">
                {t("cabinet.form.subtitle")}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            {renderStep()}

            <div className="flex justify-between mt-12">
              <button
                onClick={handleBack}
                className={`px-8 py-3.5 border border-gray-300 text-gray-600 font-bold rounded-xl transition hover:bg-gray-50 ${
                  step === 1 ? "invisible" : ""
                }`}
              >
                {t("cabinet.form.back")}
              </button>

              {step < 4 ? (
                <button
                  onClick={handleNext}
                  className="px-10 py-3.5 bg-[#0067dd] text-white font-bold rounded-xl hover:bg-[#005a9e] transition shadow-lg"
                >
                  {t("cabinet.form.next")}
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-10 py-3.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {t("cabinet.form.processing")}
                    </>
                  ) : (
                    t("cabinet.form.complete")
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-8 text-center md:text-left text-gray-400 text-sm mt-auto">
          © Azerbaijan Airlines 2025
        </div>
      </div>
    </div>
  );
};

export default PersonalCabinet;
