import { useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import Loader from '../Loader/Loader';
import { useHotels } from '../context/HotelResultProvider';
import { useEffect } from 'react';

function SingleHotelResult() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrHotel, currentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrHotel || !currentHotel) return <Loader />;

  return (
    <div className="room flex items-stretch justify-between gap-4 max-w-[1280px] my-8 mx-auto">
      <div className="roomDetailh-[350px] w-full">
        <h2 className="mb-2 text-base">{currentHotel.name}</h2>
        <div className="mb-4">
          {currentHotel.number_of_reviews} reviews &bull; {currentHotel.smart_location}
        </div>
        <img
          className="w-full h-full  rounded-xl"
          src={currentHotel.xl_picture_url}
          alt={currentHotel.name}
        />
      </div>
    </div>
  );
}

export default SingleHotelResult;
