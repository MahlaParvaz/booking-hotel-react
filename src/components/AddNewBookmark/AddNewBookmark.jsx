import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import ReactCountryFlag from 'react-country-flag';
import { useBookmark } from '../context/BookmarkListProvider';
import useUrlLocation from '../../Hooks/useUrlLocation';

const BASE_GEOCODING_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function AddNewBookmark() {
  const [lat, lng] = useUrlLocation();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);
  const { createBookmark } = useBookmark();

  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      setGeoCodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error("This location isn't a city! please click on city  ");
        setCityName(data.city || data.locality || '');
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;

    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + ' ' + country,
    };
    await createBookmark(newBookmark);
    navigate('/bookmark');
  };
  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError) return <storng>{geoCodingError}</storng>;

  return (
    <div>
      <h2 className="font-medium">Bookmark New Location</h2>
      <form className="form mt-8" onSubmit={handleSubmit}>
        <div className="formControl mb-4 relative">
          <label htmlFor="cityName " className="formLable block mb-2 ">
            CityName
          </label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="cityName"
            id="cityName"
            className="formInput border-solid border-[1px] border-slate-300 shadow p-2 rounded-2xl w-full"
          />
        </div>
        <div className="formControl mb-4 relative">
          <label htmlFor="country">Country</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="country"
            id="country"
            className="formInput border-solid border-[1px] border-slate-300 shadow p-2 rounded-2xl w-full"
          />
          <ReactCountryFlag
            className="flag absolute right-4 top-[50%]"
            svg
            countryCode={countryCode}
          />
        </div>
        <div className="buttons mt-8 flex items-center justify-between">
          <button
            className="btn btn--back w-24 py-2 px-4 rounded-lg bg-slate-900 text-white"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            &larr; Back
          </button>
          <button className="btn btn--primary w-24 py-2 px-4 rounded-lg -bg--violet-700 text-white ">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddNewBookmark;
