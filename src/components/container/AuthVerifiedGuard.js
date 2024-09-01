import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'src/context/AuthContext';

const AuthVerifiedGuard = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isFetchingUserData, userData } = useContext(AuthContext);

  useEffect(() => {
    if (isFetchingUserData) return;
    if (!userData?.id) {
      navigate('/home');
      return;
    }
    if (userData?.is_pending) {
      navigate('/dashboard');
      return;
    }
  }, [window.location.href, isAuthenticated, isFetchingUserData]);

  return !isFetchingUserData && userData?.id && !userData?.is_pending ? children : null;
};

export default AuthVerifiedGuard;
