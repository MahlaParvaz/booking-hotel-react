import { Outlet } from 'react-router-dom';

import Map from '../Map/Map';
import { useBookmark } from '../context/BookmarkListProvider';

function BookmarkLayout() {
  const { bookmarks } = useBookmark();
  return (
    <div className=" flex z-50 justify-center items-center w-full  mb-5 ">
      <div className="appLayout  mt-[6rem] w-[90%] flex justify-between items-stretch h-screen mb-130 ">
        <div className="sidebar w-[40%] flex-1 overflow-hidden overflow-y-scroll pr-[1rem] ">
          <Outlet />
        </div>
        <Map markerLocations={bookmarks} />
      </div>
    </div>
  );
}

export default BookmarkLayout;
