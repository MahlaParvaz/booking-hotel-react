import { MdLocationOn } from 'react-icons/md';
import { HiCalendar, HiMinus, HiPlus, HiSearch } from 'react-icons/hi';
import { useRef, useState } from 'react';
import { ImHome3 } from 'react-icons/im';
// import 'reactjs-popup/dist/index.css';

import useOutsideClick from '../../Hooks/useOutSideClick';
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import Popup from 'reactjs-popup';

function Header() {
  const location = useLocation();
  const hideHeader = location.state?.hideHeader;
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(searchParams.get('destination') || '');
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
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const handleOptions = (name, opration) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: opration === 'inc' ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({
      pathname: '/hotels-result',
      search: encodedParams.toString(),
    });
    setShowPopup(false);
  };
  const handleLogin = () => {
    setShowPopup(true);
  };
  const closePopup = () => {
    setShowPopup(false);
  };
  //  date useRef
  const dateRef = useRef();
  useOutsideClick(dateRef, 'dateDropDown', () => setOpenDate(false));
  if (hideHeader) {
    return null; // Don't render the header
  }
  return (
    <div className="header   w-full p-0 relative  flex flex-col justify-start items-center gap-4  ">
      <div
        onClick={handleLogin}
        className="headerSearch laptop:hidden tablet:hidden mobile:flex z-50 absolute top-[20px] laptop:h-14 -bg--light-gray laptop:w-full tablet:w-full laptop:m-0  tablet:m-0 flex laptop:flex-row tablet:flex-row laptop:max-w-[1000px]  tablet:h-16 laptop:justify-between tablet:justify-between laptop:items-center tablet:items-center mobile:gap-5 tablet:gap-1 laptop:gap-1 laptop:border laptop:rounded-2xl laptop:p-1 mobile:flex-col  mobile:border-none mobile:px-3 mobile:mt-2 mobile:w-[95%] mobile:rounded-2xl mobile:py-5"
      >
        {/* location */}
        <div className="headerSearchItem px-2 flex  items-center laptop:flex-1 laptop:w-80 tablet:flex-1 tablet:w-60 relative h-12 mobile:w-full -bg--light-gray  mobile:rounded-lg mobile:py-1  mobile:justify-center">
          <MdLocationOn className="headerIcon locationIcon -text--red w-7 h-6 inline-block mr-3 " />
          <div className="headerSearchInput py-2 px-1 mobile:w-80 -bg--light-gray text-slate-400 laptop:text-[16px] tablet:text-[14px]">
            Where are you going?
          </div>
        </div>
        {showPopup && (
          <div className="popup fixed top-0 left-0 w-full h-full -bg--light-gray z-[60] bg-opacity-5 backdrop-filter backdrop-blur-md flex justify-center items-center">
            <Popup
              open={showPopup}
              onClose={closePopup}
              closeOnDocumentClick
              modal
              nested
            >
              <div className="rounded-lg -bg--light-gray flex flex-col items-center justify-center  p-1.5  h-[310px] ">
                {/* location */}
                <div className="headerSearchItem px-2 flex  items-center relative flex-1 w-full   justify-center">
                  <MdLocationOn className="headerIcon locationIcon -text--red w-7 h-6 inline-block mr-3 " />
                  <input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    type="text"
                    placeholder="Where are you going?"
                    className="headerSearchInput py-2 px-1 w-80 -bg--light-gray "
                    name="destination"
                    id="destination"
                  />
                </div>
                {/* date */}
                <div className="headerSearchItem flex items-center  flex-1 relative  w-full     justify-center">
                  <HiCalendar className="headerIcon dateIcon -text--red  w-7 h-5 inline-block mr-3 " />
                  <div
                    className="dateDropDown w-80 text-slate-500  "
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
                {/* room */}
                <div className="headerSearchItem  flex  cursor-pointer items-center relative flex-1 w-full   justify-center">
                  <ImHome3 className="headerIcon -text--red   w-7 h-5 inline-block mr-3 " />
                  <div
                    id="optionDropDown "
                    className="  mobile:w-80  text-slate-500  "
                    onClick={() => setOptionsDropDown(!optionsDropDown)}
                  >
                    {options.adult} adult &bull; {options.children} children &bull;{' '}
                    {options.room} room &bull;
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
                <div className="headerSearchItem  cursor-pointer   mr-1 -bg--red text-white flex items-center relative  h-14 w-full rounded-xl justify-center">
                  <button className="headerSearchBtn  " onClick={handleSearch}>
                    Search
                  </button>
                </div>
              </div>
            </Popup>
          </div>
        )}
      </div>
      <div className="headerSearch laptop:flex tablet:flex mobile:hidden z-50 absolute top-[20px] laptop:h-14 -bg--light-gray laptop:w-full tablet:w-full laptop:m-0  tablet:m-0 flex laptop:flex-row tablet:flex-row laptop:max-w-[1000px]  tablet:h-16 laptop:justify-between tablet:justify-between laptop:items-center tablet:items-center mobile:gap-5 tablet:gap-1 laptop:gap-1 laptop:border laptop:rounded-2xl laptop:p-1 mobile:flex-col  mobile:border-none mobile:px-3 mobile:mt-2 mobile:w-[95%] mobile:rounded-2xl mobile:py-5  ">
        {/* location */}
        <div className="headerSearchItem px-2 flex  items-center laptop:flex-1 laptop:w-80 tablet:flex-1 tablet:w-60 relative h-12 mobile:w-full -bg--light-gray  mobile:rounded-lg mobile:py-1  mobile:justify-center">
          <MdLocationOn className="headerIcon locationIcon -text--red w-7 h-6 inline-block mr-3 " />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="Where are you going?"
            className="headerSearchInput py-2 px-1 mobile:w-80 -bg--light-gray laptop:text-[16px] tablet:text-[14px]"
            name="destination"
            id="destination"
          />
          <span className="seperator laptop:inline-block mobile:hidden  w-[1px] h-8 bg-slate-300 my-0 mx-1"></span>
        </div>
        {/* date */}
        <div className="headerSearchItem flex items-center   relative h-12 laptop:flex-1 laptop:w-80 mobile:w-full tablet:flex-1 tablet:w-48 -bg--light-gray  mobile:rounded-lg mobile:py-1  mobile:justify-center">
          <HiCalendar className="headerIcon dateIcon -text--red  w-7 h-5 inline-block mr-3 " />
          <div
            className="dateDropDown mobile:w-80 text-slate-500 laptop:text-[16px] tablet:text-[14px] "
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
          <span className="seperator laptop:inline-block mobile:hidden  w-[1px] h-8 bg-slate-300 my-0 mx-1"></span>
        </div>
        {/* room */}
        <div className="headerSearchItem  flex  cursor-pointer items-center relative h-12 laptop:flex-1 laptop:w-64 tablet:flex-1 tablet:w-56 mobile:w-full -bg--light-gray  mobile:rounded-lg mobile:py-1  mobile:justify-center">
          <ImHome3 className="headerIcon -text--red   w-7 h-5 inline-block mr-3 " />
          <div
            id="optionDropDown "
            className="  mobile:w-80  text-slate-500 laptop:text-[16px] tablet:text-[14px] "
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
        <div className="headerSearchItem  cursor-pointer laptop:rounded-full laptop:w-11 laptop:h-11 laptop:mr-1 tablet:w-10 tablet:h-10 -bg--red text-white flex items-center relative  h-12 mobile:w-full  mobile:rounded-lg mobile:py-1  mobile:justify-center">
          <button className="headerSearchBtn  " onClick={handleSearch}>
            <HiSearch className="headerIcon laptop:block tablet:block mobile:hidden text-lg" />
            <span className="loptop:hidden tablet:hidden mobile:block">Search</span>
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
      className="bg-white flex flex-col gap-4 justify-between absolute top-[50px] ml-4 rounded-lg shadow-lg w-64  px-4 py-3  "
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
            className="-bg--red text-white hover:opacity-70 p-1 rounded-lg w-7 h-7 flex items-center justify-center"
          >
            <HiPlus className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

// function MobileSizeHeader() {
//   const locationRef = useRef();
//   const dateRef = useRef();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [destination, setDestination] = useState(searchParams.get('destination') || '');
//   const [options, setOptions] = useState({ adult: 1, children: 0, room: 1 });
//   const [date, setDate] = useState([
//     { startDate: new Date(), endDate: new Date(), key: 'selection' },
//   ]);
//   const [showMobileDropdown, setShowMobileDropdown] = useState(false);

//   const navigate = useNavigate();

//   const handleLocationClick = () => {
//     setShowMobileDropdown((prev) => !prev);
//   };

//   const handleSearch = () => {
//     const encodedParams = createSearchParams({
//       date: JSON.stringify(date),
//       destination,
//       options: JSON.stringify(options),
//     });
//     navigate({
//       pathname: '/hotels-result',
//       search: encodedParams.toString(),
//     });
//   };

//   return (
//     <div className="header w-full p-0 relative flex flex-col justify-start items-center gap-4">
//       <div className="headerSearch z-50 absolute top-[20px] laptop:h-14 -bg--light-gray laptop:w-full tablet:w-full laptop:m-0 tablet:m-0 laptop:max-w-[1000px] tablet:h-16 laptop:justify-between tablet:justify-between laptop:items-center tablet:items-center mobile:gap-5 tablet:gap-1 laptop:gap-1 laptop:border laptop:rounded-2xl laptop:p-1 mobile:flex-col mobile:border-none mobile:px-3 mobile:mt-2 mobile:w-[95%] mobile:rounded-2xl mobile:py-5">
//         {/* location */}
//         <div
//           className={`headerSearchItem px-2 flex items-center laptop:flex-1 laptop:w-80 tablet:flex-1 tablet:w-60 relative h-12 mobile:w-full -bg--light-gray mobile:rounded-lg mobile:py-1 mobile:justify-center ${
//             showMobileDropdown ? 'locationActive' : ''
//           }`}
//           ref={locationRef}
//         >
//           <MdLocationOn className="headerIcon locationIcon -text--red w-7 h-6 inline-block mr-3" />
//           <input
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//             type="text"
//             placeholder="Where are you going?"
//             className="headerSearchInput py-2 px-1 mobile:w-80 -bg--light-gray laptop:text-[16px] tablet:text-[14px]"
//             name="destination"
//             id="destination"
//             onClick={handleLocationClick}
//           />
//           <span className="seperator laptop:inline-block mobile:hidden w-[1px] h-8 bg-slate-300 my-0 mx-1"></span>
//         </div>
//         {/* date */}
//         {showMobileDropdown && (
//           <div className="headerSearchItem flex items-center relative h-12 -bg--light-gray rounded-lg py-1 justify-center">
//             <HiCalendar className="headerIcon dateIcon -text--red w-7 h-5 inline-block mr-3" />
//             <div
//               className="dateDropDown text-slate-500 text-[16px] px-4"
//               onClick={() => {}}
//               id="dateDropDown"
//               ref={dateRef}
//             >
//               {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(
//                 date[0].endDate,
//                 'MM/dd/yyyy'
//               )}`}
//               {/* Calendar component */}
//             </div>
//           </div>
//         )}
//         {/* room */}
//         {showMobileDropdown && (
//           <div className="headerSearchItem flex cursor-pointer items-center relative h-12 -bg--light-gray rounded-lg py-1 justify-center">
//             <ImHome3 className="headerIcon -text--red w-7 h-5 inline-block mr-3" />
//             <div
//               id="optionDropDown"
//               className="mobile:w-80 text-slate-500 text-[16px]"
//               onClick={() => {}}
//             >
//               {options.adult} adult &bull; {options.children} children &bull;{' '}
//               {options.room} room &bull;
//             </div>
//             {/* Room options component */}
//           </div>
//         )}
//         {/* search btn */}
//         {showMobileDropdown && (
//           <div className="headerSearchItem cursor-pointer rounded-full w-11 h-11 mr-1 -bg--red text-white flex items-center relative h-12 justify-center">
//             <button className="headerSearchBtn" onClick={handleSearch}>
//               <HiSearch className="headerIcon block text-lg" />
//               <span className="block">Search</span>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
