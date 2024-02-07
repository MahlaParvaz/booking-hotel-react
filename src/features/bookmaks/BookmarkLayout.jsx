import { Outlet } from 'react-router-dom';

import Map from '../../ui/Map';
import { useBookmark } from './BookmarkListProvider';

function BookmarkLayout() {
  const { bookmarks } = useBookmark();
  return (
    <div className=" flex z-50 justify-center items-center w-full  mb-5 ">
      <div className="bookmark-layout   ">
        <div className="bookmark__sidebar">
          <Outlet />
        </div>
        <div className="bookmark__map  ">
          <Map markerLocations={bookmarks} />
        </div>
      </div>
    </div>
  );
}

export default BookmarkLayout;
