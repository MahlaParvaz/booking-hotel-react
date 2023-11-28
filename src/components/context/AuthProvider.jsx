import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { createContext } from 'react';

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

    default:
      throw new Error('Unknown action!');
  }
}

export default function AuthContextProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(authReducer, initialState);

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
      const response = await axios.get('http://localhost:5000/users', {
        params: { username, email, password },
      });

      const userData = response.data[0];

      if (userData) {
        dispatch({ type: 'login', payload: userData });
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        console.error('Login failed: Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  function setUser(user) {
    dispatch({ type: 'login', payload: user });
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
