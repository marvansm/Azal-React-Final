import { Search } from "lucide-react";

const BannerSection = () => {
  return (
    <section className="transform translate-y-[-16%] flex items-center justify-center relative z-10 bg-[url(https://www.azal.az/_next/static/media/main_background_05c9d34cb4.jpg)] min-h-[max(500px,80vh)] bg-no-repeat bg-position-[50%] pb-8 h-auto bg-cover bg-[#01357e]">
      <div className=" max-w-[1160px] mx-auto w-full">
        <div className="w-full">
          <div className="flex items-center gap-2">
            <button className="bg-[#FFF] py-3 px-5 rounded-t-xl text-[#01357E] font-medium text-[16px] leading-6 cursor-pointer">
              Aviabilet almaq
            </button>
            <button className="bg-[rgb(16_16_16/20%)] py-3 px-5 rounded-t-xl text-white cursor-pointer font-medium text-[16px] leading-6">
              Uçuşa qeydiyyat
            </button>
            <button className="bg-[rgb(16_16_16/20%)] py-3 px-5 rounded-t-xl text-white cursor-pointer font-medium text-[16px] leading-6">
              {" "}
              Rezervasiyanın idarə edilməsi
            </button>
            <button className="bg-[rgb(16_16_16/20%)] py-3 px-5 rounded-t-xl text-white cursor-pointer font-medium text-[16px] leading-6">
              Reysin statusu
            </button>
          </div>
          <div className="w-full">
            <div className="flex items-center bg-white rounded-b-xl rounded-tr-xl shadow-sm overflow-hidden  ">
              <div className="px-6 py-4 border-r border-gray-200 flex items-center rounded-l-full bg-white w-full">
                <span className="text-pink-600 font-medium">Haradan</span>
              </div>

              <div className="-ml-4 z-10 bg-white w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center shadow-sm">
                <span className="text-gray-700 text-sm">↻</span>
              </div>

              <div className="px-6 py-4 border-r border-gray-200 flex items-center w-full">
                <span className="text-gray-600">Haraya</span>
              </div>

              <div className="px-6 py-4 border-r border-gray-200 flex items-center gap-2 w-full">
                <span className="text-gray-600">Reys tarixi</span>
                <span className="text-gray-400 text-lg">📅</span>
              </div>

              <div className="px-6 py-4 border-r border-gray-200 flex items-center gap-2 w-full">
                <div>
                  <span className="text-gray-400 text-sm block leading-none">
                    Sərnişinlər
                  </span>
                  <span className="font-semibold">1, Ekonom</span>
                </div>
                <span className="text-gray-600 text-sm">⌄</span>
              </div>
              <button className="bg-blue-900 text-white px-6 h-full flex items-center justify-center rounded-r-full hover:bg-blue-800 transition">
                <Search />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
