import React, { useEffect, useContext, useState } from 'react';
import styles from './index.module.css';
import { UserContext } from 'src/Context/UserContext';
import { useLocation, useHistory, generatePath } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import AvatarComp from 'src/components/AvatarComp/AvatarComp';
import Divider from '@material-ui/core/Divider';
import Button from "@material-ui/core/Button";
import RecFriend from './RecFriend';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import fire from 'src/fire';



export default function Profile() {

  const location = useLocation();
  const history = useHistory();
  const user = useContext(UserContext);
  const currentUser = fire.auth.currentUser;
  const [joinedGame, setJoinedGame] = React.useState(8);
  const [friendNumber, setFriendNumber] = React.useState(1);

  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={2}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const [nickname, setNickname] = React.useState(user.nickname);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [nickError, setNickError] = useState(false);
  const [pw, setPw] = useState(false);



  const handleChangeNick = (event) => {
    setNickname(event.target.value);
  }
  const updateNick = (event) => {
    if (1 > nickname.length || 10 < nickname.length) {
      setNickError(true);
    } else {
      setNickError(false);
      currentUser.updateProfile({
        displayName: nickname,
      });
      fire.db.collection("users").doc(currentUser.uid).update({
        nickname: nickname
      });
    }
    // TODO: back에도 정보수정 

  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordCheckChange = (event) => {
    setPasswordError(event.target.value !== password);
    setPasswordCheck(event.target.value);
  };
  const handleNickKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updateNick();
    }
  };
  const handlePwKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setPw(true)
    }
  };


  return (
    <div className={styles.root}>
      <br />
      <div className={styles.upper}>
        {/* 나의 정보 */}
        <div className={styles.section}>
          <Box className={styles.box}>
            <div className={styles.profile}>
              <AvatarComp size="superlarge" textvalue={user.nickname.substring(0, 1)} ></AvatarComp>
              <Typography className={styles.main_nick}>{user.nickname}</Typography>
            </div>
            <Divider orientation="vertical" flexItem className={styles.divider} />
            <div className={styles.info}>
              <div className={styles.info_group}>
                <Typography className={styles.info_title}>JOINED</Typography>
                <Typography className={styles.info_number}>{joinedGame}</Typography>
              </div>
              <div className={styles.info_group}>
                <Typography className={styles.info_title}>FRIEND</Typography>
                <Typography className={styles.info_number}>{friendNumber}</Typography>
              </div>
            </div>
          </Box>
        </div>
        {/* 추천 친구 리스트 */}
        <div className={styles.section2}>
          <Box className={styles.friend_box}>
            <Typography className={styles.rec_title}>RECOMMEND FRIEND</Typography>
            <div className={styles.friend_list}>
              <RecFriend></RecFriend>
              <RecFriend></RecFriend>
              <RecFriend></RecFriend>
              <RecFriend></RecFriend>
              <RecFriend></RecFriend>
              <RecFriend></RecFriend>
              <RecFriend></RecFriend>
              <RecFriend></RecFriend>
            </div>
          </Box>
        </div>
      </div>

      <br />
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          style={{ color: 'white', margin: '0rem 0rem 0rem 3rem' }}
        >
          <Tab label="MY PROFILE" {...a11yProps(0)} className={styles.tab}
          />
          <Tab label="MY GAMES" {...a11yProps(1)} className={styles.tab}
          />
        </Tabs>
        {/* MY Profile edit */}
        <TabPanel value={value} index={0} className={styles.tab_panel}>
          <div style={{ margin: '1rem 5rem' }}>
            <Box className={styles.default}>
              <div className={styles.profile_content}>
                <Typography className={styles.profile_title}>EMAIL</Typography>
                <Typography className={styles.profile_sub}>{user.email}</Typography>
              </div>
              <Divider orientation="vertical" flexItem className={styles.divider} />
              <div className={styles.profile_content}>
                <Typography className={styles.profile_title}>GAMBTI</Typography>
                <Typography className={styles.profile_sub}>용맹한 사자</Typography>
              </div>
            </Box>
            <Box className={styles.edit}>
              <div className={styles.edit_content} >
                <Typography className={styles.edit_title}>닉네임 변경</Typography>
                <input
                  id="nickname"
                  type="text"
                  value={nickname}
                  className={styles.edit_sub}
                  autoFocus
                  onKeyPress={handleNickKeyPress}
                  onChange={handleChangeNick}
                />
                {nickError && (
                  <div className={styles.error}>
                    10자 이내로 표현해주세요!
                  </div>
                )}
              </div>
              <div className={styles.edit_content} >
                <Typography className={styles.edit_title}>비밀번호 변경</Typography>
                <input
                  id="password"
                  type="password"
                  className={styles.edit_sub}
                  placeholder="현재 비밀번호를 입력해 주세요."
                  onChange={handlePasswordChange}
                  onKeyPress={handlePwKeyPress}
                  autoFocus
                />
                {pw && (
                  <div className={styles.edit_pw}>
                    <input
                      id="new_password"
                      type="password"
                      className={styles.edit_sub}
                      placeholder="새 비밀번호를 입력해주세요"
                    />
                    <input
                      id="new_password"
                      type="password"
                      className={styles.edit_sub}
                      placeholder="새 비밀번호를 다시 한 번 입력해주세요"
                    />
                  </div>
                )}
              </div>
            </Box>

          </div>
        </TabPanel>
        <TabPanel value={value} index={1} className={styles.tab_panel}>
          MY GAMES
        </TabPanel>
      </Box>

    </div>
  );
}
