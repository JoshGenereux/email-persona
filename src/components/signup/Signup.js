import React, { useState } from 'react';
import styles from './signup.module.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';

const URL = 'https://localhost:5432';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      firstName,
      lastName,
      email,
      password,
    };
    console.log(body);

    const response = await axios.post(`${URL}/handleInfo`, body);
  };

  return (
    <div className={styles.signup}>
      <div className={styles.header}>
        <div className={styles.headerText}>Email Persona</div>
      </div>
      <div className={styles.signupContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
          />
          <input
            className={styles.input}
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
          />
          <input
            className={styles.input}
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            className={styles.input}
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <button>Submit</button>
        </form>
      </div>
      <Link to="/">
        <button>Return to Login</button>
      </Link>
    </div>
  );
};

export default Signup;
