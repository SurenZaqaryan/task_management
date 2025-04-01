import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FC, ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated: isAuth } = useSelector((state: RootState) => state.user);
  return isAuth ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
