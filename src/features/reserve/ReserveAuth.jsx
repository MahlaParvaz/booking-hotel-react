import { useContext, useReducer, useState } from 'react';
import { createContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useHotels } from '../hotels/HotelResultProvider';
import http from '../../services/httpService';

const BASE_URL = 'http://localhost:5000';

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};
function authReducer(state, action) {
  switch (action.type) {
    case 'reserves':
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case 'reserve/deleted':
      return {
        ...state,
        isLoadingCurrReserve: false,
        currentReserve: null,
      };
    case 'loading':
      return {
        ...state,
        isLoadingCurrReserve: true,
      };
    case 'reserve/rejected':
      return {
        ...state,
        isLoadingCurrReserve: false,
      };
    default:
      throw new Error('Unknown action!');
  }
}

export default function ReserveProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );
  const [currentReserve, setCurrentReserve] = useState(null);
  const [isLoadingCurrReserve, setIsLoadingCurrReserve] = useState(false);
  const navigate = useNavigate();
  const { currentHotel } = useHotels();

  function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
  }

  async function reserves(
    firstname,
    lastname,
    phoneNumber,
    email,
    paymentBy,
    reservationData
  ) {
    try {
      const data = {
        firstname,
        lastname,
        phoneNumber,
        email,
        paymentBy,
        ...reservationData,
      };
      const response = await http.post('/reserves', data);
      const userData = response.data[0];
      if (userData) {
        dispatch({ type: 'reserves', payload: userData });
        setUser(userData);
        // navigate(redirect);
      } else {
        console.error('Reserves failed: Invalid credentials');
      }
    } catch (error) {
      console.error(
        'Error during reserves:',
        error.response?.data || error.message
      );
    }
  }

  // ... (other imports)

  async function getReserves(id) {
    setIsLoadingCurrReserve(true);
    try {
      const { data } = await http.get(`/reserves/${id}`);
      setCurrentReserve(data);
      setIsLoadingCurrReserve(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // toast.error('Reservation not found');
        console.log(error);
      } else {
        // Handle other errors
        toast.error('Error fetching reservation data');
      }
      setIsLoadingCurrReserve(false);
    }
  }

  async function deleteReserve(id) {
    dispatch({ type: 'loading' });
    try {
      await http.delete(`${BASE_URL}/reserves/${id}`);
      dispatch({ type: 'reserve/deleted', payload: id });
      toast.success('Reservation deleted successfully');
      navigate(
        `/hotels-result/${currentHotel.id}/checkout/payment/active-reserves`
      );
    } catch (error) {
      toast.error('Reservation not found');
      dispatch({ type: 'reserve/rejected', payload: error.message });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setUser,
        reserves,
        getReserves,
        deleteReserve,
        isLoadingCurrReserve,
        currentReserve,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useReserveAuth() {
  return useContext(AuthContext);
}
