import { ImHome3 } from 'react-icons/im';
import OptionsList from './OptionsList';
import { useState } from 'react';

function HeaderRooms({ options, setOptions }) {
  const [optionsDropDown, setOptionsDropDown] = useState(false);

  return (
    <div className="headerSearchItem  flex  cursor-pointer items-center relative h-14 laptop:flex-1 laptop:w-64 tablet:flex-1 tablet:w-56 mobile:w-full  -bg--light-gray  mobile:rounded-lg mobile:py-2  mobile:justify-center  laptop:-bg--light-gray tablet:-bg--light-gray mobile:border mobile:border-solid  mobile:p-[0.08rem] laptop:bg-none tablet:bg-none mobile:bg-gradient-to-tr mobile:from-neutral-800 mobile:via-neutral-950 mobile:to-neutral-700 mobile:border-b mobile:border-b-white/20  laptop:border-none tablet:border-none">
      <ImHome3 className="headerIcon laptop:-text--red tablet:-text--red mobile:text-white   w-7 h-5 inline-block mr-3 " />
      <div
        id="optionDropDown "
        className="  mobile:w-80  laptop:text-slate-500 tablet:text-slate-500 mobile:text-white laptop:text-[16px] tablet:text-[14px] "
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
