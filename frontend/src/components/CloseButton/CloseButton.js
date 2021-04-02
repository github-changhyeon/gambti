import React from 'react';
import styles from './CloseButton.module.css';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export default function CloseButton({ color, onClick }) {
  return (
    <HighlightOffIcon className={styles.closeButton} style={{ color: color }} onClick={onClick}></HighlightOffIcon>
  );
}
