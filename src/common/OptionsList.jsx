import { useRef, useState } from 'react';
import useOutsideClick from '../Hooks/useOutSideClick';
import { HiMinus, HiPlus } from 'react-icons/hi';

function OptionsList({ options, setOptions, setOptionsDropDown }) {
  const handleOptions = (name, opration) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: opration === 'inc' ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const optionRef = useRef();
  useOutsideClick(optionRef, 'optionDropDown', () => setOptionsDropDown(false));
  return (
    <div
      ref={optionRef}
      className="bg-white z-50 flex flex-col gap-4 justify-between absolute top-[50px] ml-4 rounded-lg shadow-lg w-64  px-4 py-3  "
    >
      <OptionsItem
        type="adult"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
      <OptionsItem
        type="children"
        options={options}
        minLimit={0}
        handleOptions={handleOptions}
      />
      <OptionsItem
        type="room"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
    </div>
  );
}
export default OptionsList;
function OptionsItem({ options, type, minLimit, handleOptions }) {
  return (
    <div>
      <div className="flex justify-between ">
        <span>{type}</span>
        <div className="btns flex items-center justify-between w-[100px] mr-4">
          <button
            onClick={() => handleOptions(type, 'dec')}
            disabled={options[type] <= minLimit}
            className="bg-slate-100 p-1 hover:opacity-70 rounded-lg w-7 h-7 flex items-center justify-center"
          >
            <HiMinus className="icon " />
          </button>
          <span>{options[type]}</span>
          <button
            onClick={() => handleOptions(type, 'inc')}
            className="-bg--red text-white hover:opacity-70 p-1 rounded-lg w-7 h-7 flex items-center justify-center"
          >
            <HiPlus className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
