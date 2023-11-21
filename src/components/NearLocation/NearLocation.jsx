import useFetch from '../../Hooks/useFetch';
import Loader from '../Loader/Loader';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { Link, Navigate } from 'react-router-dom';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4.5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function NearLocation() {
  const { data, isLoading } = useFetch('http://localhost:5000/hotels', '');

  if (isLoading) return <Loader />;
  // grid grid-cols-4 gap-6 gap-y-10 px-4

  return (
    <div className="nearbyLocatio mb-10 w-full  p-0 h-full flex flex-col  justify-center items-center gap-6 ">
      <h2 className="laptop:w-[85%] px-4  text-lg font-bold">Nearby Locations</h2>

      <div className="locationList w-[90%]  py-4 px-10 rounded-lg">
        <Carousel
          responsive={responsive}
          axis="horizontal"
          showStatus={false}
          className="relative"
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          {data.map((item) => {
            return (
              <div
                className="locationItem flex flex-col items-center justify-center w-[270px]  py-2 px-2  cursor-pointer  "
                key={item.id}
              >
                <img
                  className="w-full h-[200px] rounded-t-[60px] "
                  src={item.picture_url.url}
                  alt={item.name}
                />
                <Link
                  to="/hotels"
                  className="bookBtn absolute -bg--light-green text-green-800 text-md w-48 flex shadow-md  hover:shadow-none justify-center rounded-xl py-1  mt-10 "
                >
                  <button>Book now</button>
                </Link>

                <div className="locationItemDesc px-6 bg-gray-100 text-[15px] h-[150px] w-full flex flex-col gap-1 p-4 rounded-b-[60px]  text-slate-600">
                  <p className="locaiton mt-4 ">{item.smart_location}</p>
                  <p className="name">{item.name}</p>
                  <p className="price">
                    €&nbsp;{item.price}&nbsp;
                    <span className="text-slate-400">night</span>
                  </p>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default NearLocation;

function CustomLeftArrow({ onClick, ...rest }) {
  return (
    <div
      className="absolute top-0 bottom-0 hover:bg-white left-0 flex justify-center items-center p-3 opacity-80 hover:opacity-70 cursor-pointer z-20"
      onClick={onClick}
      {...rest}
    >
      <IoIosArrowDropleftCircle className="w-9 h-9 text-green-900" />
    </div>
  );
}

function CustomRightArrow({ onClick, ...rest }) {
  return (
    <div
      className="absolute text-white hover:bg-white  top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-80  hover:opacity-70 cursor-pointer z-20"
      onClick={onClick}
      {...rest}
    >
      <IoIosArrowDroprightCircle className="w-9 h-9  text-green-900" />
    </div>
  );
}
