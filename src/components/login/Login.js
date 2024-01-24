import React from 'react';
import styles from './login.module.scss';
import { Link } from 'react-router-dom';
import Home from '../home/Home';

const Login = () => {
  const handleHomeButton = () => {
    console.log('home');
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.header}>
        <div className={styles.headerText}>Email Persona</div>
        <div className={styles.signUpText}>Not a member?</div>
        <button className={styles.signUpButton}>Sign Up</button>
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.logo}></div>
        <div className={styles.subText}>Dive into your email personality</div>
        <form className={styles.inputForm}>
          <input className={styles.usernameInput} />
          <input className={styles.passwordInput} />
          <Link to="Home">
            <button className={styles.loginButton} onClick={handleHomeButton}>
              Log In
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
