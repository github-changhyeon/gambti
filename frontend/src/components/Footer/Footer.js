import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_logo}>
        <img src="/images/gambti/gambti_logo.png" alt="logo" style={{ height: '20px' }} />
      </div>
      <div className={styles.footer_logo}>
        <li className={styles.footer_info}>About GAMBTI TEAM</li>
      </div>
      <div className={styles.footer_detail}>
        <div className={styles.footer_detail_section}>
          <ul>
            <li>이동규</li>
            <li>
              <p>특공머장</p>
            </li>
          </ul>
        </div>

        <div className={styles.footer_detail_section}>
          <ul>
            <li>김예슬</li>
            <li>
              <p>특공방구쟁이</p>
            </li>
          </ul>
        </div>
        <div className={styles.footer_detail_section}>
          <ul>
            <li>김창현</li>
            <li>
              <p>특공공주님</p>
            </li>
          </ul>
        </div>
        <div className={styles.footer_detail_section}>
          <ul>
            <li>박수빈</li>
            <li>
              <p>특공막내</p>
            </li>
          </ul>
        </div>

        <div className={styles.footer_detail_section}>
          <ul>
            <li>백민주</li>
            <li>
              <p>특공예쁜이</p>
            </li>
          </ul>
        </div>

        <div className={styles.footer_detail_section}>
          <ul>
            <li>윤기현</li>
            <li>
              <p>특공개구리</p>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footer_copyright}>Copyright 2021 WedgeTech. All rights reserved.</div>
    </div>
  );
}
