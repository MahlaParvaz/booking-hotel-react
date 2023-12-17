import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useBookmark } from '../context/BookmarkListProvider';
import Loader from '../Loader/Loader';
import ReactCountryFlag from 'react-country-flag';

function SingleBookmark() {
  const { id } = useParams();
  const { getBookmark, currentBookmark, isLoadinCurrBookmark } = useBookmark();
  const navigate = useNavigate();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (isLoadinCurrBookmark || !currentBookmark) return <Loader />;

  return (
    <div className="currentBookmark ">
      <button
        onClick={() => navigate(-1)}
        className="btn btn--back border-solid  border-[1px] border-slate-300  py-2 text-white -bg--red shadow-md hover:shadow-none px-4 rounded-2xl"
      >
        &larr; Back
      </button>
      <h2 className=" my-4 mx-0 font-medium">{currentBookmark.cityName}</h2>
      <div
        className={`bookmarkItem mb-4 border-solid border-[1px] border-slate-300 shadow hover:shadow-none p-4 flex items-center justify-between rounded-2xl`}
      >
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;
