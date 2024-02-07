import Loader from '../ui/Loader';
import Map from '../ui/Map';
import { useHotels } from '../features/hotels/HotelResultProvider';
import SearchResult from '../ui/SearchResult';

function HotelsResult() {
  const { isLoading, currentHotel, hotels } = useHotels();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex z-50 justify-center items-center w-full mb-5">
      <div className="hotel-result-layout mb-130 ">
        <div className="result__sidebar ">
          <SearchResult
            currentHotel={currentHotel}
            isLoading={isLoading}
            hotels={hotels}
          />
        </div>
        <div className="result__map ">
          <Map markerLocations={hotels} />
        </div>
      </div>
    </div>
  );
}

export default HotelsResult;
