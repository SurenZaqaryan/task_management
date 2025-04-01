import { useCallback, useState } from 'react';
import { validateEmail } from '../../helpers/validateEmail';
import { validatePassword } from '../../helpers/validatePassword';
import { validateConfirmedPassword } from '../../helpers/validateConfirmedPassword';
import { signup } from '../../redux/userSlice';
import { v4 as uuidv4 } from 'uuid';
import styles from './style.module.css';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';

function SignupForm() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { error: errorFromStore } = useSelector((state: RootState) => state.user);

  const handleSignup = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      if (name.trim().length <= 2) {
        setError('The name must be longer than 2 characters.');
        setIsLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        setError('The email must be in a valid email format.');
        setIsLoading(false);
        return;
      }

      if (!validatePassword(password)) {
        setError('The password must be at least 8 characters long.');
        setIsLoading(false);
        return;
      }

      if (!validateConfirmedPassword(password, confirmedPassword)) {
        setError('The password and confirm password must match.');
        setIsLoading(false);
        return;
      }

      setError('');

      setTimeout(() => {
        dispatch(signup({ name, email, password, id: uuidv4() }));
        setIsLoading(false);
      }, 1000);
    },
    [confirmedPassword, dispatch, email, password, name],
  );

  return (
    <form className={styles.form} onSubmit={handleSignup}>
      <div className={styles.input_wrapper}>
        <label htmlFor="name" className={styles.input_label}>
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="email" className={styles.input_label}>
          Email
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="password" className={styles.input_label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.input_wrapper}>
        <label htmlFor="confirmedPassword" className={styles.input_label}>
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmedPassword"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.signup_btn}>
        {isLoading ? 'Loading..' : 'Sign up'}
      </button>
      {error && <h2 className={styles.error_message}>{error}</h2>}
      {errorFromStore && <h2 className={styles.error_message}>{errorFromStore}</h2>}
    </form>
  );
}

export default SignupForm;
