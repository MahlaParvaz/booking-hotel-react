import { Link, useSearchParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import Loader from '../Loader/Loader';

function HotelsResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get('destination');
  const room = JSON.parse(searchParams.get('options'))?.room;
  const { isLoading, data } = useFetch(
    'http://localhost:5000/hotels',
    `q=${destination || ''}&accommodates_gte=${room || 1}`
  );

  if (isLoading) return <Loader />;

  return (
    <div className="searchList flex flex-col gap-8">
      <h2>Search Results ({data.length})</h2>
      {data.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels-result/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div className="searchItem flex gap-6">
              <img
                className="w-28 h-24 object-cover rounded-xl"
                src={item.picture_url.url}
                alt={item.name}
              />
              <div className="searchItemDesc mb-2  flex flex-col gap-1">
                <p className="location font-bold ">{item.smart_location}</p>
                <p className="name text-slate-500">{item.name}</p>
                <p className="flex items-center font-semibold text-[15px]">
                  €&nbsp;{item.price}&nbsp;
                  <span className="text-slate-500">night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default HotelsResult;
