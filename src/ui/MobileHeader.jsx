import { MdLocationOn } from 'react-icons/md';
import Popup from 'reactjs-popup';
import HeaderRooms from './HeaderRooms';
import HeaderLocation from './HeaderLocation';
import { useSearchHotelsContext } from '../features/checkout/CheckoutProvider';
import DatePicker from '../common/DatePicker';

function MobileHeader() {
  const { showPopup, handleSearch, setShowPopup } = useSearchHotelsContext();

  const handlePopup = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div onClick={handlePopup} className="mobile-header ">
      <div className="px-2 flex  items-center relative w-full -bg--light-gray rounded-lg  justify-center">
        <MdLocationOn className="header__icon" />
        <div className="search__input  mobile:w-80 ">Where are you going?</div>
      </div>
      {showPopup && (
        <div className="popup  ">
          <Popup
            open={showPopup}
            onClose={handleClosePopup}
            closeOnDocumentClick
            modal
            nested
          >
            <div className="rounded-lg overflow-x-hidden scroll-smooth  bg-black flex flex-col items-center justify-center  p-1.5  h-[400px] w-[400px]">
              <div className="h-[330px] mt-5 flex flex-col gap-5">
                <HeaderLocation />
                <div className="search__item ">
                  <DatePicker />
                </div>
                <HeaderRooms />
                <div className="mobile-search--btn ">
                  <button onClick={handleSearch}>Search</button>
                </div>
              </div>
            </div>
          </Popup>
        </div>
      )}
    </div>
  );
}

export default MobileHeader;
