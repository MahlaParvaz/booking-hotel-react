import { HiMinus, HiPlus } from "react-icons/hi";

function RoomsOptionsItem({ options, type, minLimit, handleOptions }) {
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
            className="-bg--dark-green text-white hover:opacity-70 p-1 rounded-lg w-7 h-7 flex items-center justify-center"
          >
            <HiPlus className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default RoomsOptionsItem;
