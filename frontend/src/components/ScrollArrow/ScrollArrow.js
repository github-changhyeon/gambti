import React, { useState } from 'react';
// import { FaArrowCircleUp } from 'react-icons/fa';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import styles from './ScrollArrow.module.css';

const ScrollArrow = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollTop);

  return (
    <ArrowUpwardIcon
      className={styles.scrollTop}
      onClick={scrollTop}
      style={{ display: showScroll ? 'flex' : 'none' }}
    />
  );
};

export default ScrollArrow;
