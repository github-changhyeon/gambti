import React from 'react';
import styles from './Header.module.css';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AvatarComp from 'src/components/AvatarComp/AvatarComp';
import { useHistory } from 'react-router';
import routerInfo from 'src/constants/routerInfo';

export default function Header() {
  let history = useHistory();
  const [atextvalue, setAtextvalue] = React.useState('김');

  return (
    <div className={styles.header}>
      <div className={styles.header_left}>
        <img
          className={styles.header_logo}
          src="/images/gambti_logo.png"
          alt="logo"
          onClick={() => {
            history.push(routerInfo.PAGE_URLS.HOME);
          }}
        />
      </div>
      <div className={styles.header_center}>
        <div className={styles.search_icon}>
          <SearchIcon />
        </div>
        <InputBase
          className={styles.input_root}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>

      <div className={styles.header_right}>
        <div className={styles.header_right_item}>
          <NotificationsIcon className={styles.header_icon} />
        </div>
        <div className={styles.header_right_item}>
          <AvatarComp size="small" textvalue={atextvalue}></AvatarComp>
        </div>
      </div>
    </div>
  );
}
