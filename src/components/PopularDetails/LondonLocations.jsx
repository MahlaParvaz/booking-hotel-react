import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import useFetch from '../../Hooks/useFetch';
import PopularLocationsDetail from './PopularLocationsDetail';

function LondonLocations() {
  return <PopularLocationsDetail countryFilter="London" title="Hotels in London" />;
}

export default LondonLocations;
