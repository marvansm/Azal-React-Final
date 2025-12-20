import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import Logo from "../../Components/Logo";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import ApiServices from "../../../Services/api";

const PaymentSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const search = useSearch({ from: "/payment" }) as any;
  const bookingId = search.bookingId;
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [processing, setProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(formatCardNumber(value));
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    if (value.length <= 5) {
      setExpiryDate(value);
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCvc(value);
    }
  };

  const handlePayment = async () => {
    if (!cardNumber || !expiryDate || !cvc) {
      toast.error(t("toast.fillCardDetails") || t("payment.fillAllFields"));
      return;
    }

    setProcessing(true);

    try {
      if (bookingId) {
        const api = new ApiServices(import.meta.env.VITE_API_URL);
        await api.putData(`/bookings/${bookingId}`, {
          data: { status: "confirmed" },
        });
      }

      setTimeout(() => {
        setProcessing(false);
        toast.success(t("toast.paymentSuccess") || t("payment.paymentSuccess"));
        navigate({ to: "/" });
      }, 1000);
    } catch (error) {
      console.error("Payment status update error:", error);
      setProcessing(false);
      toast.error("Payment processed but booking status update failed");
    }
  };

  const handleCancel = () => {
    toast(
      (toastInstance) => (
        <div className="p-1">
          <p className="font-bold mb-3">{t("payment.cancelConfirm")}</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(toastInstance.id);
                navigate({ to: "/" });
              }}
              className="flex-1 bg-[#BE2044] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#a01a39] transition-colors"
            >
              {t("payment.yes") || "Yes"}
            </button>
            <button
              onClick={() => toast.dismiss(toastInstance.id)}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-300 transition-colors"
            >
              {t("payment.no") || "No"}
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#1a3a5c] via-[#2d4a6b] to-[#1a3a5c] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-8">
          <div className="text-white">
            <Logo />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-linear-to-r from-blue-50 to-white p-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-[#01357E] text-center">
              {t("payment.title")}
            </h1>
          </div>

          <div className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">
                {t("payment.cardNumber")}
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder={t("payment.cardPlaceholder")}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4BACE1] focus:outline-none transition-colors text-lg tracking-wider"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-600 mb-2">
                  {t("payment.expiryDate")}
                </label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={handleExpiryChange}
                  placeholder={t("payment.expiryPlaceholder")}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4BACE1] focus:outline-none transition-colors text-lg"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-gray-600 mb-2 flex items-center gap-2">
                  {t("payment.cvc")}
                  <button className="text-blue-400 hover:text-blue-600 text-xs underline">
                    {t("payment.whatIsCvc")}
                  </button>
                </label>
                <input
                  type="text"
                  value={cvc}
                  onChange={handleCvcChange}
                  placeholder={t("payment.cvcPlaceholder")}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#4BACE1] focus:outline-none transition-colors text-lg"
                />
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-linear-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-lg"
            >
              {processing ? t("payment.processing") : t("payment.pay")}
            </button>

            <button
              onClick={handleCancel}
              className="w-full text-[#BE2044] hover:text-[#a01a39] font-medium text-center transition-colors"
            >
              {t("payment.cancel")}
            </button>
          </div>

          <div className="bg-gray-50 p-6 border-t border-gray-100">
            <div className="flex justify-center items-center gap-4 mb-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
                className="h-8"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
                className="h-8"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                alt="Amex"
                className="h-8"
              />
              <div className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold">
                KapitalBank
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-[#4BACE1] font-bold">
              <Phone className="w-5 h-5" />
              <span className="text-2xl">194</span>
              <span className="text-sm text-gray-500">
                {t("payment.support")}
              </span>
            </div>
          </div>

          <div className="bg-white p-4 text-center text-xs text-gray-400 border-t border-gray-100">
            {t("payment.copyright")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
