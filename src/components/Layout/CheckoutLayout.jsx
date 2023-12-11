import { format } from 'date-fns';
// import { useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { useHotels } from '../context/HotelResultProvider';
import { HiCalendar } from 'react-icons/hi';
// import Loader from '../Loader/Loader';
import { FaUsers } from 'react-icons/fa6';
import { useEffect } from 'react';
import Loader from '../Loader/Loader';
// import Checkout from '../Checkout/Checkout';

function CheckoutLayout() {
  return (
    <div className="  flex  w-full  items-center justify-center ">
      <div className="flex  flex-row-reverse justify-between items-center laptop:w-[85%] tablet:w-full  mt-24  gap-2 laptop:p-8 tablet:px-0 tablet:py-8 mb-10 ">
        <BookingDetail />
        <Outlet />
      </div>
    </div>
  );
}
export default CheckoutLayout;
function BookingDetail() {
  const location = useLocation();
  const { state } = location;
  const date = state?.date?.[0] || state?.date;
  const formattedStartDate = date ? format(date.startDate, 'MM/dd/yyyy') : '';
  const formattedEndDate = date ? format(date.endDate, 'MM/dd/yyyy') : '';

  const numberOfGuests = state?.numberOfGuests;
  const totalCost = state?.totalCost;
  //   console.log('detailstate', state.date.startDate);
  const { id } = useParams();
  const { currentHotel, isLoadingCurrHotel, getHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrHotel || !currentHotel) return <Loader />;

  return (
    <div className="laptop:w-[60%] tablet:w-[40%] -bg--light-gray h-full flex flex-col rounded-3xl  mr-3 ">
      <img
        className="w-full h-[300px]   object-cover  rounded-t-3xl rounded-b-0  mb-1"
        src={currentHotel.picture_url.url}
        alt={currentHotel.name}
      />
      <h2 className="mb-2 p-4 text-base mt-1  px-5 font-semibold ">
        {currentHotel.name}
      </h2>

      <div className="flex h-20 px-4  gap-2 justify-between mb-5">
        <div className="flex w-[50%]  flex-col justify-between p-2">
          <span className="font-semibold text-[16px]">Move in:</span>
          <div className="flex justify-start items-center text-[16px] ">
            <HiCalendar className="headerIcon dateIcon text-green-800  w-5 h-5 inline-block mr-1 -mt-0.5 " />
            {formattedStartDate}
          </div>
        </div>

        <div className="flex w-[50%] flex-col justify-between p-2">
          <span className="font-semibold text-[16px]">Move out: </span>
          <div className="flex justify-start items-center text-[16px]">
            <HiCalendar className="headerIcon dateIcon text-green-800  w-5 h-5 inline-block mr-1 -mt-0.5 " />
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
