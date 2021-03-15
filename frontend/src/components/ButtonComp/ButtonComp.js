import React from 'react';
import styles from './ButtonComp.module.css';
import Button from '@material-ui/core/Button';

export default function ButtonComp({ size, textvalue }) {

  // logout, editProfile(save, connect), 친구 추가 
  if (size === 'sm') {
    return (
      <div>
        <Button className={styles.sm} variant="contained">{textvalue}</Button>
      </div>
    );
  }
  // GameCard, UserCard, MainButton
  else if (size === 'md') {
    return (
      <div>
        <Button className={styles.md} variant="contained" >{textvalue}</Button>
      </div>
    );
  }
  // login, signup, Forgot, ForgotSent
  else if (size === 'lg') {
    return (
      <div>
        <Button className={styles.lg} variant="contained" color="primary">{textvalue}</Button>
      </div>
    );
  }
}

