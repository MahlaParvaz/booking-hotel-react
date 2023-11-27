import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import Loader from '../Loader/Loader';

const popularData = [
  {
    src: '/src/assets/img/city-iran.jpg',
    name: 'Iran',
    pathname: '/iran',
  },
  {
    src: '/src/assets/img/city-london.jpg',
    name: 'London',
    pathname: '/london',
  },
  {
    src: '/src/assets/img/city-paris.jpg',
    name: 'France',
    pathname: '/france',
  },
  {
    src: '/src/assets/img/city-netherland.jpg',
    name: 'Netherland',
    pathname: '/netherland',
  },
  {
    src: '/src/assets/img/city-america.jpg',
    name: 'America',
    pathname: '/america',
  },
];

function PopularLocations() {
  return (
    <div className="popularLocations w-full h-[450px] mb-10 p-0 relative flex flex-col  justify-center items-center gap-6">
      <h2 className="laptop:w-[85%] px-4 text-lg font-bold">Popular Locations</h2>
      <div className="grid grid-cols-5 gap-8 h-[300px]">
        {popularData.map((item) => (
          <Link key={item.name} to={`/popular-locations${item.pathname}`}>
            <div className="location h-[250px] flex flex-col-reverse items-start gap-6 cursor-pointer">
              <img
                className="w-[230px] h-[200px] rounded-[40px] shadow-xl hover:shadow-none object-cover"
                src={item.src}
                alt="city doesn't show"
              />

              <div className="description text-black px-4 font-bold">
                <p>{item.name}</p>
              </div>
            </div>
            <Routes>
              <Route path={item.pathname} element={<LocationsDetail />} />
            </Routes>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularLocations;

function LocationsDetail() {
  const { data, isLoading, error } = useFetch('http://localhost:5000/hotels', '');

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading data: {error.message}</div>;
  console.log('Data:', data);
  return (
    <div className="nearbyLocatio mb-10 w-full  p-0 h-full flex flex-col  justify-center items-center gap-6 ">
      <h2 className="laptop:w-[85%] px-4  text-lg font-bold mt-16 ">Hotels</h2>
      <div className="locationList w-[90%]  py-4 px-10 rounded-lg grid grid-cols-4 gap-7 ">
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
      </div>
    </div>
  );
}
