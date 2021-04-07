import React, { useEffect, useContext, useState } from 'react';
import styles from './index.module.css';
import { UserContext } from 'src/Context/UserContext';
import { useLocation, useHistory, generatePath } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import AvatarComp from 'src/components/AvatarComp/AvatarComp';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import fire from 'src/fire';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import { addFriend } from 'src/common/axios/Friends';
import RecommendedFriends from 'src/components/RecommendedFriends/RecommendedFriends';


export default function Profile({ match }) {
  const location = useLocation();
  const history = useHistory();

  // 나 전체
  const fromUser = useContext(UserContext);
  // 상대방
  const toUser = match.params.uid;
  const [joinedGame, setJoinedGame] = React.useState(0);
  const [friendNumber, setFriendNumber] = React.useState(1);
  const [toUserInfo, setToUserInfo] = React.useState('');

  const [value, setValue] = React.useState(0);

  //게임 정보 출력
  useEffect(() => {
    ReadToUserInfo(toUser)
  }, [toUser])

  // 게임 갯수 출력
  useEffect(() => {
    getJoinGameNum(toUser);
  }, [])

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

  // 유저 정보 
  const ReadToUserInfo = (toUser) => {
    fire.db.collection("users").doc(toUser).get()
      .then((doc) => {
        setToUserInfo(doc.data());
        setFriendNumber(doc.data().friends.length)
      })
  }

  // 유저 조인 게임 갯수
  const getJoinGameNum = (toUser) => {
    fire.db.collection("users").doc(toUser).collection("joinGames").get()
      .then((doc) => {
        setJoinedGame(doc.docs.length)
      })
  }

  // axios 요청
  const handleAddFriend = (toUserId) => {
    const idToken = window.localStorage.getItem('idToken');
    console.log('idToken', idToken);

    addFriend(toUserId, idToken, (response) => {
      console.log(response);
    })
  }





  return (
    <div className={styles.root}>
      <br />
      <div className={styles.upper}>
        {/* 나의 정보 */}
        <div className={styles.section}>
          <Box className={styles.box}>
            <div className={styles.profile}>
              <AvatarComp size="superlarge" imgPath={toUserInfo.imgPath} textvalue={toUserInfo.nickname} ></AvatarComp>
              {/* <AvatarComp size="superlarge" textvalue={userInfo.nickname.substring(0, 1)} ></AvatarComp> */}
              <Typography className={styles.main_nick}>{toUserInfo.nickname}</Typography>
              <div className={styles.add_btn}>
                <ButtonComp size='noti' color='#ccff00' textvalue='ADD' onClick={() => {
                  handleAddFriend(toUser);
                }}></ButtonComp>
              </div>
            </div>
            <Divider orientation="vertical" flexItem className={styles.divider} />
            <div className={styles.info}>
              <Box className={styles.default}>
                <div className={styles.profile_content}>
                  <Typography className={styles.profile_title}>EMAIL</Typography>
                  <Typography className={styles.profile_sub}>{toUserInfo.email}</Typography>
                </div>
                <Divider orientation="vertical" flexItem className={styles.divider} />
                <div className={styles.profile_content}>
                  <Typography className={styles.profile_title}>GAMBTI</Typography>
                  <Typography className={styles.profile_sub}>{toUserInfo.mbtiSub}</Typography>
                </div>
              </Box>
              <div className={styles.info_num}>
                <div className={styles.info_group}>
                  <Typography className={styles.info_title}>JOINED</Typography>
                  <Typography className={styles.info_number}>{joinedGame}</Typography>
                </div>
                <div className={styles.info_group}>
                  <Typography className={styles.info_title}>FRIEND</Typography>
                  <Typography className={styles.info_number}>{friendNumber}</Typography>
                </div>
              </div>
            </div>
          </Box>
        </div>
        {/* 추천 친구 리스트 */}
        <div className={styles.section2}>
          <RecommendedFriends />
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
          <Tab label="Joined Games" {...a11yProps(0)} className={styles.tab}
          />
        </Tabs>

        {/* MY Profile edit */}
        <TabPanel value={value} index={0} className={styles.tab_panel}>

          {/* TODO: 게임 */}
          <div className={styles.section2}>
            게임
          </div>
        </TabPanel>

      </Box>

    </div>
  );
}
