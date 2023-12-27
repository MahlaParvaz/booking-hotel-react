import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedRedirectPath = localStorage.getItem('redirectPath');

    if (!isAuthenticated && !user) {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        navigate('/login');
      }
    }
    if (isAuthenticated && storedRedirectPath) {
      localStorage.removeItem('redirectPath');
      navigate(storedRedirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [isAuthenticated, user]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
