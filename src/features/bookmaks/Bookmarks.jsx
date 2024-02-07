import ReactCountryFlag from 'react-country-flag';
import { Link } from 'react-router-dom';
import { HiTrash } from 'react-icons/hi';

import Loader from '../../ui/Loader';
import { useBookmark } from './BookmarkListProvider';

function Bookmarks() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmark();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  if (!bookmarks.length) return <p>there is no bookmarked location</p>;

  return (
    <div className="bookmark">
      <h2 className=" my-4 font-medium">BookmarkList</h2>

      <div className="bookmark__list mt-4">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmark__item  ${
                  item.id === currentBookmark?.id
                    ? 'bookmark__current  '
                    : ''
                } `}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className=" -text--red w-5 h-5" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default Bookmarks;
