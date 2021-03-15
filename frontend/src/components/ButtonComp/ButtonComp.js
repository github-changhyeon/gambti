import React from 'react';
import styles from './ButtonComp.module.css';
import Button from '@material-ui/core/Button';

export default function ButtonComp({ size, textvalue, onClick }) {

  // logout, editProfile(save, connect), 친구 추가 
  if (size === 'small') {
    return (
      <div>
        <Button className={styles.small} variant="contained">{textvalue}</Button>
      </div>
    );
  }
  // GameCard, UserCard, MainButton
  else if (size === 'medium') {
    return (
      <div>
        <Button className={styles.medium} variant="contained" >{textvalue}</Button>
      </div>
    );
  }
  // login, signup, Forgot, ForgotSent
  else if (size === 'large') {
    return (
      <div>
        <Button className={styles.large} variant="contained" onClick={onClick}>{textvalue}</Button>
      </div>
    );
  }
}

