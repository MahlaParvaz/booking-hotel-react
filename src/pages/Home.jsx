import NearLocation from './NearLocation';
import PopularLocations from './PopularLocations';
import Accordion from '../ui/Accordion';
import HomeSwiper from '../ui/HomeSwiper';
import BookAdvertisement from '../ui/BookAdvertisement';
import HomeBanner from '../ui/HomeBanner';

function Home() {
  return (
    <div className="homepage ">
      <div className="landingImg  laptop:w-full tablet:w-full bg-black mobile:w-[390px] laptop:h-[600px] tablet:h-[500px] p-0 relative  flex  justify-center items-end mobile:h-0">
        <img
          className="laptop:h-[500px] laptop:w-[80%] laptop:block mobile:hidden tablet:block tablet:w-[80%] tablet:h-[400px] "
          src="/img/landing-3 1.svg"
          alt=""
        />
      </div>

      <HomeBanner />
      <PopularLocations />
      <NearLocation />
      <BookAdvertisement />
      <Accordion />
      <HomeSwiper />
    </div>
  );
}

export default Home;
