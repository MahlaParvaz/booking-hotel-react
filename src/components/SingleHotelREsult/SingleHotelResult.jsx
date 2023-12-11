import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import { HiCalendar, HiMinus, HiPlus } from 'react-icons/hi';
import { FaShield, FaUsers } from 'react-icons/fa6';
import { ImHome3 } from 'react-icons/im';
import { IoCloseCircle } from 'react-icons/io5';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import Loader from '../Loader/Loader';
import { useHotels } from '../context/HotelResultProvider';
import Map from '../Map/Map';
import useOutsideClick from '../../Hooks/useOutSideClick';
import Checkout from '../Checkout/Checkout';
import CalculateCheckout from '../../common/CalculateCheckout';
import { useHotelContext } from '../context/CheckoutProvider';
import PolicyDetail from '../PolicyDetail/PolicyDetail';

function SingleHotelResult() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrHotel, currentHotel, hotels } = useHotels();
  // const navigate = useNavigate();
  // const [lat, lng] = useUrlLocation();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrHotel || !currentHotel) return <Loader />;

  return (
    <div className=" flex z-50 justify-center items-center w-full  mb-5  min-h-screen ">
      <div className=" mt-[6rem] w-[90%]  flex flex-col items-center justify-between    ">
        <HotelInfo currentHotel={currentHotel} />
        <div className="amentities mb-20 w-[90%] ">
          <h2 className="font-semibold laptop:text-[30px] mobile:text-[24px] text-center mb-8">
            Amenities
          </h2>
          <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-2 gap-4">
            {currentHotel.amenities.map((amenity, index) => (
              <div key={index} className="amenity-item">
                {amenity}
              </div>
            ))}
          </div>
        </div>
        <div className="location  h-[400px] mb-36 w-[90%] z-10">
          <p className="font-semibold  text-center mb-8 laptop:text-[30px] mobile:text-[24px]">
            Location
          </p>
          <Map markerLocations={hotels} />
        </div>

        <PolicyDetail />
      </div>
    </div>
  );
}

export default SingleHotelResult;

function HotelInfo({ currentHotel }) {
  const { date, setDate, options, handleOptions, numberOfGuests, totalCost } =
    useHotelContext();
  const [openDate, setOpenDate] = useState(false);
  const state = {
    date,
    numberOfGuests,
    totalCost,
  };
  //  date useRef
  const dateRef = useRef();
  useOutsideClick(dateRef, 'dateDropDown', () => setOpenDate(false));
  return (
    <div className="  flex flex-col w-full  items-center   ">
      <div className="laptop:flex  laptop:justify-between laptop:items-center  mobile:grid mobile:grid-cols-1 mobile:mt-64 laptop:mt-0 gap-4 tablet:flex  tablet:mt-0  pr-[1rem] mb-20">
        <div className="laptop:w-[600px] h-full  mobile:w-[380px] tablet:ml-2  ">
          <img
            className="laptop:w-full mobile:w-[350px] laptop:h-[400px] tablet:w-full  tablet:h-[300px]  mobile:h-[270px] tablet:mt-9 laptop:mt-0 object-cover  rounded-xl mb-10"
            src={currentHotel.picture_url.url}
            alt={currentHotel.name}
          />
          <h2 className="mb-2 text-base mt-5 tablet:ml-2">{currentHotel.name}</h2>
          <div className="mb-10 tablet:ml-2">
            {currentHotel.number_of_reviews} reviews &bull; {currentHotel.smart_location}
          </div>
        </div>

        <div className=" -bg--light-gray laptop:w-[40%] mobile:w-[350px] rounded-3xl flex flex-col items-center justify-center p-8 mt-8">
          <h2 className="text-center mb-8 font-bold text-[18px]">Reservation bill</h2>
          <div className="headerSearchItem flex items-center relative h-12  laptop:w-80 mobile:w-full mb-8 mobile:w-full bg-white  mobile:rounded-lg mobile:py-1  mobile:justify-center ">
            <HiCalendar className="headerIcon dateIcon -text--red  w-7 h-5 inline-block mr-3 mobile:ml-2" />
            <div
              className="dateDropDown mobile:w-80 text-slate-500 "
              onClick={() => setOpenDate(!openDate)}
              id="dateDropDown"
              ref={dateRef}
            >
              {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(
                date[0].endDate,
                'MM/dd/yyyy'
              )}`}
              {openDate && (
                <DateRange
                  className="date   absolute top-[50px] -left-[15px] z-50 rounded-lg shadow-lg "
                  onChange={(item) => setDate([item.selection])}
                  ranges={date}
                  minDate={new Date()}
                  moveRangeOnFirstSelection={true}
                />
              )}
            </div>
          </div>
          <div className="headerSearchItem  mb-8 ">
            <div className="  mobile:w-80  text-slate-500 mb-5 ml-4">
              <FaUsers className="headerIcon -text--red   w-5 h-5 inline-block mr-3 mobile:ml-2 " />
              <span>Number of guests : {numberOfGuests}</span>
            </div>
            <OptionsList options={options} handleOptions={handleOptions} />
          </div>

          <div className="totalPrice flex flex-col gap-5 mb-8 w-full">
            <div className="flex justify-between px-3">
              <span>Price of one night:</span>
              <span>$ {currentHotel.price} </span>
            </div>
            <div className="flex justify-between px-3">
              <span>Total costs:</span>
              <span>$ {CalculateCheckout(date, options, currentHotel.price)}</span>
            </div>
          </div>
          <div className="reserveBtn text-[14px]">
            <Link to={`/hotels-result/${currentHotel.id}/checkout`} state={state}>
              <div className="-bg--dark-green text-white w-56 text-center  p-2 rounded-2xl hover:-bg--light-green hover:-text--dark-green">
                Continue booking
              </div>
            </Link>
          </div>
          <span className="text-[14px] mt-4 laptop:text-start mobile:text-center">
            When you book this apartment, your reservation will be confirmed instantly
          </span>
        </div>
      </div>
      <div className="description w-[90%] mb-32">
        <h2 className="font-semibold text-[20px] mb-5">Description</h2>
        {currentHotel.description}
      </div>
    </div>
  );
}

function OptionsList({ options, handleOptions }) {
  return (
    <div className="bg-white flex flex-col gap-8 justify-between  top-[50px] ml-4 rounded-lg  laptop:w-96 mobile:w-[90%] px-4 py-3 ">
      <OptionsItem
        type="adult"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
      <OptionsItem
        type="children"
        options={options}
        minLimit={0}
        handleOptions={handleOptions}
      />
    </div>
  );
}

function OptionsItem({ options, type, minLimit, handleOptions }) {
  return (
    <div>
      <div className="flex justify-between ">
        <span>{type}</span>
        <div className="btns flex items-center justify-between w-[100px] mr-4">
          <button
            onClick={() => handleOptions(type, 'dec')}
            disabled={options[type] <= minLimit}
            className="bg-slate-100 p-1 hover:opacity-70 rounded-lg w-7 h-7 flex items-center justify-center"
          >
            <HiMinus className="icon " />
          </button>
          <span>{options[type]}</span>
          <button
            onClick={() => handleOptions(type, 'inc')}
            className="-bg--dark-green text-white hover:opacity-70 p-1 rounded-lg w-7 h-7 flex items-center justify-center"
          >
            <HiPlus className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
