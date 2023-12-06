import { format } from 'date-fns';
import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useHotels } from '../context/HotelResultProvider';
import Loader from '../Loader/Loader';

function Checkout() {
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  const date = state.date[0];
  const formattedStartDate = format(date.startDate, 'MM/dd/yyyy');
  const formattedEndDate = format(date.endDate, 'MM/dd/yyyy');
  const numberOfGuests = state.numberOfGuests;
  const totalCost = state.totalCost;
  const stateObj = {
    date,
    formattedStartDate,
    formattedEndDate,
    numberOfGuests,
    totalCost,
  };
  const { currentHotel, getHotel, isLoadingCurrHotel } = useHotels();
  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrHotel || !currentHotel) return <Loader />;

  return (
    <div className="  flex  w-full  items-center justify-center ">
      <div className=" bg-white w-[85%] rounded-3xl flex flex-col items-center justify-start p-8 -mt-36 mr-20">
        <div className="w-full flex flex-col gap-4 mb-10">
          <h2 className="text-center font-semibold text-[20px] mb-6">Booking review</h2>
          <div className="flex  justify-between border-t-0 border-r-0 border-l-0 border-b-2 border-solid -border--light-gray p-2">
            <span>Move in:</span>
            <span> {formattedStartDate}</span>
          </div>
          <div className="flex justify-between border-t-0 border-r-0 border-l-0 border-b-2 border-solid -border--light-gray p-2">
            <span>Move out: </span>
            <span> {formattedEndDate}</span>
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
        <Link to={`/hotels-result/${currentHotel.id}/checkout/payment`} state={stateObj}>
          <div className="-bg--dark-green text-white w-56 p-2 text-center rounded-2xl hover:-bg--light-green hover:-text--dark-green">
            Confirm and pay
          </div>
        </Link>
      </div>
    </div>
  );
}
export default Checkout;
