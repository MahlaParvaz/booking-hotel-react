import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

import { HiCalendar, HiMinus, HiPlus } from 'react-icons/hi';
import { FaShield } from 'react-icons/fa6';
import { ImHome3 } from 'react-icons/im';
import { IoCloseCircle } from 'react-icons/io5';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import Loader from '../Loader/Loader';
import { useHotels } from '../context/HotelResultProvider';
import Map from '../Map/Map';
import useOutsideClick from '../../Hooks/useOutSideClick';
import useUrlLocation from '../../Hooks/useUrlLocation';

function SingleHotelResult() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrHotel, currentHotel, hotels } = useHotels();
  // const navigate = useNavigate();
  // const [lat, lng] = useUrlLocation();

  useEffect(() => {
    getHotel(id);

  }, [id ]);

  if (isLoadingCurrHotel || !currentHotel) return <Loader />;

  return (
    <div className=" flex z-50 justify-center items-center w-full  mb-5  min-h-screen ">
      <div className=" mt-[6rem] w-[90%]  flex flex-col items-center justify-between    ">
        <HotelInfo currentHotel={currentHotel} />
        <div className="amentities mb-20 w-[90%] ">
          <h2 className="font-semibold text-[30px] text-center mb-8">Amenities</h2>
          <div className="grid grid-cols-3 gap-4">
            {currentHotel.amenities.map((amenity, index) => (
              <div key={index} className="amenity-item">
                {amenity}
              </div>
            ))}
          </div>
        </div>
        <div className="location  h-[400px] mb-36 w-[90%]">
          <p className="font-semibold text-[30px] text-center mb-8">Location</p>
          <Map markerLocations={hotels} />
        </div>
        <PolicyDetail currentHotel={currentHotel} />
      </div>
    </div>
  );
}

export default SingleHotelResult;

function HotelInfo({ currentHotel }) {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const handleOptions = (name, opration) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: opration === 'inc' ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const numberOfGuests = options.adult + options.children;

  const totalCostWithDates = calculateTotalCostWithDates(
    date,
    numberOfGuests,
    currentHotel.price
  );

  //  date useRef
  const dateRef = useRef();
  useOutsideClick(dateRef, 'dateDropDown', () => setOpenDate(false));

  return (
    <div className="  flex flex-col w-full  items-center   ">
      <div className="flex  justify-between items-center  gap-4  pr-[1rem] mb-20">
        <div className="w-[600px] h-full   ">
          <img
            className="w-full h-[400px]   object-cover  rounded-xl mb-10"
            // single picture
            src={currentHotel.picture_url.url}
            alt={currentHotel.name}
          />
          <h2 className="mb-2 text-base mt-5">{currentHotel.name}</h2>
          <div className="mb-10">
            {currentHotel.number_of_reviews} reviews &bull; {currentHotel.smart_location}
          </div>
        </div>

        <div className=" -bg--light-gray w-[40%] rounded-3xl flex flex-col items-center justify-center p-8 mt-8">
          <h2 className="text-center mb-8 font-bold">Reservation bill</h2>
          <div className="headerSearchItem flex items-center relative h-12  w-80 mb-8 mobile:w-full bg-white  mobile:rounded-lg mobile:py-1  mobile:justify-center ">
            <HiCalendar className="headerIcon dateIcon -text--red  w-7 h-5 inline-block mr-3 " />
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
            <div className="  mobile:w-80  text-slate-500 mb-4 ">
              <ImHome3 className="headerIcon -text--red   w-7 h-5 inline-block mr-3 " />
              <span>Number of guests : {numberOfGuests}</span>
            </div>
            <OptionsList options={options} handleOptions={handleOptions} />
          </div>

          <div className="totalPrice flex flex-col gap-5 mb-8 w-full">
            <div className="flex justify-between px-3">
              <span>Price of one night</span>
              <span>$ {currentHotel.price} </span>
            </div>
            <div className="flex justify-between px-3">
              <span>Total costs</span>
              <span>$ {totalCostWithDates}</span>
            </div>
          </div>
          <button className="-bg--dark-green text-white w-56 p-2 rounded-2xl hover:-bg--light-green hover:-text--dark-green">
            Continue booking
          </button>
          <span className="text-[14px] mt-3">
            When you book this apartment, your reservation will be confirmed instantly
          </span>
        </div>
      </div>
      <div className="description w-[90%] mb-32">
        <h2 className="font-semibold text-[20px] mb-5">Description</h2>
        {currentHotel.description}
      </div>
      ;
    </div>
  );
}

function OptionsList({ options, handleOptions }) {
  return (
    <div className="bg-white flex flex-col gap-8 justify-between  top-[50px] ml-4 rounded-lg  w-96  px-4 py-3 ">
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
function PolicyDetail({ currentHotel }) {
  return (
    <div className="policyDetail  w-[90%] mb-10">
      <h2 className="font-semibold text-[30px] text-center mb-8">Policy detail</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="w-72">
          <p className="font-semibold text-[20px] mb-5">House rules</p>
          <div className="flex flex-col mb-5 gap-2">
            {currentHotel.house_rules.map((rules, index) => (
              <div
                key={index}
                className="flex items-start  top-16 -text--dark-green gap-2"
              >
                <IoCloseCircle className=" text-[18px] mt-0.5" />
                {rules}
              </div>
            ))}
          </div>
        </div>
        <div className="w-72">
          <p className="font-semibold text-[20px] mb-5">Cancellation policy</p>
          <div className="flex items-start  top-16 -text--dark-green gap-2">
            <IoCloseCircle className=" text-[20px] mt-0.2" />
            {currentHotel.cancellation_policy}
          </div>
        </div>
        <div className="w-72">
          <p className="font-semibold text-[20px] mb-5 ">Health & Safety</p>
          <div className="flex items-start  top-16 -text--dark-green gap-2">
            <FaShield className=" text-[20px] mt-0.2" />
            {currentHotel.health_safety}
          </div>
        </div>
      </div>
    </div>
  );
}
function calculateTotalCostWithDates(date, numberOfGuests, price) {
  const startDate = date[0].startDate;
  const endDate = date[0].endDate;
  const numberOfDays = Math.ceil((endDate - startDate + 1) / (1000 * 60 * 60 * 24));
  return numberOfDays * numberOfGuests * price;
}
