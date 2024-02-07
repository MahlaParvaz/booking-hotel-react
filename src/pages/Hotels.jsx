// import { Link } from 'react-router-dom';

import HotelsInfo from '../ui/HotelsInfo';

function Hotels() {
  return (
    <div className=" mb-10 w-full  p-0 h-full flex flex-col  justify-center items-center gap-6 ">
      <h2 className="w-[85%]  px-4  text-lg font-bold mt-24 ">Hotels</h2>
      <div className="cards  ">
        <HotelsInfo />
      </div>
    </div>
  );
}

export default Hotels;
