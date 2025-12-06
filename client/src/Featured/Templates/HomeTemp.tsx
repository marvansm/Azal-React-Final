import BannerSection from "../Section/BannerSection";
import OurServices from "../Section/OurServices";
import PopularSection from "../Section/PopularSection";
import SpecialOffers from "../Section/SpecialOffers";

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
