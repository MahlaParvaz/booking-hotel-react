import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { useSearchHotelsContext } from '../features/checkout/CheckoutProvider';
import { useRef, useState } from 'react';
import useOutsideClick from '../hooks/useOutSideClick';
import { HiCalendar } from 'react-icons/hi';

function DatePicker() {
  const { date, setDate } = useSearchHotelsContext();
  const [openDate, setOpenDate] = useState(false);
  //  date useRef
  const dateRef = useRef();
  useOutsideClick(dateRef, 'dateDropDown', () => setOpenDate(false));
  return (
    <>
      <HiCalendar className=" header__icon h-6 mobile:ml-2" />

      <div
        className="dateDropDown mobile:w-80  text-slate-500  tablet:text-[15px]"
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
    </>
  );
}

export default DatePicker;
