import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import Loader from '../../ui/Loader';
import ReactCountryFlag from 'react-country-flag';
import { useBookmark } from './BookmarkListProvider';

function SingleBookmark() {
  const { id } = useParams();
  const { getBookmark, currentBookmark, isLoadinCurrBookmark } = useBookmark();
  const navigate = useNavigate();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (isLoadinCurrBookmark || !currentBookmark) return <Loader />;

  return (
    <div className="current-bookmark ">
      <button onClick={() => navigate(-1)} className="btn btn--back ">
        &larr; Back
      </button>
      <h2 className=" my-4 mx-0 font-medium">{currentBookmark.cityName}</h2>
      <div
        className={`current-bookmark__item`}
      >
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;
