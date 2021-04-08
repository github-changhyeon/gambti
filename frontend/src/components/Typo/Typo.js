import React, { useState, useEffect } from "react";
import styles from './Typo.module.css';
import Typography from "@material-ui/core/Typography";

export default function Typo({ text }) {

  return (
    <div className={styles.root}>
      <Typography className={styles.text}>{text}</Typography>
    </div>
  );
}
