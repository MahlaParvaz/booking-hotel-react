import { createContext, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import http from '../../services/httpService';
import useFetchData from '../../hooks/useFetchData';

const HotelContext = createContext();
const BASE_URL = 'http://localhost:5000/hotels';

function HotelResultProvider({ children }) {
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCurrHotel, setIsLoadinCurrHotel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get('destination');
  const room = JSON.parse(searchParams.get('options'))?.room;

  const { isLoading, data: hotels } = useFetchData(
    BASE_URL,
    `q=${destination || ''}&accommodates_gte=${room || 1}`
  );

  async function getHotel(id) {
    setIsLoadinCurrHotel(true);
    try {
      const { data } = await http.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadinCurrHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadinCurrHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotels,
        currentHotel,
        getHotel,
        isLoadingCurrHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export default HotelResultProvider;

export function useHotels() {
  return useContext(HotelContext);
}
