import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import PolicyDetail from '../PolicyDetail/PolicyDetail';
import { useHotels } from '../context/HotelResultProvider';
import { useReserveAuth } from '../context/ReserveAuth';

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

  if (isLoadingCurrResevere || !currentReserve || !currentHotel) return <Loader />;

  const handleDelete = async (id) => {
    await deleteReserve(id);
  };

  return (
    <div className="reservation mb-10 w-full  p-0 h-full flex flex-col  justify-center items-center gap-6 ">
      <div className="laptop:w-[75%]  tablet:w-[90%] mobile:w-[90%] flex justify-between items-center laptop:mt-0 tablet:mt-0 mobile:mt-0 ">
        <h2 className="laptop:w-[75%] px-4  text-lg font-bold mt-28 ">
          Reserve Information
        </h2>
        <button
          onClick={() => handleDelete(id)}
          className=" rounded-2xl shadow-lg -bg--red hover:opacity-75 hover:shadow-none text-white py-2 px-4 mt-28"
        >
          Cancel reserve
        </button>
      </div>
      <ReserveDetail currentReserve={currentReserve} />
      <HotelReserveInfo currentHotel={currentHotel} />
      <div className="reservationInfo shadow-md  border border-solid -border--light-gray laptop:w-[75%]  tablet:w-[90%] mobile:w-[90%] p-10 rounded-3xl   ">
        {currentReserve?.hotelId === currentHotel?.id ? <PolicyDetail /> : ''}
      </div>
    </div>
  );
}

export default ReservesInfo;

function ReserveDetail({ currentReserve }) {
  const startDate = new Date(currentReserve.formattedStartDate);
  const endDate = new Date(currentReserve.formattedEndDate);
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <div className="reservationInfo shadow-md border border-solid -border--light-gray laptop:w-[75%]  tablet:w-[90%] mobile:w-[90%]  p-10 rounded-3xl  ">
      <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-5">
        <div>
          <span className="font-semibold text-[15px]">Move in:</span>
          <span className="ml-3"> {currentReserve.formattedStartDate}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]">Move out:</span>
          <span className="ml-3"> {currentReserve.formattedEndDate}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]">Number of guests:</span>
          <span className="ml-3"> {currentReserve.numberOfGuests}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]">Costs:</span>
          <span className="ml-3">$ {currentReserve.totalCost}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]">Days:</span>
          <span className="ml-3"> {totalDays}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]">Reserve code: </span>
          <span className="ml-4">{currentReserve.hotelId}</span>
        </div>
      </div>
    </div>
  );
}

function HotelReserveInfo({ currentHotel }) {
  return (
    <div className="reservationInfo shadow-md  border border-solid -border--light-gray laptop:w-[75%] tablet:w-[90%] mobile:w-[90%] p-10 rounded-3xl  ">
      <h2 className=" font-semibold mb-10 text-[20px]">Hotel Information:</h2>
      <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-1 gap-6">
        <div>
          <span className="font-semibold text-[15px]">City name:</span>
          <span className="ml-3">{currentHotel.name}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]"> Rooms:</span>
          <span className="ml-3">{currentHotel.accommodates}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]"> Beds:</span>
          <span className="ml-3">{currentHotel.beds}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]"> Bathrooms:</span>
          <span className="ml-3">{currentHotel.bathrooms}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]"> Bedrooms:</span>
          <span className="ml-3">{currentHotel.bedrooms}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]">Hotel location:</span>
          <span className="ml-3">{currentHotel.smart_location}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]">Host name:</span>
          <span className="ml-3">{currentHotel.host_name}</span>
        </div>
        <div>
          <span className="font-semibold text-[15px]">Host email:</span>
          <span className="ml-3">{currentHotel.host_email}</span>
        </div>
      </div>
    </div>
  );
}
