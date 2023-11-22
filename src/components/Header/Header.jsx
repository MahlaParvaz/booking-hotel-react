import { MdLocationOn } from 'react-icons/md';
import { HiCalendar, HiMinus, HiPlus, HiSearch } from 'react-icons/hi';
import { useRef, useState } from 'react';
import { ImHome3 } from 'react-icons/im';
import useOutsideClick from '../../Hooks/useOutSideClick';
import { useSearchParams } from 'react-router-dom';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange, DateRangePicker } from 'react-date-range';
import { format } from 'date-fns';
import NavBar from '../NavBar/NavBar';

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [destination, setDestination] = useState();
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [optionsDropDown, setOptionsDropDown] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(false);
  const handleOptions = (name, opration) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: opration === 'inc' ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const handleSearch = (e) => {
    console.log(e);
  };
  //  date useRef
  const dateRef = useRef();
  useOutsideClick(dateRef, 'dateDropDown', () => setOpenDate(false));

  return (
    <div className="header   w-full p-0 relative  flex flex-col justify-start items-center gap-4  ">
      {/* navbar */}
      <NavBar />
      <div className="headerSearch z-50 absolute top-[80px] -bg--light-gray w-full laptop:m-0   flex laptop:flex-row laptop:max-w-[1000px]  laptop:justify-between laptop:items-center mobile:gap-4 laptop:gap-1 laptop:border laptop:rounded-2xl laptop:p-1 mobile:flex-col  mobile:border-none mobile:px-3 mobile:mt-20">
        {/* location */}
        <div className="headerSearchItem px-2 flex  items-center laptop:flex-1 laptop:w-80 relative h-12 mobile:w-full -bg--light-gray  mobile:rounded-lg mobile:py-1  mobile:justify-center">
          <MdLocationOn className="headerIcon locationIcon -text--red w-7 h-6 inline-block mr-3 " />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="Where are you going?"
            className="headerSearchInput py-2 px-1  text-base mobile:w-80 -bg--light-gray"
            name="destination"
            id="destination"
          />
          <span className="seperator laptop:inline-block mobile:hidden  w-[1px] h-8 bg-slate-300 my-0 mx-1"></span>
        </div>
        {/* date */}
        <div className="headerSearchItem flex items-center   relative h-12 laptop:flex-1 laptop:w-80 mobile:w-full -bg--light-gray  mobile:rounded-lg mobile:py-1  mobile:justify-center">
          <HiCalendar className="headerIcon dateIcon -text--red  w-7 h-5 inline-block mr-3 " />
          <div
            className="dateDropDown mobile:w-80 text-slate-500 "
            onClick={() => setOpenDate(!openDate)}
            id="dateDropDown"
            ref={dateRef}
          >
            {/* {!selectedDate ? (
              <span>Check-in &bull; Check-out</span>
            ) : selectedDate ? (
              `${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(
                date[0].endDate,
                'MM/dd/yyyy'
              )}`
            ) : (
              ''
            )} */}
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
          <span className="seperator laptop:inline-block mobile:hidden  w-[1px] h-8 bg-slate-300 my-0 mx-1"></span>
        </div>
        {/* room */}
        <div className="headerSearchItem flex  cursor-pointer items-center relative h-12 laptop:flex-1 laptop:w-64 mobile:w-full -bg--light-gray  mobile:rounded-lg mobile:py-1  mobile:justify-center">
          <ImHome3 className="headerIcon -text--red   w-7 h-5 inline-block mr-3 " />
          <div
            id="optionDropDown "
            className="  mobile:w-80  text-slate-500 "
            onClick={() => setOptionsDropDown(!optionsDropDown)}
          >
            {options.adult} adult &bull; {options.children} children &bull; {options.room}{' '}
            room &bull;
          </div>
          {optionsDropDown && (
            <OptionsList
              setOptionsDropDown={setOptionsDropDown}
              options={options}
              handleOptions={handleOptions}
            />
          )}
        </div>
        {/* search btn */}
        <div className="headerSearchItem  cursor-pointer laptop:rounded-full laptop:w-11 laptop:h-11 laptop:mr-1 -bg--red text-white flex items-center relative  h-12 mobile:w-full  mobile:rounded-lg mobile:py-1  mobile:justify-center">
          <button className="headerSearchBtn " onClick={handleSearch}>
            <HiSearch className="headerIcon text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function OptionsList({ options, handleOptions, setOptionsDropDown }) {
  const optionRef = useRef();
  useOutsideClick(optionRef, 'optionDropDown', () => setOptionsDropDown(false));
  return (
    <div
      ref={optionRef}
      className="bg-white flex flex-col gap-4 justify-between absolute top-[50px] ml-4 rounded-lg shadow-lg w-64  px-4 py-3"
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
      <OptionsItem
        type="room"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
    </div>
  );
}

function OptionsItem({ options, type, minLimit, handleOptions }) {
  return (
    <div>
      <div className="flex justify-between">
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
            className="-bg--violet-700 text-white hover:opacity-70 p-1 rounded-lg w-7 h-7 flex items-center justify-center"
          >
            <HiPlus className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
