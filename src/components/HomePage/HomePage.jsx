import NearLocation from '../NearLocation/NearLocation';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { FaQuestion } from 'react-icons/fa6';
import 'react-multi-carousel/lib/styles.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { IonIcon } from '@ionic/react';
import PopularLocations from '../PopularLocations/PopularLocations';
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
const opinionData = [
  {
    id: 1,
    avatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Morty',
    description:
      'Everything went very well, there were some minor issues with the hotels maintenance, but when I requested improvement, the hotel staff handled the problem very well. This website was very good for my reservation. So far, I have made two reservations through this site and I am satisfied. Thank you.',
  },

  {
    id: 2,
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Susan',
    description:
      'I found the best place to stay. I went with my family to one of the cities in the Netherlands and was very satisfied with the hotel. Finding a hotel with this website is very easy.',
  },
  {
    id: 3,
    avatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Diana',
    description: 'We had the most dreamy accommodation with my spouse.',
  },
  {
    id: 4,
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Emily',
    description:
      ' The stay was very comfortable. With this website, I could easily find the place I was looking for. Thank you.',
  },
  {
    id: 5,
    avatar:
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'John',
    description:
      'So far, I have been satisfied with every hotel I booked through this site.',
  },
  {
    id: 5,
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Doris',
    description:
      'The hotels I booked were very comfortable and clean, located in the desired area. I was very satisfied. Thank you for facilitating the hotel booking process.',
  },
];

function HomePage() {
  return (
    <div className="homepage   ">
      <div className="landingImg  laptop:w-full tablet:w-full bg-black mobile:w-[390px] laptop:h-[600px] tablet:h-[500px] p-0 relative  flex  justify-center items-end mobile:h-[150px]">
        <img
          className="laptop:h-[500px] laptop:w-[80%] laptop:block mobile:hidden tablet:block tablet:w-[80%] tablet:h-[400px] "
          src="/src/assets/img/landing-3.png"
          alt=""
        />
      </div>

      <Description />
      <PopularLocations />
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
    <div className="mobile:hidden tablet:flex laptop:flex w-full mb-12 mt-20 flex justify-center items-center  relative">
      <div className="laptop:w-[80%] tablet:w-[90%]  ">
        <img
          className="w-full tablet:h-[300px] laptop:h-full"
          src="/src/assets/img/The future is flexible.png"
          alt="seaside image doesn't show"
        />
      </div>
      <div className="title laptop:w-[500px] tablet:w-[380px]  flex flex-col absolute text-end laptop:top-10 tablet:top-2 items-start justify-start p-16 laptop:right-60 tablet:right-9 ">
        <h2 className="font-bold text-[20px] -text--dark-green tablet:w-[300px] laptop:w-full  mb-5 tablet:text-left laptop:text-start">
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
    <div className="image w-full mobile:mb-20  flex justify-center items-center  relative">
      <div className="laptop:w-[90%] mobile:w-full ">
        <img
          className="w-full h-[450px] laptop:rounded-[80px] mobile:rounded-none object-cover"
          src="/src/assets/img/the-anam.jpg"
          alt="seaside image doesn't show"
        />
      </div>
      <div className="title  flex  flex-col absolute text-end   items-start gap-6 laptop:p-16 tablet:p-16 mobile:w-[300px] laptop:w-[450px] tablet:w-[450px] mobile:p-10  laptop:left-28 tablet:left-10 -bg--light-green rounded-[30px] bg-opacity-70">
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
      <h2 className="w-[85%] px-4  text-lg font-bold ">Your questions</h2>

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
    <div className="swiper w-full mb-10 p-4 mt-10 relative flex flex-col justify-center items-center gap-6">
      <h2 className=" px-4 text-lg font-bold  w-[85%]">Users opinion</h2>
      <div className="laptop:w-[86.5%]  h-[400px] mb-10 rounded-[10px] overflow-hidden">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          spaceBetween={10}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
          }}
          // pagination={{  clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container w-full h-full py-[20px] relative"
        >
          {opinionData.map((item) => (
            <SwiperSlide
              key={item.id}
              className="swiper-slide blur-[3px]  w-[300px]  center bg-cover rounded-[30px] "
            >
              <div className="testimonialBox -bg--light-gray  flex flex-col justify-around items-center   laptop:w-[400px] mobile:w-[300px] h-full rounded-[30px] ">
                <div className="-bg--dark-green rounded-t-[30px] rounded-bl-[30px] w-full flex justify-center items-center relative h-[250px]">
                  <img
                    className=" w-[100px] h-[100px] rounded-full object-cover "
                    src={item.avatar}
                    alt={item.name}
                  />
                </div>
                <div className=" h-full p-4 flex flex-col justify-start top-[40px] text-[15px] rounded-tr-[30px]">
                  <p className="name mb-2 text-center font-semibold">{item.name}</p>
                  <p className="price overflow-hidden scroll-y-smooth mt-4 text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow left-5 text-[10px]  rounded-full  md:left-20 transform -translate-x-30 md:-translate-x-20 -text--dark-green">
              <IonIcon name="arrow-back-outline" />
            </div>
            <div className="swiper-button-next slider-arrow left-58 md:left-70 transform -translate-x-58 md:-translate-x-70 -text--dark-green">
              <IonIcon name="arrow-forward-outline" />
            </div>
            <div className="swiper-pagination  relative w-[15rem] bottom-1 ">
              {/* Pagination styles */}
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}
