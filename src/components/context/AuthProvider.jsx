import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import { createContext } from 'react';

const AuthContext = createContext();
const initialState = {
  user: null,
  isAthenticated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        user: action.payload,
        isAthenticated: true,
      };
    case 'logout':
      return {
        user: null,
        isAthenticated: false,
      };

    default:
      throw new Error('Unknown action!');
  }
}

// const USERS_INFO = {};
const FAKE_USER = {
  username: 'Saheb',
  email: 'user@gmail.com',
  password: '1234',
};

export default function AuthContextProvider({ children }) {
  const [{ user, isAthenticated }, dispatch] = useReducer(authReducer, initialState);

  //   useEffect(() => {
  //     // Fetch user data from your API and update USERS_INFO
  //     axios
  //       .get('http://localhost:5000/users') // Replace with your actual API endpoint
  //       .then((response) => {
  //         const userData = response.data;
  //         dispatch({ type: 'login', payload: userData });
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching user data:', error);
  //         dispatch({ type: 'logout' });
  //       });
  //   }, []);

  function login(username, email, password) {
    // const userFromAPI = USERS_INFO;
    if (
      username === FAKE_USER.username &&
      email === FAKE_USER.email &&
      password === FAKE_USER.password
    )
      dispatch({ type: 'login', payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
