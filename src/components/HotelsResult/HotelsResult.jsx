import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useHotels } from '../context/HotelResultProvider';
import Map from '../Map/Map';

function HotelsResult() {
  const { isLoading, currentHotel, hotels } = useHotels();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex z-50 justify-center items-center w-full mb-5">
      <div className="appLayout laptop:mt-[6rem] tablet:mt-[6rem] mobile:mt-[22rem] w-[90%] flex justify-between items-stretch laptop:h-screen tablet:h-[175vh] mobile:h-[175vh] laptop:flex-row tablet:flex-col mobile:flex-col mb-130">
        <div className="sidebar laptop:w-[40%] tablet:w-full mobile:w-[360px] flex-1 overflow-hidden overflow-y-scroll pr-[1rem] rounded-2xl">
          <Result currentHotel={currentHotel} isLoading={isLoading} hotels={hotels} />
        </div>
        <div className="laptop:w-[50%] laptop:mt-0 laptop:h-auto tablet:mt-14 tablet:h-96 mobile:h-96 mobile:mt-10">
          <Map markerLocations={hotels} />
        </div>
      </div>
    </div>
  );
}

export default HotelsResult;

function Result({ isLoading, currentHotel, hotels }) {
  if (isLoading) return <Loader />;

  return (
    <div className="searchList flex flex-col gap-6">
      <h2 className="font-bold">Search Results ({hotels.length})</h2>
      {hotels.map((item) => (
        <Link
          key={item.id}
          to={`/hotels-result/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
        >
          <div
            className={`searchItem flex gap-6 laptop:text-[16px] tablet:text-[15px] mobile:text-[14px] -bg--light-gray h-44 rounded-3xl rounded-bl-none ${
              item.id === currentHotel?.id
                ? 'current-hotel rounded-xl p-2  border-solid border-[2px] -border--dark-green'
                : ''
            }`}
          >
            <img
              className="laptop:w-56 tablet:w-56 mobile:w-32 object-cover rounded-3xl rounded-bl-none rounded-tr-none"
              src={item.picture_url.url}
              alt={item.name}
            />
            <div className="searchItemDesc mb-2  flex flex-col gap-2 mt-4">
              <p className="location font-bold">{item.smart_location}</p>
              <p className="name text-slate-500">{item.name}</p>
              <p className="flex items-center font-semibold text-[15px] mobile:text-[14px]">
                €&nbsp;{item.price}&nbsp;
                <span className="text-slate-500">night</span>
              </p>
              <p className="-bg--dark-green text-white px-1 py-1.5 text-center rounded-full w-32 text-[13px] mt-3 hover:-bg--light-green hover:-text--dark-green">
                Book now
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
