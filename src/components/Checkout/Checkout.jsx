import { format } from 'date-fns';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useHotels } from '../context/HotelResultProvider';
import { HiCalendar } from 'react-icons/hi';
import Loader from '../Loader/Loader';
import { FaUsers } from 'react-icons/fa6';

function Checkout() {
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  const date = state.date[0];
  const formattedStartDate = format(date.startDate, 'MM/dd/yyyy');
  const formattedEndtDate = format(date.endDate, 'MM/dd/yyyy');
  const numberOfGuests = state.numberOfGuests;
  const totalCost = state.totalCost;

  const { currentHotel, getHotel, isLoadingCurrHotel } = useHotels();
  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrHotel || !currentHotel) return <Loader />;

  return (
    <div className="  flex  w-full  items-center justify-center ">
      <div className="flex  flex-row-reverse justify-between items-center w-[80%]  mt-24  gap-2 p-8 mb-10">
        <BookingDetail
          formattedEndtDate={formattedEndtDate}
          formattedStartDate={formattedStartDate}
          numberOfGuests={numberOfGuests}
          totalCost={totalCost}
          currentHotel={currentHotel}
        />
        {/* second part */}
        <BookingReview
          formattedEndtDate={formattedEndtDate}
          formattedStartDate={formattedStartDate}
          numberOfGuests={numberOfGuests}
          totalCost={totalCost}
          currentHotel={currentHotel}
        />
      </div>
    </div>
  );
}
export default Checkout;

function BookingDetail({
  formattedEndtDate,
  formattedStartDate,
  totalCost,
  numberOfGuests,
  currentHotel,
}) {
  return (
    <div className="w-[37%] -bg--light-gray h-full flex flex-col rounded-3xl  ">
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
            {formattedEndtDate}
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

function BookingReview({
  formattedEndtDate,
  formattedStartDate,
  totalCost,
  numberOfGuests,
  currentHotel,
}) {
  return (
    <div className=" bg-white w-[60%] rounded-3xl flex flex-col items-center justify-start p-8 -mt-36">
      <div className="w-full flex flex-col gap-4 mb-10">
        <h2 className="text-center font-semibold text-[20px] mb-6">Booking review</h2>
        <div className="flex  justify-between border-t-0 border-r-0 border-l-0 border-b-2 border-solid -border--light-gray p-2">
          <span>Move in:</span>
          <span> {formattedStartDate}</span>
        </div>
        <div className="flex justify-between border-t-0 border-r-0 border-l-0 border-b-2 border-solid -border--light-gray p-2">
          <span>Move out: </span>
          <span> {formattedEndtDate}</span>
        </div>
        <div className="flex justify-between border-t-0 border-r-0 border-l-0 border-b-2 border-solid -border--light-gray p-2">
          <span>Number of guests:</span>
          <span>{numberOfGuests}</span>
        </div>
        <div className="flex justify-between border-t-0 border-r-0 border-l-0 border-b-2 border-solid -border--light-gray p-2">
          <span>Price of one night :</span>
          <span>$ {currentHotel.price}</span>
        </div>
        <div className="flex justify-between border-t-0 border-r-0 border-l-0 border-b-2 border-solid -border--light-gray p-2">
          <span>Total cost :</span>
          <span>${totalCost}</span>
        </div>
      </div>
      <button className="-bg--dark-green text-white w-56 p-2 rounded-2xl hover:-bg--light-green hover:-text--dark-green">
        Confirm and pay
      </button>
    </div>
  );
}
