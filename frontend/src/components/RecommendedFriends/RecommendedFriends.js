import React, { useEffect, useContext } from 'react';
import styles from './RecommendedFriends.module.css';
import { UserContext } from 'src/Context/UserContext';
import { useLocation, useHistory, generatePath } from "react-router-dom";
import routerInfo from "src/constants/routerInfo";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import MediumProfile from 'src/components/MediumProfile/MediumProfile';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import { addFriend, getRecommendedFriends } from 'src/common/axios/Friends';
import fire from 'src/fire';


export default function RecommendedFriends() {

  const history = useHistory();

  const [recFriendList, setRecFriendList] = React.useState([])

  const recFriendListRef = React.useRef();
  recFriendListRef.current = recFriendList;

  useEffect(() => {
    getRecFriends();
    // 초기화
    setRecFriendList([]);
  }, [])


  const getRecFriends = () => {
    const idToken = window.localStorage.getItem('idToken');
    getRecommendedFriends(idToken, (response) => {

      let tempArray = new Array();

      // recFriend uid로 정보 받아오기
      response.data.data.userIds.map((recFriend, i) => {
        // fire
        fire.db.collection("users").doc(recFriend).get()
          .then((doc) => {
            // setRecFriendList([...recFriendListRef.current, doc.data()])
            tempArray.push(doc.data());
            if (i === response.data.data.userIds.length - 1) {
              console.log('temp', tempArray);
              setRecFriendList(tempArray);
            }


          })
          .catch((error) => {
            console.log(error)
          })
      })
    })
  }

  const addRecFriend = (recFriendId) => {
    const idToken = window.localStorage.getItem('idToken');
    // console.log('idToken', idToken);

    addFriend(recFriendId, idToken, (response) => {
      console.log(response);
      getRecFriends();

    })
  }



  return (

    <Box className={styles.friend_box}>
      <Typography className={styles.rec_title}>RECOMMEND FRIEND</Typography>
      <div className={styles.friend_list}>
        {
          recFriendList.map((recFriend, i) => {
            return (
              <div key={i} className={styles.root}>
                <div className={styles.rec_profile}
                  onClick={() => {
                    history.push({
                      pathname: generatePath(routerInfo.PAGE_URLS.PROFILE, {
                        uid: recFriend.uid,
                      }),
                    });
                  }}>
                  <MediumProfile
                    propsUser={{ nickname: recFriend.nickname, email: recFriend.email }}
                  ></MediumProfile>
                </div>

                <div className={styles.rec_button} onClick={() => {
                  addRecFriend(recFriend.uid)
                }} >
                  <ButtonComp size="xsmall" textvalue="ADD" color="#CCFF00" />

                </div>
              </div>);
          })
        }
      </div>
    </Box>
  );
}