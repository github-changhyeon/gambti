import React, { useContext } from 'react';
import styles from './Header.module.css';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AvatarComp from 'src/components/AvatarComp/AvatarComp';
import { useHistory } from 'react-router';
import routerInfo from 'src/constants/routerInfo';
import Button from '@material-ui/core/Button';
import fire from 'src/fire';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import { UserContext } from 'src/Context/UserContext';

export default function Header({ isLogin }) {
  const history = useHistory();
  const user = useContext(UserContext);

  // 로그아웃
  const logout = (event) => {
    fire.auth
      .signOut()
      .then(() => {
        history.push('/');
        window.localStorage.clear();
        alert('로그아웃 되었습니다 !!');
      })
      .catch((error) => {
        // An error happened.
      });
  };

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
          {/* 알림 */}
          {isLogin && <NotificationsIcon className={styles.header_icon} />}
          {/* 로그인 */}
          {!isLogin && (
            <Button
              onClick={() => {
                history.push(routerInfo.PAGE_URLS.LOGIN);
              }}
              className={styles.header_accountBtn}
            >
              Login
            </Button>
          )}
        </div>
        <div className={styles.header_right_item}>
          {/* 프로필 */}
          {isLogin && (
            <div className={styles.dropdown}>
              <AvatarComp
                className={styles.dropbtn}
                size="small"
                textvalue={user.nickName.substring(0, 1)}
              ></AvatarComp>
              <div className={styles.dropdown_content}>
                <div className={styles.dropdown_menu}>
                  <p>
                    <FaceIcon />
                  </p>
                  <p>Profile</p>
                </div>
                <div onClick={logout} className={styles.dropdown_menu}>
                  <p>
                    <ExitToAppIcon />
                  </p>
                  <p>Logout</p>
                </div>
              </div>
            </div>
          )}
          {/* 회원가입 */}
          {!isLogin && (
            <Button
              onClick={() => {
                history.push(routerInfo.PAGE_URLS.CHECK_GAMBTI);
              }}
              style={{ color: 'white', fontSize: '0.65rem' }}
            >
              Sign Up
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
