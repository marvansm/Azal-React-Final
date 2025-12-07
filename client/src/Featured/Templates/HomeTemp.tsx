import BannerSection from "../Section/Home/BannerSection";
import OurServices from "../Section/Home/OurServices";
import PopularSection from "../Section/Home/PopularSection";
import SpecialOffers from "../Section/Home/SpecialOffers";

const HomeTemp = () => {
  return (
    <div>
      <BannerSection />
      <SpecialOffers />
      <OurServices />
      <PopularSection />
    </div>
  );
};

export default HomeTemp;
