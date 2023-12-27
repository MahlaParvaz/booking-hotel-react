import { MdLocationOn } from 'react-icons/md';

function HeaderLocation({ destination, setDestination }) {
  return (
    <div className="headerSearchItem  flex  cursor-pointer items-center relative h-14 laptop:flex-1 laptop:w-64 tablet:flex-1 tablet:w-56 mobile:w-full -bg--light-gray  mobile:rounded-lg mobile:py-1  mobile:justify-center laptop:-bg--light-gray tablet:-bg--light-gray mobile:border mobile:border-solid  mobile:p-[0.08rem] laptop:bg-none tablet:bg-none mobile:bg-gradient-to-tr mobile:from-neutral-800 mobile:via-neutral-950 mobile:to-neutral-700 mobile:border-b mobile:border-b-white/20  laptop:border-none tablet:border-none">
      <MdLocationOn className="headerIcon locationIcon laptop:-text--red tablet:-text--red mobile:text-white w-7 h-6 inline-block mr-3 " />
      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        type="text"
        placeholder="Where are you going?"
        className="headerSearchInput laptop:placeholder:text-slate-500 tablet:placeholder:text-slate-500 mobile:placeholder:text-white py-2 px-1 w-80 laptop:-bg--light-gray tablet:-bg--light-gray laptop:bg-none tablet:bg-none mobile:bg-gradient-to-tr mobile:from-neutral-800 mobile:via-neutral-950 mobile:to-neutral-700 "
        name="destination"
        id="destination"
      />

      <span className="seperator laptop:inline-block mobile:hidden  w-[1px] h-8 bg-slate-300 my-0 mx-1"></span>
    </div>
  );
}

export default HeaderLocation;
