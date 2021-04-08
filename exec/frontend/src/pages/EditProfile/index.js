import React, { useEffect, useContext, useState } from 'react';
import styles from './index.module.css';
import { UserContext } from 'src/Context/UserContext';
import { useLocation, useHistory, generatePath } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import fire from 'src/fire';
import EditProfiles from 'src/components/EditProfiles/EditProfiles';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import RecommendedFriends from 'src/components/RecommendedFriends/RecommendedFriends';

export default function EditProfile() {

  const location = useLocation();
  const history = useHistory();
  const user = useContext(UserContext);
  const currentUser = fire.auth.currentUser;
  const [joinedGame, setJoinedGame] = React.useState(0);
  const [friendNumber, setFriendNumber] = React.useState(0);
  const [img, setImg] = useState(user.imgPath);


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

  useEffect(() => {
    ReadInfo(user.uid)
  }, [])

  const ReadInfo = (userId) => {
    fire.db.collection("users").doc(userId).collection("friends").get()
      .then((friends) => {
        // console.log(friends.docs)
        setFriendNumber(friends.docs.length);
      })
    fire.db.collection("users").doc(userId).collection("joinGames").get()
      .then((doc) => {
        console.log(doc.docs)
        setJoinedGame(doc.docs.length)
      })
  }

  // 이미지 추가
  const handleChangeFile = (event) => {
    setImg(event.target.files[0])

    const reader = new FileReader()

    reader.readAsDataURL(event.target.files[0])
    reader.onloadend = (e) => {
      document.getElementById('imgView').setAttribute('src', e.target.result)
      // firestore에 img 저장
      fire.db.collection("users").doc(currentUser.uid).update({
        imgPath: e.target.result
      })
    }
  }
  console.log(user);

  const handleRemove = () => {
    setImg('/images/default-images.png')
  };


  return (
    <div className={styles.root}>
      <br />
      <div className={styles.upper}>
        {/* 나의 정보 */}
        <div className={styles.section}>
          <Box className={styles.box}>
            <div className={styles.profile}>
              <div className={styles.file_box}>
                <input id="propic" type="file" name="Inputfile" onChange={handleChangeFile} className={styles.file} />
                <img id="imgView" src={img ? img : "/images/default-image.png"} onClick={handleRemove} alt="" className={styles.file_profile} />
                <label className={styles.attach_icon}>
                  {/* <i className="fas fa-camera-retro color_black" style={{ fontSize: "1.0m", height: "100%" }}></i> */}
                  {/* <p style={{ fontSize: "3em", height: "100%", color: "white" }}>+</p> */}
                  <ControlPointIcon style={{ fontSize: "2em", height: "100%", color: "white" }} />
                </label>
              </div>

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
          <RecommendedFriends />
        </div>
      </div>

      <br />
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="00"
          style={{ color: 'white', margin: '0rem 0rem 0rem 3rem' }}
        >
          <Tab label="MY PROFILE" {...a11yProps(0)} className={styles.tab} />

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
                <Typography className={styles.profile_sub}>{user.mbti}</Typography>
              </div>
            </Box>
            <EditProfiles />
          </div>
        </TabPanel>
      </Box>

    </div >
  );
}
