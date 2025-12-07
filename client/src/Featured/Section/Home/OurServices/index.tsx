const OurServices = () => {
  const cards = [
    {
      id: 1,
      name: "     AZAL Upgrade",
      desc: " Travel in comfort and more relaxed journey in Business Class",
      img: "https://www.azal.az/_next/static/media/azal_upgrade_eng_11bb82651d.png",
    },
    {
      id: 2,
      name: "Meals on-board",
      desc: "Free meals are served on all international flights of Azerbaijan Airlines",
      img: "https://www.azal.az/_next/static/media/qidalanma_3_d30d72de34.jpg",
    },
    {
      id: 3,
      name: " AZAL Miles",
      desc: " AZAL Miles is the frequent flyer programme of Azerbaijan Airlines.  AZAL Miles is a unique frequent flyer programme that rewards members with travel and status points.",
      img: "https://www.azal.az/_next/static/media/245x138_2_Bigmiles_24ccd08f03.jpg",
    },
  ];
  return (
    <div className="max-w-[1160px] mx-auto mt-25">
      <div className="grid grid-cols-3 gap-6">
        {cards &&
          cards.map((item) => (
            <div className="box h-[404px] border border-[#dbe0e4] rounded-xl overflow-hidden hover:border-[#40b7de] duration-300 cursor-pointer hover:scale-[1.025]">
              <div className="boxImg w-full h-[200px] overflow-hidden">
                <img
                  src={item?.img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="body p-6">
                <h2 className="text-[20px] text-[#2e3034] leading-6 font-normal mb-2">
                  {item?.name}
                </h2>
                <p className="text-[14px] text-[#6e7583] leading-6 font-normal h-[95px]">
                  {item?.desc}
                </p>
                <button className="text-[16px] font-medium text-[#40b7de]">
                  Read more
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="rounded-xl overflow-hidden mt-[76px]">
        <img
          src="https://www.azal.az/_next/static/media/banner_08banner_download_app_eng_71f33fb837.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default OurServices;
