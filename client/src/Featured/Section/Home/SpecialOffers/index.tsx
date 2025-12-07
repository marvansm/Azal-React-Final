import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const SpecialOffers = () => {
  const Ads = [
    "https://www.azal.az/_next/static/media/azalbannereng_87310b587b.png",
    "https://www.azal.az/_next/static/media/ABB_AZAL_MILES_10_times_A_YEAR_ENG_2313176a0b.jpg",
    "https://www.azal.az/_next/static/media/Telebe_Endirimi1160x150_eng_e962165095.png",
  ];
  return (
    <div className="max-w-[1160px]   mx-auto">
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {Ads &&
          Ads.map((item: any, idx: number) => (
            <SwiperSlide key={idx} className="rounded-xl overflow-hidden">
              <img src={item} alt="" />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="grid grid-cols-2 mt-20 gap-3">
        <div className="left  overflow-hidden  flex items-center">
          <img
            src="https://www.azal.az/_next/static/media/UCARD_Offer_2400x1350_eng_4d83f4092a.jpg"
            alt=""
            className="max-w-[350px] h-full object-cover rounded-lg"
          />
          <div className="body max-w-[272px] pl-6 flex flex-col items-start gap-2  ">
            <h2 className="text-[20px] leading-7 text-[#2e3034] font-normal">
              Get AZAL tickets with UCARD and earn up to 5% cashback!
            </h2>
            <p className="text-[14px] leading-5 text-[#6e7583]">
              Get AZAL tickets with UCARD and earn up to 5% cashback!
            </p>
            <button>Read more</button>
          </div>
        </div>
        <div className="left  overflow-hidden  flex items-center">
          <img
            src="https://www.azal.az/_next/static/media/333_0e56507490.jpg"
            alt=""
            className="max-w-[350px] h-full object-cover rounded-lg"
          />
          <div className="body max-w-[272px] pl-6 flex flex-col items-start gap-2  ">
            <h2 className="text-[20px] leading-7 text-[#2e3034] font-normal">
              Get AZAL tickets with UCARD and earn up to 5% cashback!
            </h2>
            <p className="text-[14px] leading-5 text-[#6e7583]">
              Get AZAL tickets with UCARD and earn up to 5% cashback!
            </p>
            <button>Read more</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialOffers;
