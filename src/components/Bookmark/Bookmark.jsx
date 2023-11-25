import ReactCountryFlag from 'react-country-flag';
import { Link } from 'react-router-dom';
import { HiTrash } from 'react-icons/hi';

import Loader from '../Loader/Loader';
import { useBookmark } from '../context/BookmarkListProvider';

function Bookmark() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } = useBookmark();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  if (!bookmarks.length) return <p>there is no bookmarked location</p>;
 
  return (
    <div>
      <h2 className=" my-4 font-medium">BookmarkList</h2>

      <div className="bookmarkList mt-4">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem mb-4 border-solid border-[1px] border-slate-300 shadow hover:shadow-none rounded-2xl p-4 flex items-center justify-between ${
                  item.id === currentBookmark?.id
                    ? 'current-bookmark border-solid border-[2px] -border--red -bg--light-gray '
                    : ''
                } `}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash -text--red w-5 h-5" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default Bookmark;
