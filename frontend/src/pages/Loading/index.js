import React from 'react';
import styles from './index.module.css';
import Container from '@material-ui/core/Container';
import { Divider } from 'material-ui';


export default function Loading() {
  return (
    <div className={styles.root}>
      <div className={styles.form}>
        Loading...
      </div>
    </div>
  );
}
