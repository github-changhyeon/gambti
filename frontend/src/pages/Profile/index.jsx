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
import firebase from 'firebase';
import $ from 'jquery';
import AlertAddAlert from 'material-ui/svg-icons/alert/add-alert';



export default function Profile() {

  const location = useLocation();
  const history = useHistory();
  const user = useContext(UserContext);
  const currentUser = fire.auth.currentUser;
  const [joinedGame, setJoinedGame] = React.useState(8);
  const [friendNumber, setFriendNumber] = React.useState(1);

  const [value, setValue] = React.useState(0);

  // tab 설정
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
  const [currentpw, setCurrentpw] = useState('');
  const [nickError, setNickError] = useState(false);
  const [pwcheck, setPwcheck] = useState(false);
  const [pwcheckError, setPwcheckError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');


  useEffect(() => {
    setNickname(user.nickname);
  }, [])


  // niciname 설정
  const handleChangeNick = (event) => {
    setNickname(event.target.value);
    // console.log(nickname);
    // handleChangeNick.current.focus();
  }

  // nickname 수정, 수정 안될시 nickError
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
  }
  // enter하면 updateNick 함수 호출(수정)
  const handleNickKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updateNick();
    }
  };
  // 현재 비밀번호 설정
  const handleCurrentPasswordChange = (event) => {
    setCurrentpw(event.target.value);
  };
  // 현재 비밀번호가 user의 비밀번호와 일치한지 확인
  const handlePwKeyPress = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const credential = firebase.auth.EmailAuthProvider.credential(
        currentUser.email,
        event.target.value
      )
      await currentUser.reauthenticateWithCredential(credential)
        .then(() => {
          setPwcheck(true);
          setPwcheckError(false);
        })
        .catch(err => {
          console.log(err);
          setPwcheck(false);
          setPwcheckError(true);
        })
    }
  };
  // 비밀번호 규칙 
  const reg = /^(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/;

  // 새 비밀번호 설정
  const handlePasswordChange = (evnet) => {
    setPassword(evnet.target.value);
    if (!reg.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }
  // 새 비밀번호 확인
  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
    if (password !== passwordConfirm) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  }
  // 비밀번호 수정
  const handleSubmitKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (passwordError || passwordMatchError) {
        alert('조건에 적합하지 않은 부분이 있습니다.');
      } else {
        // 비밀번호 수정
        currentUser.updatePassword(password)
          .then(() => {
            alert('비밀번호 변경이 완료되었습니다.');
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  }


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
          <Tab label="MY DETAIL" {...a11yProps(1)} className={styles.tab}
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
            <form className={styles.edit}>
              <div className={styles.edit_content} >
                <label className={styles.edit_title}>닉네임 변경</label>
                <input
                  className={styles.edit_sub}
                  type="text"
                  value={nickname}
                  onChange={handleChangeNick}
                  onKeyPress={handleNickKeyPress}
                  autoFocus
                />
                {nickError && (
                  <div className={styles.error}>
                    10자 이내로 닉네임을 설정해 주세요!
                  </div>
                )}
              </div>
              <div className={styles.edit_content} >
                <label className={styles.edit_title}>비밀번호 변경</label>
                <input
                  type="password"
                  className={styles.edit_sub}
                  placeholder="현재 비밀번호를 입력해 주세요."
                  onChange={handleCurrentPasswordChange}
                  onKeyPress={handlePwKeyPress}
                  defaultValue={currentpw}
                  autoFocus
                />
                {pwcheckError && (
                  <div className={styles.error}>
                    비밀번호가 일치하지 않습니다.
                  </div>
                )}
                {pwcheck && (
                  <div className={styles.edit_pw} onKeyPress={handleSubmitKeyPress}
                  >
                    <input
                      type="password"
                      className={styles.edit_sub}
                      placeholder="새 비밀번호를 입력해주세요"
                      defaultValue={password}
                      onChange={handlePasswordChange}
                      autoFocus

                    />
                    {passwordError && (
                      <div className={styles.error}>
                        비밀번호는 소문자/ 숫자 포함 8자 이상, 20자 이하입니다.
                      </div>
                    )}
                    <input
                      type="password"
                      className={styles.edit_sub}
                      placeholder="새 비밀번호를 다시 한 번 입력해주세요"
                      defaultValue={passwordConfirm}
                      onChange={handlePasswordConfirmChange}
                      autoFocus
                    />
                    {passwordMatchError && (
                      <div className={styles.error}>
                        비밀번호가 일치하지 않습니다.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} className={styles.tab_panel}>
          MY GAMES
        </TabPanel>
      </Box>

    </div>
  );
}
