const BannerSection = () => {
  return (
    <section className="transform translate-y-[-16%] relative z-10 bg-[url(https://www.azal.az/_next/static/media/main_background_05c9d34cb4.jpg)] min-h-[max(500px,80vh)] bg-no-repeat bg-position-[50%] pb-8 h-auto bg-cover bg-[#01357e]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div>
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
          <div className="w-full max-w-5xl mx-auto mt-6">
            <div className="flex items-center bg-white rounded-full shadow-sm overflow-hidden border border-gray-200">
              <div className="px-6 py-4 border-r border-gray-200 flex items-center rounded-l-full bg-white">
                <span className="text-pink-600 font-medium">Haradan</span>
              </div>

              <div className="-ml-4 z-10 bg-white w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center shadow-sm">
                <span className="text-gray-700 text-sm">↻</span>
              </div>

              <div className="px-6 py-4 border-r border-gray-200 flex items-center">
                <span className="text-gray-600">Haraya</span>
              </div>

              <div className="px-6 py-4 border-r border-gray-200 flex items-center gap-2">
                <span className="text-gray-600">Reys tarixi</span>
                <span className="text-gray-400 text-lg">📅</span>
              </div>

              <div className="px-6 py-4 border-r border-gray-200 flex items-center gap-2">
                <div>
                  <span className="text-gray-400 text-sm block leading-none">
                    Sərnişinlər
                  </span>
                  <span className="font-semibold">1, Ekonom</span>
                </div>
                <span className="text-gray-600 text-sm">⌄</span>
              </div>

              <button className="bg-blue-900 text-white px-6 h-full flex items-center justify-center rounded-r-full hover:bg-blue-800 transition">
                🔍
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
