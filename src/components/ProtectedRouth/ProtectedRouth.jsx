import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = () => {
      if (!isAuthenticated && !user) {
        // Save the current path to local storage
        localStorage.setItem('redirectPath', window.location.pathname);
        navigate('/login');
      }
    };

    handleRedirect();
  }, [isAuthenticated, user, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
