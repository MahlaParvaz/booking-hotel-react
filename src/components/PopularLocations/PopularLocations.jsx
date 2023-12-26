import { Link, Route, Routes } from 'react-router-dom';
import HotelsInfo from '../../common/HotelsInfo';

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
    <div className="popularLocations w-full laptop:h-[450px] mb-10 p-0 relative flex flex-col  justify-center items-center gap-6 mobile:mt-[110px] tablet:mt-0 laptop:mt-0">
      <h2 className="w-[85%] px-4 text-lg font-bold">Popular Locations</h2>
      <div className="grid laptop:grid-cols-5 gap-8 tablet:grid-cols-3  mobile:grid-cols-1">
        {popularData.map((item) => (
          <Link key={item.name} to={`/popular-locations${item.pathname}`}>
            <div className="location h-[250px] flex flex-col-reverse items-start gap-6 cursor-pointer">
              <img
                className="laptop:w-[230px] mobile:w-[300px] tablet:w-[200px] h-[200px] rounded-[40px] shadow-xl hover:shadow-none object-cover"
                src={item.src}
                alt="city doesn't show"
              />

              <div className="description text-black px-4 font-bold">
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
