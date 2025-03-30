import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);
  return isAuth ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
