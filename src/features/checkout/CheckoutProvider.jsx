// CheckoutProvider.jsx

import React, { createContext, useContext, useState } from 'react';
import CalculateCheckout from '../../ui/CalculateCheckout';
import { useHotels } from '../hotels/HotelResultProvider';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

const SearchHotelsContext = createContext();

export const SearchHotelsProvider = ({ children }) => {
  const { currentHotel } = useHotels();
  const [showPopup, setShowPopup] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get('destination') || ''
  );
  const navigate = useNavigate();

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOptions = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === 'inc' ? options[name] + 1 : options[name] - 1,
    }));
  };

  const numberOfGuests = options.adult + options.children;
  const totalCost = currentHotel
    ? CalculateCheckout(date, options, currentHotel.price)
    : 0;

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({
      pathname: '/hotels-result',
      search: encodedParams.toString(),
    });
    setShowPopup(false);
  };

  return (
    <SearchHotelsContext.Provider
      value={{
        date,
        setDate,
        options,
        setOptions,
        handleOptions,
        numberOfGuests,
        totalCost,
        handleSearch,
        showPopup,
        setShowPopup,
        searchParams,
        setSearchParams,
        destination,
        setDestination,
      }}
    >
      {children}
    </SearchHotelsContext.Provider>
  );
};
export const useSearchHotelsContext = () => useContext(SearchHotelsContext);
