import { format } from 'date-fns';
import { useLocation, useParams } from 'react-router-dom';
import { HiCalendar } from 'react-icons/hi';
import { FaUsers } from 'react-icons/fa6';
import { useEffect } from 'react';
import { useHotels } from '../features/hotels/HotelResultProvider';
import Loader from './Loader';

function BookingInfo() {
  const location = useLocation();
  const { state } = location;
  const date = state?.date?.[0] || state?.date;
  const formattedStartDate = date ? format(date.startDate, 'MM/dd/yyyy') : '';
  const formattedEndDate = date ? format(date.endDate, 'MM/dd/yyyy') : '';

  const numberOfGuests = state?.numberOfGuests;
  const totalCost = state?.totalCost;
  const { id } = useParams();
  const { currentHotel, isLoadingCurrHotel, getHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrHotel || !currentHotel) return <Loader />;

  return (
    <div className="booking-info ">
      <img
        className="w-full h-[300px]   object-cover  rounded-t-3xl rounded-b-0  mb-1"
        src={currentHotel.picture_url.url}
        alt={currentHotel.name}
      />
      <h2 className="mb-2 p-4 text-base mt-1  px-5 font-semibold ">
        {currentHotel.name}
      </h2>

      <div className="booking-info__date ">
        <div className="date__info">
          <span className="date__title">Move in:</span>
          <div className="flex justify-start items-center text-[16px] ">
            <HiCalendar className=" date__icon" />
            {formattedStartDate}
          </div>
        </div>

        <div className="date__info">
          <span className="date__title">Move out: </span>
          <div className="flex justify-start items-center text-[16px]">
            <HiCalendar className=" date__icon" />
            {formattedEndDate}
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center mobile:w-80  mb-6 w-full p-2 ml-5 ">
        <FaUsers className=" text-green-800   w-5 h-5  mr-3 " />
        <span className="text-[16px]">Number of guests : {numberOfGuests}</span>
      </div>
      <div className="flex flex-col ml-7 mb-5 w-[80%] font-semibold ">
        <p className="mb-5">Payment</p>
        <div className="flex justify-between items-center w-full font-medium">
          <span>Cost of hotel:</span>
          <span> ${totalCost}</span>
        </div>
      </div>
    </div>
  );
}

export default BookingInfo;
