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
      <div className={styles.loginContainer}>
        <Link to="Home">
          <button onClick={handleHomeButton}>Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
