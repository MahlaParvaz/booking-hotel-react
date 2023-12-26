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
    <div className="headerSearchItem flex items-center   relative h-12 laptop:flex-1 laptop:w-80 mobile:w-full tablet:flex-1 tablet:w-48 -bg--light-gray  mobile:rounded-lg mobile:py-1  mobile:justify-center">
      <HiCalendar className="headerIcon dateIcon -text--red  w-7 h-5 inline-block mr-3 " />
      <div
        className="dateDropDown mobile:w-80 text-slate-500 laptop:text-[16px] tablet:text-[14px] "
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
            className="date   absolute top-[50px] -left-[15px] z-50 rounded-lg shadow-lg "
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
