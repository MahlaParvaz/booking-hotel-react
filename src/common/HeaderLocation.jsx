import { MdLocationOn } from 'react-icons/md';

function HeaderLocation({ destination, setDestination }) {
  return (
    <div className="headerSearchItem  flex  cursor-pointer items-center relative h-12 laptop:flex-1 laptop:w-64 tablet:flex-1 tablet:w-56 mobile:w-full -bg--light-gray  mobile:rounded-lg mobile:py-1  mobile:justify-center">
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
      <span className="seperator laptop:inline-block mobile:hidden  w-[1px] h-8 bg-slate-300 my-0 mx-1"></span>
    </div>
  );
}

export default HeaderLocation;
