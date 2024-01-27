import React, { useState } from 'react';
import styles from './login.module.scss';
import { Link } from 'react-router-dom';
import Home from '../home/Home';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handlePressSignupButton = () => {
    console.log('signup');
  };

  const handleHomeButton = () => {
    console.log(username);
    console.log(password);
  };

  const handleEmailInput = (e) => {
    setUsername((prev) => (prev = e.target.value));
  };

  const handlePasswordInput = (e) => {
    setPassword((prev) => (prev = e.target.value));
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.header}>
        <div className={styles.headerText}>Email Persona</div>
        <div className={styles.signUpText}>Not a member?</div>
        <Link to="signup">
          <button
            className={styles.signUpButton}
            onClick={handlePressSignupButton}
          >
            Sign Up
          </button>
        </Link>
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.logo}></div>
        <div className={styles.subText}>Dive into your email personality</div>
        <form className={styles.inputForm}>
          <input
            className={styles.usernameInput}
            placeholder="Username"
            type="text"
            value={username}
            onChange={handleEmailInput}
            autoComplete="username"
          />
          <input
            className={styles.passwordInput}
            placeholder="Password"
            type="password"
            value={password}
            onChange={handlePasswordInput}
            autoComplete="current-password"
          />
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
