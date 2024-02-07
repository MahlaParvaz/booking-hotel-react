import useFetch from '../hooks/useFetch';
import Loader from './Loader';
import Card from './Card';

function HotelsInfo() {
  const { data, isLoading, error } = useFetch(
    'http://localhost:5000/hotels',
    ''
  );

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <>
      {data.map((item) => {
        return (
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
        );
      })}
    </>
  );
}

export default HotelsInfo;
