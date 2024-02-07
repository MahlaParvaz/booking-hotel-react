import { useRef } from 'react';
import useOutsideClick from '../hooks/useOutSideClick';
import RoomsOptionsItem from '../common/RoomsOptionsItem';
import { useSearchHotelsContext } from '../features/checkout/CheckoutProvider';

function RoomsOptionsList({ setOptionsDropDown }) {
  const { options, handleOptions } = useSearchHotelsContext();

  const optionRef = useRef();
  useOutsideClick(optionRef, 'optionDropDown', () => setOptionsDropDown(false));
  return (
    <div
      ref={optionRef}
      className="option-list z-50  gap-4  absolute  laptop:ml-6 tablet:ml-6 rounded-lg shadow-lg laptop:w-72 tablet:w-72 mobile:w-[310px]    "
    >
      <RoomsOptionsItem
        type="adult"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
      <RoomsOptionsItem
        type="children"
        options={options}
        minLimit={0}
        handleOptions={handleOptions}
      />
      <RoomsOptionsItem
        type="room"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
    </div>
  );
}
export default RoomsOptionsList;
