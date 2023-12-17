import { Outlet } from 'react-router-dom';

import Map from '../Map/Map';
import { useBookmark } from '../context/BookmarkListProvider';

function BookmarkLayout() {
  const { bookmarks } = useBookmark();
  return (
    <div className=" flex z-50 justify-center items-center w-full  mb-5 ">
      <div className="appLayout  mobile:mt-[90%] laptop:mt-[6rem] tablet:mt-[6rem] mobile:flex-col w-[90%] flex laptop:flex-row tablet:flex-row  justify-between laptop:items-stretch tablet:items-stretch mobile:items-center laptop:h-screen tablet:h-screen mobile:h-[180vh]  ">
        <div className="sidebar laptop:w-[40%] tablet:w-[40%] mobile:w-[300px] flex-1 overflow-hidden overflow-y-scroll pr-[1rem] ">
          <Outlet />
        </div>
        <div className="location laptop:h-full tablet:h-full mobile:h-[440px] mb-36 laptop:w-[50%] tablet:w-[50%] mobile:w-full ">
          <Map markerLocations={bookmarks} />
        </div>
      </div>
    </div>
  );
}

export default BookmarkLayout;
