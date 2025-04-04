import { FC, useCallback, useState } from 'react';
import styles from './style.module.css';
import { useSelector } from 'react-redux';
import { login, removeErrors } from '../../redux/userSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import { MdOutlineVisibilityOff, MdOutlineVisibility } from 'react-icons/md';

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { error: errorFromStore } = useSelector((state: RootState) => state.user);

  const handleLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      if (!email) {
        setError('The email cannot be empty!');
        setIsLoading(false);
        return;
      }

      if (!password) {
        setError('The password cannot be empty!');
        setIsLoading(false);
        return;
      }

      setError('');

      setTimeout(() => {
        dispatch(login({ email, password }));
        setIsLoading(false);
      }, 1000);
    },
    [dispatch, email, password],
  );

  const handleChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError('');
      dispatch(removeErrors());
      setEmail(e.target.value);
    },
    [dispatch],
  );

  const handleChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError('');
      dispatch(removeErrors());
      setPassword(e.target.value);
    },
    [dispatch],
  );

  return (
    <form className={styles.form} onSubmit={handleLogin}>
      <div className={styles.input_wrapper}>
        <label htmlFor="email" className={styles.input_label}>
          Email
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleChangeEmail}
          className={styles.input}
        />
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="password" className={styles.input_label}>
          Password
        </label>
        <div className={styles.password_input_wrapper}>
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={handleChangePassword}
            className={styles.input}
          />
          {isPasswordVisible ? (
            <MdOutlineVisibilityOff
              size={18}
              cursor="pointer"
              onClick={() => setIsPasswordVisible(false)}
            />
          ) : (
            <MdOutlineVisibility
              size={18}
              cursor="pointer"
              onClick={() => setIsPasswordVisible(true)}
            />
          )}
        </div>
      </div>

      <button type="submit" className={styles.login_btn}>
        {isLoading ? 'Loading..' : 'Login'}
      </button>
      {error && <h2 className={styles.error_message}>{error}</h2>}
      {errorFromStore && <h2 className={styles.error_message}>{errorFromStore}</h2>}
    </form>
  );
};

export default LoginForm;
