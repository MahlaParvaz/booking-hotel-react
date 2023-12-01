// import { Link } from 'react-router-dom';

import HotelsInfo from '../../common/HotelsInfo';

function Hotels() {
  return (
    <div className="nearbyLocatio mb-10 w-full  p-0 h-full flex flex-col  justify-center items-center gap-6 ">
      <h2 className="laptop:w-[85%] px-4  text-lg font-bold mt-16 ">Hotels</h2>
      <div className="locationList w-[90%]  py-4 px-10 rounded-lg grid grid-cols-4 gap-7 ">
        <HotelsInfo />
      </div>
    </div>
  );
}

export default Hotels;
