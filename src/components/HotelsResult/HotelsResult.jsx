import { Link } from 'react-router-dom';

import Loader from '../Loader/Loader';
import { useHotels } from '../context/HotelResultProvider';
import Map from '../Map/Map';

function HotelsResult() {
  const { hotels } = useHotels();

  return (
    <div className=" flex z-50 justify-center items-center w-full  mb-5 ">
      <div className="appLayout  mt-[6rem] w-[90%] flex justify-between items-stretch h-screen mb-130   ">
        <div className="sidebar w-[40%] flex-1 overflow-hidden overflow-y-scroll pr-[1rem] rounded-2xl  ">
          <Result />
        </div>
        <div className="w-[50%]">
          <Map markerLocations={hotels} />
        </div>
      </div>
    </div>
  );
}

export default HotelsResult;

function Result() {
  const { isLoading, currentHotel, hotels } = useHotels();

  if (isLoading) return <Loader />;

  return (
    <div className="searchList flex flex-col gap-6">
      <h2 className="font-bold ">Search Results ({hotels.length})</h2>
      {hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`searchItem flex gap-6 h-44 -bg--light-gray  rounded-3xl rounded-bl-none ${
                item.id === currentHotel?.id
                  ? 'current-hotel rounded-xl p-2  border-solid border-[2px] -border--dark-green'
                  : ''
              }`}
            >
              <img
                className="w-56  object-cover rounded-3xl rounded-bl-none rounded-tr-none "
                src={item.picture_url.url}
                alt={item.name}
              />
              <div className="searchItemDesc mb-2  flex flex-col gap-2 mt-4">
                <p className="location font-bold ">{item.smart_location}</p>
                <p className="name text-slate-500">{item.name}</p>
                <p className="flex items-center font-semibold text-[15px]">
                  €&nbsp;{item.price}&nbsp;
                  <span className="text-slate-500">night</span>
                </p>
                <p className="-bg--dark-green text-white px-1 py-1.5 text-center rounded-full w-32 text-[13px] mt-3 hover:-bg--light-green hover:-text--dark-green ">
                  Book now
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
