import { Outlet } from 'react-router-dom';
import Map from '../Map/Map';

function HotelLayout() {
  return (
    <div className=" flex  justify-center items-center w-full  mb-5 ">
      <div className="appLayout  mt-[6rem] w-[90%] flex justify-between items-stretch h-screen mb-130 ">
        <div className="sidebar w=[40%] flex-1 overflow-hidden overflow-y-scroll pr-[1rem] ">
          <Outlet />
        </div>
        <Map />
      </div>
    </div>
  );
}

export default HotelLayout;
