import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('oenexa_jwt');
    const email = localStorage.getItem('oenexa_email');
    if (token) {
      setIsAuthenticated(true);
      setUserEmail(email);
    }
  }, []);

  const login = (token: string, email: string) => {
    localStorage.setItem('oenexa_jwt', token);
    localStorage.setItem('oenexa_email', email);
    setIsAuthenticated(true);
    setUserEmail(email);
    navigate('/trade'); // Redirect to dashboard
  };

  const logout = () => {
    localStorage.removeItem('oenexa_jwt');
    localStorage.removeItem('oenexa_email');
    setIsAuthenticated(false);
    setUserEmail(null);
    navigate('/login');
  };

  return { isAuthenticated, userEmail, login, logout };
};
