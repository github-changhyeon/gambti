import React from 'react';
import styles from './NeonButton.module.css';

export default function NotiList({ onClick, textValue }) {
  return (
    <>
      <div className={styles.neonRoot} onClick={onClick}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {textValue}
      </div>
    </>
  );
}
