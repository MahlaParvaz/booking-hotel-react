import { Link, Route, Routes } from 'react-router-dom';
import HotelsInfo from '../ui/HotelsInfo';

const popularData = [
  {
    src: '/src/assets/img/city-iran.svg',
    name: 'Iran',
    pathname: '/iran',
  },
  {
    src: '/src/assets/img/city-london 1.svg',
    name: 'London',
    pathname: '/london',
  },
  {
    src: '/src/assets/img/city-paris 1.svg',
    name: 'France',
    pathname: '/france',
  },
  {
    src: '/src/assets/img/city-netherland 1.svg',
    name: 'Netherland',
    pathname: '/netherland',
  },
  {
    src: '/src/assets/img/city-america 1.svg',
    name: 'America',
    pathname: '/america',
  },
];

function PopularLocations() {
  return (
    <div className="app-container ">
      <h2 className="w-[85%] px-4 text-lg font-bold">Popular Locations</h2>
      <div className="grid laptop:grid-cols-5 gap-8 tablet:grid-cols-3  mobile:grid-cols-1">
        {popularData.map((item) => (
          <Link key={item.name} to={`/popular-locations${item.pathname}`}>
            <div className="popular__location ">
              <img
                src={item.src}
                className="popular__img"
                alt={`City: ${item.name}`}
              />

              <div className="text-black px-4 font-bold">
                <p>{item.name}</p>
              </div>
            </div>
            <Routes>
              <Route path={item.pathname} element={<HotelsInfo />} />
            </Routes>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularLocations;
