import { useSelector } from 'react-redux';
import styles from './style.module.css';
import { RootState, useAppDispatch } from '../../redux/store';
import { logout } from '../../redux/userSlice';
import { FC, useCallback, useEffect, useState } from 'react';
import { clearTodos } from '../../redux/todosSlice';
import LogoutModal from '../LogoutModal/LogoutModal';
import { MdLogout } from 'react-icons/md';

const Header: FC = () => {
  const { name } = useSelector((state: RootState) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(logout());
      dispatch(clearTodos());
      setIsLoading(false);
    }, 1000);
  }, [dispatch]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <span className={styles.user_name}>{name}</span>
          <button className={styles.logout_btn} onClick={() => setIsModalActive(true)}>
            <MdLogout size={18} />
            Logout
          </button>
        </div>
      </div>
      {isModalActive && (
        <LogoutModal
          setIsModalActive={setIsModalActive}
          handleLogout={handleLogout}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default Header;
