import React, { useState } from 'react';
import styles from './signup.module.scss';
import { Link } from 'react-router-dom';
import e from 'cors';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(firstName, lastName, email, password);
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
            onChange={handleFirstName}
            autoComplete="given-name"
          />
          <input
            className={styles.input}
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={handleLastName}
            autoComplete="family-name"
          />
          <input
            className={styles.input}
            type="email"
            value={email}
            placeholder="Email"
            onChange={handleEmail}
            autoComplete="email"
          />
          <input
            className={styles.input}
            type="password"
            value={password}
            placeholder="Password"
            onChange={handlePassword}
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
