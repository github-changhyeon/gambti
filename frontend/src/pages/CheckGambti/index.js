import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import { useHistory } from 'react-router';

export default function CheckGambti() {

  const history = useHistory();

  const goLink = (event) => {
    history.push('/checkgambti');
  }


  return (
    <div className={styles.root}>
      <div className={styles.hero}>
        <div className={styles.inner_text}>
          <p className={styles.p1}>Let's find your</p>
          <br />
          <p className={styles.p2}>GAMBTI</p>
          <ButtonComp size='xlarge' textvalue='START' color='#CCFF00' onClick={goLink} className={styles.btn}></ButtonComp>
        </div>
      </div>
    </div >
  );
}
