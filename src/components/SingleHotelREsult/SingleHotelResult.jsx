import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useHotels } from '../context/HotelResultProvider';
import { useEffect, useRef, useState } from 'react';
import Map from '../Map/Map';
import { HiCalendar, HiMinus, HiPlus } from 'react-icons/hi';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import useOutsideClick from '../../Hooks/useOutSideClick';
import { ImHome3 } from 'react-icons/im';
import Hotels from '../Hotels/Hotels';
function SingleHotelResult() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrHotel, currentHotel, hotels } = useHotels();
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

  useEffect(() => {
    console.log(currentHotel);
    getHotel(id);
  }, [id]);

  const handleOptions = (name, opration) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: opration === 'inc' ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  //  date useRef
  const dateRef = useRef();
  useOutsideClick(dateRef, 'dateDropDown', () => setOpenDate(false));

  if (isLoadingCurrHotel || !currentHotel) return <Loader />;

  return (
    <div className=" flex z-50 justify-center items-center w-full  mb-5  min-h-screen ">
      <div className="appLayout bg-yellow-400 mt-[6rem] w-[90%]  flex flex-col justify-between h-[1000px]   ">
        <div className="sidebar bg-red-100 flex  justify-around items-center  gap-4 p-4 pr-[1rem] mb-20 ">
          <div className="w-[600px]">
            <img
              className="w-full h-96  object-cover  rounded-xl"
              // single picture
              src={currentHotel.picture_url.url}
              alt={currentHotel.name}
            />
            <h2 className="mb-2 text-base">{currentHotel.name}</h2>
            <div className="mb-4">
              {currentHotel.number_of_reviews} reviews &bull;{' '}
              {currentHotel.smart_location}
            </div>
            <div>
              <h2>describe</h2>
              {currentHotel.description}
            </div>
          </div>
          <div className=" -bg--light-gray w-[35%] rounded-3xl flex flex-col items-center p-8">
            <h2 className="text-center mb-8 font-bold">990 / Month</h2>
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
                <span>Number of guests : 2</span>
              </div>
              <OptionsList options={options} handleOptions={handleOptions} />
            </div>

            <div className="totalPrice flex flex-col gap-5 mb-8 w-full">
              <div className="flex justify-between px-3">
                <span>Pay upon booking</span>
                <span>44444</span>
              </div>
              <div className="flex justify-between px-3">
                <span>Total costs</span>
                <span>343.5</span>
              </div>
            </div>
            <button className="-bg--dark-green text-white w-56 p-2 rounded-2xl hover:-bg--light-green hover:-text--dark-green">
              Continue booking
            </button>
            <span className="text-[12px]">
              When you book this apartment, your reservation will be confirmed instantly
            </span>
          </div>
        </div>

        <Map markerLocations={hotels} />
      </div>
    </div>
  );
}

export default SingleHotelResult;
function OptionsList({ options, handleOptions, setOptionsDropDown }) {
  const optionRef = useRef();
  useOutsideClick(optionRef, 'optionDropDown', () => setOptionsDropDown(false));
  return (
    <div
      ref={optionRef}
      className="bg-white flex flex-col gap-8 justify-between  top-[50px] ml-4 rounded-lg  w-96  px-4 py-3 "
    >
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
