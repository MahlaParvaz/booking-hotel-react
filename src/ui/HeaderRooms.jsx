import { ImHome3 } from 'react-icons/im';
import { useState } from 'react';
import RoomsOptionsList from '../common/RoomsOptionsList';
import { useSearchHotelsContext } from '../features/checkout/CheckoutProvider';

function HeaderRooms() {
  const { options } = useSearchHotelsContext();
  const [optionsDropDown, setOptionsDropDown] = useState(false);

  return (
    <div className="search__item mobile:py-2">
      <ImHome3 className="header__icon   h-5  " />
      <div
        id="optionDropDown "
        className="  mobile:w-80  text-slate-500  laptop:text-[16px] tablet:text-[14px] "
        onClick={() => setOptionsDropDown(!optionsDropDown)}
      >
        {options.adult} adult &bull; {options.children} children &bull;{' '}
        {options.room} room &bull;
      </div>
      {optionsDropDown && (
        <RoomsOptionsList setOptionsDropDown={setOptionsDropDown} />
      )}
    </div>
  );
}

export default HeaderRooms;
