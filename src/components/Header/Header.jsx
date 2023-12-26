import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import HeaderPopup from '../HeaderPopup/HeaderPopup';
import HeaderDatePicker from '../../common/HeaderDatePicker';
import HeaderRooms from '../../common/HeaderRooms';
import HeaderLocation from '../../common/HeaderLocation';
import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';

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
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
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

  if (hideHeader) {
    return null; // Don't render the header
  }
  return (
    <div className="header w-full p-0 relative  flex flex-col justify-start items-center gap-4  ">
      <HeaderPopup
        showPopup={showPopup}
        destination={destination}
        setDestination={setDestination}
        handleSearch={handleSearch}
        options={options}
        setShowPopup={setShowPopup}
        setOptions={setOptions}
        date={date}
        setDate={setDate}
      />
      <MainHeader
        destination={destination}
        setDestination={setDestination}
        handleSearch={handleSearch}
        options={options}
        date={date}
        setDate={setDate}
        setOptions={setOptions}
      />
    </div>
  );
}

export default Header;

function MainHeader({
  destination,
  setDestination,
  date,
  setDate,
  options,
  handleSearch,
  setOptions,
}) {
  return (
    <div className="headerSearch laptop:px-5 laptop:flex tablet:flex mobile:hidden z-50 absolute top-[20px] laptop:h-14 -bg--light-gray laptop:w-full tablet:w-full laptop:m-0  tablet:m-0 flex laptop:flex-row tablet:flex-row laptop:max-w-[1000px]  tablet:h-16 laptop:justify-between tablet:justify-between laptop:items-center tablet:items-center mobile:gap-5 tablet:gap-1 laptop:gap-1 laptop:border laptop:rounded-2xl laptop:p-1 mobile:flex-col  mobile:border-none mobile:px-3 mobile:mt-2 mobile:w-[95%] mobile:rounded-2xl mobile:py-5  ">
      {/* location */}
      <HeaderLocation destination={destination} setDestination={setDestination} />
      {/* date */}
      <HeaderDatePicker date={date} setDate={setDate} />
      {/* room */}
      <HeaderRooms options={options} setOptions={setOptions} />
      {/* search btn */}
      <div className="headerSearchItem  cursor-pointer laptop:rounded-full laptop:w-11 laptop:h-11 laptop:mr-1 tablet:w-10 tablet:h-10 -bg--red text-white flex items-center relative  h-12 mobile:w-full  mobile:rounded-lg mobile:py-1  mobile:justify-center">
        <button className="headerSearchBtn  " onClick={handleSearch}>
          <HiSearch className="headerIcon laptop:block tablet:block mobile:hidden text-lg" />
          <span className="loptop:hidden tablet:hidden mobile:block">Search</span>
        </button>
      </div>
    </div>
  );
}
