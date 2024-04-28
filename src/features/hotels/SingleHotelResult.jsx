import { useEffect } from 'react';
import Loader from '../../ui/Loader';
import { useHotels } from './HotelResultProvider';
import Map from '../../ui/Map';
import PolicyDetail from '../../ui/PolicyDetail';
import { useParams } from 'react-router-dom';
import SingleHotelInfo from './SingleHotelInfo';

function SingleHotelResult() {
  const { id } = useParams();
  const { getHotel, isLoadingCurrHotel, currentHotel, hotels } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  return (
    <div className=" flex z-50 justify-center items-center w-full  mb-5  min-h-screen ">
      {isLoadingCurrHotel || !currentHotel ? (
        <Loader />
      ) : (
        <div className=" mt-[6rem] w-[90%]  flex flex-col items-center justify-between    ">
          <SingleHotelInfo currentHotel={currentHotel} />
          <div className="amentities mb-20 w-[90%] ">
            <h2 className="font-semibold laptop:text-[30px] mobile:text-[24px] text-center mb-8">
              Amenities
            </h2>
            <div className="grid laptop:grid-cols-3 tablet:grid-cols-2 mobile:grid-cols-2 gap-4">
              {currentHotel.amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  {amenity}
                </div>
              ))}
            </div>
          </div>
          <div className="h-[400px] mb-36 w-[90%] z-10">
            <p className="font-semibold  text-center mb-8 laptop:text-[30px] mobile:text-[24px]">
              Location
            </p>
            <Map markerLocations={hotels} />
          </div>
          <PolicyDetail />
        </div>
      )}
    </div>
  );
}

export default SingleHotelResult;
