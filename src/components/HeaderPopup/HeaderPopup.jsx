import { ImHome3 } from 'react-icons/im';
import { MdLocationOn } from 'react-icons/md';
import Popup from 'reactjs-popup';
import OptionsList from '../../common/OptionsList';
import HeaderDatePicker from '../../common/HeaderDatePicker';
import HeaderRooms from '../../common/HeaderRooms';

function HeaderPopup({
  showPopup,
  destination,
  setDestination,
  handleSearch,
  setShowPopup,
  options,
  date,
  setDate,
  setOptions,
}) {
  const handlePopup = () => {
    setShowPopup(true);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div
      onClick={handlePopup}
      className="headerSearch laptop:hidden tablet:hidden mobile:flex z-50 absolute top-[20px]  -bg--light-gray flex h-14 justify-between items-center  flex-col border-none px-3 py-2 w-[95%] rounded-2xl"
    >
      {/* location */}
      <div className="headerSearchItem px-2 flex  items-center relative w-full -bg--light-gray rounded-lg  justify-center">
        <MdLocationOn className="headerIcon locationIcon -text--red w-7 h-6 inline-block mr-3 " />
        <div className="headerSearchInput py-2 px-1 mobile:w-80 -bg--light-gray text-slate-400 ">
          Where are you going?
        </div>
      </div>
      {showPopup && (
        <div className="popup fixed top-0 left-0 w-full h-full -bg--light-gray z-[60] bg-opacity-5 backdrop-filter backdrop-blur-md flex justify-center items-center">
          <Popup
            open={showPopup}
            onClose={handleClosePopup}
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
              <div className="flex-1">
                <HeaderDatePicker date={date} setDate={setDate} />
              </div>
              {/* room */}
              <div className="flex-1">
                <HeaderRooms options={options} setOptions={setOptions} />
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
  );
}

export default HeaderPopup;
