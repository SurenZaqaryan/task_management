import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/userSlice';
import { useState } from 'react';
import { clearTodos } from '../../redux/todosSlice';

function Header() {
  const { name } = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(logout());
      dispatch(clearTodos());
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.user_name}>{name}</span>
        <button className={styles.logout_btn} onClick={handleLogout} disabled={isLoading}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
