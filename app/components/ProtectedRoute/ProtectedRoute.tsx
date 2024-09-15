import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '~/hooks/Authorization/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, redirectPath}) => {
  const {isLoggedIn} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(redirectPath);
    }
  }, [isLoggedIn, navigate, redirectPath]);

  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
