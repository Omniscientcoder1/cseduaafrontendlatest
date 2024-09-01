import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'src/context/AuthContext';

const AuthAdminGuard = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isFetchingUserData, userData } = useContext(AuthContext);

  useEffect(() => {
    if (isFetchingUserData) return;
    if (!userData?.id) {
      navigate('/home');
      return;
    }
    if (!userData?.is_admin) {
      navigate('/dashboard');
      return;
    }
  }, [window.location.href, isAuthenticated, isFetchingUserData]);

  return !isFetchingUserData && userData?.id && userData?.is_admin ? children : null;
};

export default AuthAdminGuard;
