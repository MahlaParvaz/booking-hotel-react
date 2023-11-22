import PopularLocation from '../PopularLocation/PopularLocation';
import NearLocation from '../NearLocation/NearLocation';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { FaQuestion } from 'react-icons/fa6';
import { Carousel } from 'react-responsive-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
// import { ChevronDownIcon } from '@heroicons/react/24/outline';
const data = [
  {
    id: 1,
    title: 'Can we find the geographical location on the map?',
    text: 'You can find a new location on the map, add it to your bookmarks, and easily view new locations on the map. Explore the positions of all the countries you are interested in.',
  },
  {
    id: 2,
    title: 'What price range is available for hotels, and for which countries?',
    text: ' Prices are available for all ranges, from the most affordable to the most luxurious and luxurious hotels for any country you have in mind, with any number of family members',
  },
  {
    id: 3,
    title: 'Is it possible to cancel the accommodation and receive a refund? ',
    text: ' If you cancel the accommodation up to two days before the reservation, the amount will be refunded with a ten percent deduction. If you cancel it up to 24 hours before the stay, 60 percent of the amount will be deducted, and the remainder will be refunded to you.',
  },
];
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

function HomePage() {
  return (
    <div className="header ">
      <div className="landingImg  laptop:w-full bg-black w-full h-[600px] p-0 relative  flex  justify-center items-end ">
        <img
          className="laptop:h-[500px] laptop:w-[80%]  mobile:w-full mobile:h-[500px] "
          src="/src/assets/img/landing-3.png"
          alt=""
        />
      </div>
      <Description />
      <PopularLocation />
      <NearLocation />
      <BookAdvertisement />
      <Accordion />
      <UsersOpinion />
    </div>
  );
}

export default HomePage;

function Description() {
  return (
    <div className=" w-full mt-20 flex justify-center items-center  relative">
      <div className="w-[80%]  ">
        <img
          className="w-full"
          src="/src/assets/img/The future is flexible.png"
          alt="seaside image doesn't show"
        />
      </div>
      <div className="title w-[500px] flex flex-col absolute text-end top-10 items-start justify-start p-16 right-60 ">
        <h2 className="font-bold text-[20px] -text--dark-green mb-5 text-right">
          Lets booking your favourite hotel
        </h2>
        <span className=" text-start">
          Book your accommodation easily, We wish you have a nice and comfortable stay.
          <br />
          Lets start booking your hotel.
        </span>
      </div>
    </div>
  );
}

function BookAdvertisement() {
  return (
    <div className="image w-full flex justify-center items-center  relative">
      <div className="w-[90%]  ">
        <img
          className="w-full h-[450px] rounded-[80px]"
          src="/src/assets/img/the-anam.jpg"
          alt="seaside image doesn't show"
        />
      </div>
      <div className="title  flex  flex-col absolute text-end   items-start gap-6 p-16 left-28 -bg--light-green rounded-[30px] bg-opacity-70">
        <h2 className="font-bold text-[20px] -text--dark-green mb-10 text-left">
          Lets booking your favourite hotel
        </h2>
        <Link to="/hotels">
          <button className="  -bg--dark-green shadow-lg hover:opacity-80 hover:shadow-none px-4 py-2 w-[150px] h-10 rounded-full text-white text-sm">
            Start booking
          </button>
        </Link>
      </div>
    </div>
  );
}

function Accordion() {
  const [open, setOpen] = useState(null); // 1,2,3...

  const handleOpen = (id) => {
    setOpen(id === open ? null : id);
  };

  return (
    <div className=" w-full  p-4 mt-10 relative flex flex-col  justify-center items-center gap-6">
      <h2 className="laptop:w-[85%] px-4  text-lg font-bold">Your questions</h2>

      <div className="accordion w-[85%] border-solid -border--light-gray  rounded-[10px] overflow-hidden">
        {data.map((item) => (
          <AccordionItem
            key={item.id}
            id={item.id}
            title={item.title}
            onOpen={handleOpen}
            open={open}
          >
            {item.text}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
}
function AccordionItem({ id, title, onOpen, open, children }) {
  const isOpen = id === open;

  return (
    <div
      className={`accordion-item   ${
        isOpen ? 'accordion__expanded p-2  max-h-[100vh] ease-in-out duration-200 ' : ''
      }`}
    >
      <div
        className="accordion-item__header p-[20px] cursor-pointer flex items-center justify-between font-bold  text-[14px]"
        onClick={() => onOpen(id)}
      >
        <FaQuestion className="text-[20px] -text--dark-green -bg--light-green w-[35px] h-[35px] rounded-full p-2" />
        <div className=" w-full pl-4">{title}</div>
        <IoChevronDown
          className={`accordion-item__chevron w-[35px] h-[35px] hover:-bg--light-green -text--dark-green px-2 hover:rounded-full  ease-out duration-300  ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>
      <div
        className={`accordion-item__content ease-in-out duration-300 max-h-0 opacity-0 overflow-hidden text-[14px]  leading-6 px-4 ${
          isOpen ? 'max-h-[100vh] opacity-100' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function UsersOpinion() {
  return (
    <div className="popularLocations w-full mt-10 mb-5  p-0 relative flex flex-col  justify-center items-center gap-6">
      <h2 className="laptop:w-[85%] px-4  text-lg font-bold">Users opinion</h2>
      <div className=" flex gap-6 h-[300px]">
        <Carousel
          responsive={responsive}
          axis="horizontal"
          showStatus={false}
          className="relative"
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          <div>hi</div>
        </Carousel>
      </div>
    </div>
  );
}

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
