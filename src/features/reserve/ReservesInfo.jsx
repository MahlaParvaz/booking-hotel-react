import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../ui/Loader';
import PolicyDetail from '../../ui/PolicyDetail';
import { useReserveAuth } from './ReserveAuth';
import { useHotels } from '../hotels/HotelResultProvider';
import ReserveDetail from '../../ui/ReserveDetail';
import HotelReserveInfo from '../../ui/HotelReserveInfo';

function ReservesInfo() {
  const { id } = useParams();
  const { currentReserve, getReserves, isLoadingCurrResevere, deleteReserve } =
    useReserveAuth();
  const { currentHotel, getHotel } = useHotels();
  useEffect(() => {
    getReserves(id);
    if (currentReserve && currentReserve.hotelId) {
      getHotel(currentReserve.hotelId);
    }
  }, [id, currentReserve]);

  if (isLoadingCurrResevere || !currentReserve || !currentHotel)
    return <Loader />;

  const handleDelete = async (id) => {
    await deleteReserve(id);
  };

  return (
    <div className="reservation ">
      <div className="reservation__detail  ">
        <h2 className="laptop:w-[75%] px-4  text-lg font-bold mt-28 ">
          Reserve Information
        </h2>
        <button
          onClick={() => handleDelete(id)}
          className="btn btn--secondary rounded-2xl mt-28"
        >
          Cancel reserve
        </button>
      </div>
      <ReserveDetail currentReserve={currentReserve} />
      <HotelReserveInfo currentHotel={currentHotel} />
      <div className="reservation-info ">
        {currentReserve?.hotelId === currentHotel?.id ? <PolicyDetail /> : ''}
      </div>
    </div>
  );
}

export default ReservesInfo;
