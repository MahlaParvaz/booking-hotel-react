import { HiSearch } from 'react-icons/hi';
import HeaderLocation from './HeaderLocation';
import HeaderRooms from './HeaderRooms';
import { useSearchHotelsContext } from '../features/checkout/CheckoutProvider';
import DatePicker from '../common/DatePicker';

function LaptopHeader() {
  const { handleSearch } = useSearchHotelsContext();
  return (
    <div className="header-search  ">
      <HeaderLocation />
      <div className="search__item laptop:w-80  tablet:w-48 ">
        <DatePicker />
        <span className="search__seperator "></span>
      </div>
      <HeaderRooms />
      <div className="search__item laptop:rounded-full laptop:w-11 laptop:h-11 laptop:mr-1 tablet:w-10 tablet:h-10 -bg--red text-white  h-12 ">
        <button onClick={handleSearch}>
          <HiSearch className="laptop:block tablet:block mobile:hidden text-lg" />
          <span className="loptop:hidden tablet:hidden mobile:block">
            Search
          </span>
        </button>
      </div>
    </div>
  );
}
export default LaptopHeader;
