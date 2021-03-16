import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_logo}>
        <img
          // src=""
          alt="logo"
        />
        GAMBTI
      </div>
      <div className={styles.footer_detail}>
        <div className={styles.footer_detail_section}>
          <ul>
            <li>What's GAMBTI</li>
            <li>
              <a href="#">about us</a>
            </li>
          </ul>
        </div>

        <div className={styles.footer_detail_section}>
          <ul>
            <li>About</li>
            <li>
              <a href="#">about us</a>
            </li>
          </ul>
        </div>

        <div className={styles.footer_detail_section}>
          <ul>
            <li>Open Source</li>
            <li>
              <a href="#">open source</a>
            </li>
          </ul>
        </div>

        <div className={styles.footer_detail_section}>
          <ul>
            <li>Site Guidelines</li>
            <li>
              <a href="#">site map</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footer_copyright}>Copyright 2021 WedgeTech. All rights reserved.</div>
    </div>
  );
}
