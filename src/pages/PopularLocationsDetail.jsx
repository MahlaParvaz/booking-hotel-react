import Loader from '../ui/Loader';
import Card from '../ui/Card';
import useFetchData from '../Hooks/useFetchData';

function PopularLocationsDetail({ countryFilter, title }) {
  const { data, isLoading, error } = useFetchData(
    'http://localhost:5000/hotels',
    ''
  );

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading data: {error.message}</div>;

  const filteredHotels = data.filter(
    (hotel) => hotel.country === countryFilter
  );

  return (
    <div className=" mb-10 w-full  p-0 h-full flex flex-col  justify-center items-center gap-6 ">
      <h2 className="laptop:w-[85%] tablet:w-[85%] mobile:w-[85%] px-4  text-lg font-bold mt-28 ">
        {title}
      </h2>
      <div className="cards ">
        {filteredHotels.map((item) => (
          <Card
            key={item.id}
            item={item}
            picture={item.picture_url.url}
            name={item.name}
            latitude={item.latitude}
            longitude={item.longitude}
            id={item.id}
            price={item.price}
            location={item.smart_location}
          />
        ))}
      </div>
    </div>
  );
}

export default PopularLocationsDetail;
