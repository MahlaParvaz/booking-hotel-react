import { Link } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import Loader from '../Loader/Loader';
import PopularLocationsDetail from './PopularLocationsDetail';

export default function NetherlandLocations() {
  return (
    <PopularLocationsDetail countryFilter="Netherlands" title="Hotels in Netherlands" />
  );
}
