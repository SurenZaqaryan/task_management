import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);
  return isAuth ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
