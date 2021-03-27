import React from 'react';
import styles from './index.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import { Divider } from 'material-ui';


export default function Loading() {
  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <CircularProgress style={{ color: '#ccff00' }} />
          Loading...
      </div>
    </div>
  );
}
