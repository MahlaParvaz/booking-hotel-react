import { useContext, useEffect, useReducer } from 'react';
import { createContext } from 'react';
import http from '../../services/httpService';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../../Hooks/useQuery';

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

  async function login(username, email, password) {
    try {
      const response = await http.get('/users', {
        params: { username, email, password },
      });

      const userData = response.data[0];

      if (userData) {
        dispatch({ type: 'login', payload: userData });
        setUser(userData);
        navigate(redirect);
      } else {
        console.error('Login failed: Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  async function signup(name, username, email, password) {
    try {
      const data = { name, username, email, password };

      const response = await http.post('/users', data);
      const userData = response.data[0];
      if (userData) {
        dispatch({ type: 'signup', payload: userData });
        setUser(userData);
        // navigate(redirect);
      } else {
        console.error('Signup failed: Invalid credentials');
      }
    } catch (error) {
      console.error('Error during signup:', error.response?.data || error.message);
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
