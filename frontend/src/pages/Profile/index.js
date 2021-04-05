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
  const [joinedGame, setJoinedGame] = React.useState(8);
  const [friendNumber, setFriendNumber] = React.useState(1);
  const [toUserInfo, setToUserInfo] = React.useState('');

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    ReadToUserInfo(toUser)
  }, [toUser])

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

  const ReadToUserInfo = (toUser) => {
    fire.db.collection("users").doc(toUser).get()
      .then((doc) => {
        setToUserInfo(doc.data());
      })
  }

  // axios 요청
  const handleAddFriend = (toUserId) => {
    const idToken = window.localStorage.getItem('idToken');
    // console.log('idToken', idToken);

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
              <AvatarComp size="superlarge" textvalue={toUserInfo.nickname} ></AvatarComp>
              {/* <AvatarComp size="superlarge" textvalue={userInfo.nickname.substring(0, 1)} ></AvatarComp> */}
              <Typography className={styles.main_nick}>{toUserInfo.nickname}</Typography>
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
          <Tab label="MY PROFILE" {...a11yProps(0)} className={styles.tab}
          />
        </Tabs>

        {/* MY Profile edit */}
        <TabPanel value={value} index={0} className={styles.tab_panel}>
          <div style={{ margin: '1rem 5rem' }}>
            <Box className={styles.default}>
              <div className={styles.profile_content}>
                <Typography className={styles.profile_title}>EMAIL</Typography>
                <Typography className={styles.profile_sub}>{toUserInfo.email}</Typography>
              </div>
              <Divider orientation="vertical" flexItem className={styles.divider} />
              <div className={styles.profile_content}>
                <Typography className={styles.profile_title}>GAMBTI</Typography>
                <Typography className={styles.profile_sub}>{toUserInfo.mbti}</Typography>
              </div>
            </Box>
          </div>
          {/* 친구 추가 */}
          <div className={styles.section2}>
            <Box className={styles.friend_box}>
              <ButtonComp size='xlarge' textvalue='친구 추가' color='#ccff00'
                onClick={() => {
                  handleAddFriend(toUser);
                }}></ButtonComp>
            </Box>
          </div>
        </TabPanel>

      </Box>

    </div>
  );
}
