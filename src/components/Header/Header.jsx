import { MdLocationOn } from 'react-icons/md';
import { HiCalendar, HiSearch } from 'react-icons/hi';
import { useState } from 'react';
import { FaUsers } from 'react-icons/fa6';
import { ImHome3 } from 'react-icons/im';
// import useOutsideClick from '../../Hooks/useOutsideClick';
// import 'react-date-range/dist/styles.css'; // main style file
// import 'react-date-range/dist/theme/default.css';
// import { DateRange } from 'react-date-range';
// import { format } from 'date-fns';
// import {
//   //   NavLink,
//   createSearchParams,
//   useNavigate,
//   //   useSearchParams,
// } from 'react-router-dom';
// import useOutsideClick from '../../Hooks/useOutSideClick';
// import { useAuth } from '../context/AuthProvider';
function Header() {
  //   const [searchParams, setSearchParams] = useSearchParams();

  const [destination, setDestination] = useState();

  return (
    <div className="header bg-black w-full h-[600px] p-0 relative  flex flex-col-reverse justify-start items-center gap-4  ">
      <div className="landingImg  laptop:w-[85%]  ">
        <img
          className="laptop:h-[450px]   mobile:w-full mobile:h-[500px] "
          src="/src/assets/img/landing-3.png"
          alt=""
        />
      </div>
      <div className="headerSearch bg-white w-full laptop:m-0   flex laptop:flex-row laptop:max-w-[1010px]  laptop:justify-between laptop:items-center mobile:gap-4 laptop:gap-1 laptop:border laptop:rounded-2xl laptop:p-1 mobile:flex-col  mobile:border-none mobile:px-3 mobile:mt-20">
        {/* location */}
        <div className="headerSearchItem flex  items-center laptop:flex-1 laptop:w-80 relative h-12 mobile:w-full bg-white  mobile:rounded-lg mobile:py-1  mobile:justify-center">
          <MdLocationOn className="headerIcon locationIcon -text--violet-700 w-6 h-6 inline-block mr-3" />
          {/* <label htmlFor="destination">Location</label> */}
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="Where are you going?"
            className="headerSearchInput py-2 px-1  text-base mobile:w-80 "
            name="destination"
            id="destination"
          />
          <span className="seperator laptop:inline-block mobile:hidden  w-[1px] h-8 bg-slate-300 my-0 mx-1"></span>
        </div>
        {/* date */}
        <div className="headerSearchItem flex items-center   relative h-12 laptop:flex-1 laptop:w-72 mobile:w-full bg-white  mobile:rounded-lg mobile:py-1  mobile:justify-center">
          <HiCalendar className="headerIcon dateIcon -text--violet-700  w-5 h-5 inline-block mr-3 " />
          <div className="dateDropDown mobile:w-80">2023/12/30</div>
          <span className="seperator laptop:inline-block mobile:hidden  w-[1px] h-8 bg-slate-300 my-0 mx-1"></span>
        </div>
        {/* room */}
        <div className="headerSearchItem flex items-center relative h-12 laptop:flex-1 laptop:w-72 mobile:w-full bg-white  mobile:rounded-lg mobile:py-1  mobile:justify-center">
          <ImHome3 className="headerIcon -text--violet-700   w-5 h-5 inline-block mr-3 " />
          <div id="optionDropDown " className="mobile:w-80">
            .adult.children.room
          </div>

        </div>
        {/* search btn */}
        <div className="headerSearchItem  -bg--violet-700 text-white flex items-center relative h-12 mobile:w-full  mobile:rounded-lg mobile:py-1  mobile:justify-center">
          <button className="headerSearchBtn ">
            <HiSearch className="headerIcon" />
          </button>
          
        </div>
      </div>
      <div className="navbar w-[80%] mb-4">
        <ul className='text-white flex justify-between items-center'>
            <li >Bookmarks</li>
            <li>Exprience </li>
            <li>Hotels</li>
            <li>Login</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;

