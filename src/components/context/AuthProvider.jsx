import { useContext, useEffect, useReducer, useState } from 'react';
import { createContext } from 'react';
import http from '../../services/httpService';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../../Hooks/useQuery';
import toast from 'react-hot-toast';

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case 'logout':
      return {
        user: null,
        isAuthenticated: false,
      };
    case 'signup':
      return {
        user: action.payload,
        isAuthenticated: true,
      };

    default:
      throw new Error('Unknown action!');
  }
}

export default function AuthContextProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();
  const query = useQuery();
  const redirect = query.get('redirect') || '/';
  const [reloadPage, setReloadPage] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

        if (storedUser && storedIsAuthenticated === 'true') {
          dispatch({ type: 'login', payload: JSON.parse(storedUser) });
        } else {
          dispatch({ type: 'logout' });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        dispatch({ type: 'logout' });
      } 
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (reloadPage) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [reloadPage]);

  async function login(username, email, password) {
    try {
      const response = await http.get('/users', {
        params: { username, email, password },
      });

      const userData = response.data[0];

      if (userData) {
        dispatch({ type: 'login', payload: userData });
        setUser(userData);
        setReloadPage(true);
        navigate(redirect, { replace: true });
        toast.success('Your login was successful');
      } else {
        console.error('Login failed: Invalid credentials');
        toast.success('You have not an account please sign up');
      }
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      toast.success('Your login was not successful');
    }
  }
  async function signup(username, email, password, setError) {
    try {
      const isUsernameExist = await doesUsernameExist(username);

      if (isUsernameExist) {
        setError('username', {
          type: 'manual',
          message: 'This username already exists.',
        });
        return false;
      }

      const data = { username, email, password };
      const response = await http.post('/users', data);
      const userData = response.data;

      dispatch({ type: 'signup', payload: userData });
      setUser(userData);
      navigate(redirect, { replace: true });
      setReloadPage(true);

      toast.success('Your signup was successful');
    } catch (error) {
      console.error('Error during signup:', error.response?.data || error.message);
    }
  }
  async function doesUsernameExist(username) {
    try {
      const response = await http.get('/users', {
        params: { username },
      });

      return response.data.length > 0;
    } catch (error) {
      console.error('Error checking username existence:', error);
      return false;
    }
  }

  function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
  }

  function logout() {
    dispatch({ type: 'logout' });
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
