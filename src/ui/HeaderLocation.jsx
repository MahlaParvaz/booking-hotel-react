import { MdLocationOn } from 'react-icons/md';
import { useSearchHotelsContext } from '../features/checkout/CheckoutProvider';

function HeaderLocation() {
  const { destination, setDestination } = useSearchHotelsContext();
  return (
    <div className="search__item laptop:w-72  tablet:w-[224px]">
      <MdLocationOn className="header__icon " />
      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        type="text"
        placeholder="Where are you going?"
        className="search__input  "
        name="destination"
        id="destination"
      />

      <span className="search__seperator"></span>
    </div>
  );
}

export default HeaderLocation;
