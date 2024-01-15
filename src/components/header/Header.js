import React from 'react';
import styles from './header.module.scss';

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerText}>Header</div>
    </div>
  );
};

export default Header;