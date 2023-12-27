import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import { HiCalendar } from 'react-icons/hi';
import useOutsideClick from '../Hooks/useOutSideClick';

function HeaderDatePicker({ date, setDate }) {
  const [openDate, setOpenDate] = useState(false);

  const dateRef = useRef();
  useOutsideClick(dateRef, 'dateDropDown', () => setOpenDate(false));
  return (
    <div className="headerSearchItem flex items-center   relative h-14 laptop:flex-1 laptop:w-80 mobile:w-full tablet:flex-1 tablet:w-48 laptop:-bg--light-gray tablet:-bg--light-gray mobile:border mobile:border-solid  mobile:p-[0.08rem] laptop:bg-none tablet:bg-none mobile:bg-gradient-to-tr mobile:from-neutral-800 mobile:via-neutral-950 mobile:to-neutral-700 mobile:border-b mobile:border-b-white/20  laptop:border-none tablet:border-none mobile:rounded-lg mobile:py-1  mobile:justify-center">
      <HiCalendar className="headerIcon dateIcon laptop:-text--red tablet:-text--red mobile:text-white  w-7 h-5 inline-block mr-3 " />
      <div
        className="dateDropDown mobile:w-80  laptop:text-slate-500 tablet:text-slate-500 mobile:text-white laptop:text-[16px] tablet:text-[14px] "
        onClick={() => setOpenDate(!openDate)}
        id="dateDropDown"
        ref={dateRef}
      >
        {`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(
          date[0].endDate,
          'MM/dd/yyyy'
        )}`}
        {openDate && (
          <DateRange
            className="date   absolute top-[50px] laptop:-left-[15px] tablet:-left-[15px] mobile:left-[10px] z-50 rounded-lg shadow-lg "
            onChange={(item) => setDate([item.selection])}
            ranges={date}
            minDate={new Date()}
            moveRangeOnFirstSelection={true}
          />
        )}
      </div>
      <span className="seperator laptop:inline-block mobile:hidden  w-[1px] h-8 bg-slate-300 my-0 mx-1"></span>
    </div>
  );
}

export default HeaderDatePicker;
