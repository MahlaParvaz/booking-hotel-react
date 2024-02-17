import useFetch from '../hooks/useFetch';
import Loader from '../ui/Loader';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io';
import Card from '../ui/Card';
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4.5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2.5,
  },
  mobile: {
    breakpoint: { max: 390, min: 0 },
    items: 1.2,
  },
};
function NearByLocations() {
  const { data, isLoading } = useFetch('http://localhost:5000/hotels', '');

  if (isLoading) return <Loader />;

  return (
    <div className="app-container   h-full  mobile:mt-20 mobile:mb-20 ">
      <h2 className="laptop:w-[85%] px-4  text-lg font-bold mobile:w-[85%] ">
        Nearby Locations
      </h2>

      <div className="laptop:w-[90%] mobile:w-full  py-4 px-10 rounded-lg ">
        <Carousel
          responsive={responsive}
          axis="horizontal"
          showStatus={false}
          className="relative py-2"
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          rtl="true"
        >
          {data.map((item) => {
            return (
              <Card
                key={item.id}
                item={item}
                picture={item.picture_url.url}
                name={item.name}
                latitude={item.latitude}
                longitude={item.longitude}
                id={item.id}
                price={item.price}
                location={item.smart_location}
              />
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default NearByLocations;

function CustomLeftArrow({ onClick, ...rest }) {
  // Remove carouselState from the props
  const { carouselState, ...otherProps } = rest;

  return (
    <div
      className="carousel-btn text-white right-0   "
      onClick={onClick}
      {...otherProps}
    >
      <IoIosArrowDroprightCircle className="w-9 h-9 text-green-900" />
    </div>
  );
}

function CustomRightArrow({ onClick, ...rest }) {
  // Remove carouselState from the props
  const { carouselState, ...otherProps } = rest;

  return (
    <div className="carousel-btn  left-0" onClick={onClick} {...otherProps}>
      <IoIosArrowDropleftCircle className="w-9 h-9 text-green-900" />
    </div>
  );
}
