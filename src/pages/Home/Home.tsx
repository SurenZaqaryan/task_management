import { useState, useCallback } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignupForm/SignupForm';
import styles from './style.module.css';

function Home() {
  const [onLoginTab, setOnLoginTab] = useState(true);

  const toggleTab = useCallback(() => setOnLoginTab((prev) => !prev), []);

  return (
    <div className={styles.wrapper}>
      {onLoginTab ? <LoginForm /> : <SignupForm />}
      <div className={styles.toggle_signup_wrapper}>
        <div className={styles.toggle_signup_message_wrapper}>
          <span>{onLoginTab ? "Don't have an account?" : 'Already have an account ?'}</span>
          <span onClick={toggleTab} className={styles.toggle_signup_btn}>
            {onLoginTab ? 'Sign up' : 'Login'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
