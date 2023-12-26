// import { Link } from 'react-router-dom';

import HotelsInfo from '../../common/HotelsInfo';

function Hotels() {
  return (
    <div className="nearbyLocatio mb-10 w-full  p-0 h-full flex flex-col  justify-center items-center gap-6 ">
      <h2 className="w-[85%]  px-4  text-lg font-bold mt-24 ">Hotels</h2>
      <div className="locationList w-[90%]  py-4 px-10 rounded-lg grid laptop:grid-cols-4 tablet:grid-cols-2 mobile:grid-cols-1 mobile:mt-0 tablet:mt-0  gap-7 ">
        <HotelsInfo />
      </div>
    </div>
  );
}

export default Hotels;
