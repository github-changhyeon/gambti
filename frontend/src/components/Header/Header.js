import React from 'react';
import styles from './Header.module.css';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AvatarComp from 'src/components/AvatarComp/AvatarComp';

export default function Header() {
  const [atextvalue, setAtextvalue] = React.useState('Hi');

  return (
    <div className={styles.header}>
      <div className={styles.header_left}>GAMBTI</div>
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
        <div style={{ display: 'inline-block' }}>
          <NotificationsIcon className={styles.header_icon} />
          <AvatarComp
            className={styles.header_avatar}
            size="small"
            textvalue={atextvalue}
          ></AvatarComp>
        </div>
      </div>
    </div>
  );
}
