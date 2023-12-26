import { ImHome3 } from 'react-icons/im';
import OptionsList from './OptionsList';
import { useState } from 'react';

function HeaderRooms({ options, setOptions }) {
  const [optionsDropDown, setOptionsDropDown] = useState(false);

  return (
    <div className="headerSearchItem  flex  cursor-pointer items-center relative h-12 laptop:flex-1 laptop:w-64 tablet:flex-1 tablet:w-56 mobile:w-full -bg--light-gray  mobile:rounded-lg mobile:py-1  mobile:justify-center">
      <ImHome3 className="headerIcon -text--red   w-7 h-5 inline-block mr-3 " />
      <div
        id="optionDropDown "
        className="  mobile:w-80  text-slate-500 laptop:text-[16px] tablet:text-[14px] "
        onClick={() => setOptionsDropDown(!optionsDropDown)}
      >
        {options.adult} adult &bull; {options.children} children &bull; {options.room}{' '}
        room &bull;
      </div>
      {optionsDropDown && (
        <OptionsList
          setOptionsDropDown={setOptionsDropDown}
          options={options}
          setOptions={setOptions}
        />
      )}
    </div>
  );
}

export default HeaderRooms;
