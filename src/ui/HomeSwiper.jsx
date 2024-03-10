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
import { arrowBackOutline, arrowForwardOutline } from 'ionicons/icons';

const opinionData = [
  {
    id: 1,
    avatar: '/public/assets/img/morty.svg',
    name: 'Morty',
    description:
      'Everything went very well, there were some minor issues with the hotels maintenance, but when I requested improvement, the hotel staff handled the problem very well. This website was very good for my reservation. So far, I have made two reservations through this site and I am satisfied. Thank you.',
  },

  {
    id: 2,
    avatar: '/public/assets/img/suan.svg',
    name: 'Susan',
    description:
      'I found the best place to stay. I went with my family to one of the cities in the Netherlands and was very satisfied with the hotel. Finding a hotel with this website is very easy.',
  },
  {
    id: 3,
    avatar: '/public/assets/img/diana.svg',
    name: 'Diana',
    description: 'We had the most dreamy accommodation with my spouse.',
  },
  {
    id: 4,
    avatar: '/public/assets/img/emily.svg',
    name: 'Emily',
    description:
      ' The stay was very comfortable. With this website, I could easily find the place I was looking for. Thank you.',
  },
  {
    id: 5,
    avatar: '/public/assets/img/john.svg',
    name: 'John',
    description:
      'So far, I have been satisfied with every hotel I booked through this site.',
  },
  {
    id: 6,
    avatar: '/public/assets/img/doris.svg',
    name: 'Doris',
    description:
      'The hotels I booked were very comfortable and clean, located in the desired area. I was very satisfied. Thank you for facilitating the hotel booking process.',
  },
];

function HomeSwiper() {
  return (
    <div className="swiper ">
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
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper__container w-full h-full py-[20px] relative"
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
                  <p className="name mb-2 text-center font-semibold">
                    {item.name}
                  </p>
                  <p className="price overflow-hidden scroll-y-smooth mt-4 text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow left-5 text-[10px]  rounded-full  md:left-20 transform -translate-x-30 md:-translate-x-20 -text--dark-green">
              <IonIcon icon={arrowBackOutline} />
            </div>
            <div className="swiper-button-next slider-arrow left-58 md:left-70 transform -translate-x-58 md:-translate-x-70 -text--dark-green">
              <IonIcon icon={arrowForwardOutline} />
            </div>
            <div className="swiper-pagination  relative w-[15rem] bottom-1 "></div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}
export default HomeSwiper;
