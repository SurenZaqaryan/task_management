import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FC, ReactNode } from 'react';

type PublicRouteProps = {
  children: ReactNode;
};

const PublicRoute: FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated: isAuth } = useSelector((state: RootState) => state.user);
  return isAuth ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
