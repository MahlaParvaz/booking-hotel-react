import { Link } from 'react-router-dom';
import Loader from './Loader';

function SearchResult({ isLoading, currentHotel, hotels }) {
  // if (isLoading) return <Loader />;

  return (
    <div className="search-list flex flex-col gap-6 ">
      <h2 className="font-bold">Search Results ({hotels.length})</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {hotels.map((item) => (
            <Link
              key={item.id}
              to={`/hotels-result/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={` search-list__item  ${
                  item.id === currentHotel?.id
                    ? 'current-hotel rounded-xl p-2  border-solid border-[2px] -border--dark-green'
                    : ''
                }`}
              >
                <img
                  className="item__img "
                  src={item.picture_url.url}
                  alt={item.name}
                />
                <div className="item__desc mb-2  flex flex-col gap-2 mt-4">
                  <p className="location font-bold">{item.smart_location}</p>
                  <p className="name text-slate-500">{item.name}</p>
                  <p className="flex items-center font-semibold text-[15px] mobile:text-[14px]">
                    €&nbsp;{item.price}&nbsp;
                    <span className="text-slate-500">night</span>
                  </p>
                  <p className="btn btn--primary  px-1 py-1.5  rounded-full w-32 text-[13px] mt-3 ">
                    Book now
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
}
export default SearchResult;
