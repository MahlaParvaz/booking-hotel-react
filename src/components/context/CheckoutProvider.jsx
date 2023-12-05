// CheckoutProvider.jsx

import React, { createContext, useContext, useState } from 'react';
import CalculateCheckout from '../../common/CalculateCheckout';
import { useHotels } from './HotelResultProvider';

const HotelContext = createContext();


export const CheckoutProvider = ({ children }) => {
  const { currentHotel } = useHotels();
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

  return (
    <HotelContext.Provider
      value={{
        date,
        setDate,
        options,
        setOptions,
        handleOptions,
        numberOfGuests,
        totalCost,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};
export const useHotelContext = () => useContext(HotelContext);
