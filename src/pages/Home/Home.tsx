import { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignupForm/SignupForm';
import styles from './style.module.css';

function Home() {
  const [onLoginTab, setOnLoginTab] = useState(true);

  return (
    <div className={styles.wrapper}>
      {onLoginTab ? <LoginForm /> : <SignupForm />}
      <div className={styles.toggle_signup_wrapper}>
        {onLoginTab ? (
          <div className={styles.toggle_signup_message_wrapper}>
            <span>Don't have an account</span>
            <span onClick={() => setOnLoginTab(false)} className={styles.toggle_signup_btn}>
              Sign up
            </span>
          </div>
        ) : (
          <div className={styles.toggle_signup_message_wrapper}>
            <span>Already have an account ?</span>
            <span onClick={() => setOnLoginTab(true)} className={styles.toggle_signup_btn}>
              Login
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
