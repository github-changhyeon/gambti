import React from 'react';
import styles from './Hashtag.module.css';
import Button from '@material-ui/core/Button';

export default function Hashtag({ value, color }) {
  if (value != null) {
    return (
      <span>
        <Button
          variant="contained"
          className={styles.hashtag}
          style={{ backgroundColor: `${color}` }}
        >
          {value}
        </Button>
      </span>
    );
  } else {
    return null;
  }
}
