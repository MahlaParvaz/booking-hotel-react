import { format } from 'date-fns';
import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Loader from '../../ui/Loader';
import { useHotels } from '../hotels/HotelResultProvider';

function CheckOut() {
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
    <div className="checkout  flex  w-full  items-center justify-center ">
      <div className="checkout__container ">
        <div className="checkout__list">
          <h2 className="text-center font-semibold text-[20px] mb-6">
            Booking review
          </h2>
          <div className="list__item">
            <span>Move in:</span>
            <span> {formattedStartDate}</span>
          </div>
          <div className="list__item">
            <span>Move out: </span>
            <span> {formattedEndDate}</span>
          </div>
          <div className="list__item">
            <span>Number of guests:</span>
            <span>{numberOfGuests}</span>
          </div>
          <div className="list__item">
            <span>Price of one night :</span>
            <span>$ {currentHotel.price}</span>
          </div>
          <div className="list__item">
            <span>Total cost :</span>
            <span>${totalCost}</span>
          </div>
        </div>
        <Link
          className="w-full flex justify-center items-center"
          to={`/hotels-result/${currentHotel.id}/checkout/payment`}
          state={stateObj}
        >
          <div className="btn btn--primary laptop:w-60 mobile:w-[350px] tablet:w-[85%]">
            Confirm and pay
          </div>
        </Link>
      </div>
    </div>
  );
}
export default CheckOut;
