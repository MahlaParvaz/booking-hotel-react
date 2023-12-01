import { Link } from 'react-router-dom';
import useFetch from '../Hooks/useFetch';
import Loader from '../components/Loader/Loader';

function HotelsInfo() {
  const { data, isLoading, error } = useFetch('http://localhost:5000/hotels', '');

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <>
      {data.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels-result/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className="locationItem  flex flex-col items-center justify-center w-[270px]  py-2 px-2  cursor-pointer   "
              key={item.id}
            >
              <img
                className="w-full h-[200px] rounded-t-[60px] shadow-lg "
                src={item.picture_url.url}
                alt={item.name}
              />
              <Link
                to={`/hotels-result/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
                className="bookBtn absolute -bg--light-green text-green-800 text-md w-48 flex shadow-md  hover:shadow-none justify-center rounded-xl py-1  mt-10 "
              >
                <button>Book now</button>
              </Link>

              <div className="locationItemDesc px-6 bg-gray-100 text-[15px] h-[150px] w-full shadow-lg hover:shadow-none flex flex-col gap-1 p-4 rounded-b-[60px]  text-slate-600">
                <p className="locaiton mt-4 ">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  €&nbsp;{item.price}&nbsp;
                  <span className="text-slate-400">night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default HotelsInfo;
