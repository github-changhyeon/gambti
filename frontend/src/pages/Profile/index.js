import React, { useEffect, useContext, useState } from "react";
import styles from "./index.module.css";
import { UserContext } from "src/Context/UserContext";
import { useLocation, useHistory, generatePath } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AvatarComp from "src/components/AvatarComp/AvatarComp";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import fire from "src/fire";
import ButtonComp from "src/components/ButtonComp/ButtonComp";
import { addFriend } from "src/common/axios/Friends";
import RecommendedFriends from "src/components/RecommendedFriends/RecommendedFriends";
import InfiniteScrollCard from "src/components/InfiniteScrollCard/InfiniteScrollCard";
import Button from "@material-ui/core/Button";
import { Container, Grid } from "@material-ui/core";
import GameCard from "src/components/GameCard/GameCard";
import { getUserJoinGames } from "src/common/axios/Game";

export default function Profile({ match }) {
  const location = useLocation();
  const history = useHistory();

  // 나 전체
  const fromUser = useContext(UserContext);
  // 상대방
  const toUser = match.params.uid;
  const [joinedGame, setJoinedGame] = React.useState(0);
  const [friendNumber, setFriendNumber] = React.useState(0);
  const [toUserInfo, setToUserInfo] = React.useState("");
  const [friendStatus, setFriendStatus] = React.useState(null);
  const [joinGameList, setJoinGameList] = useState(new Array());

  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setFriendStatus(null);
    ReadToUserInfo(toUser);
  }, [toUser]);

  // 게임 갯수 출력
  useEffect(() => {
    // getJoinGameNum(toUser);
    getUserJoinGames(
      (response) => {
        console.log("이거", response.data.data);
        if (response.data.status === "success") {
          setJoinGameList(response.data.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  // useEffect(() => {}, []);

  // tab 설정
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
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
    if (toUser === fromUser.uid) {
      setFriendStatus(3);
    }
    fire.db
      .collection("users")
      .doc(toUser)
      .get()
      .then((doc) => {
        setToUserInfo(doc.data());
        // setFriendNumber(doc.data().friends.length);
        fire.db
          .collection("users")
          .doc(toUser)
          .collection("friends")
          .get()
          .then((friends) => {
            // console.log(friends.docs)
            setFriendNumber(friends.docs.length);
          });
        fire.db
          .collection("users")
          .doc(toUser)
          .collection("joinGames")
          .get()
          .then((doc) => {
            console.log(doc.docs);
            setJoinedGame(doc.docs.length);
          });
      });
    fire.db
      .collection("users")
      .doc(fromUser.uid)
      .collection("friends")
      .onSnapshot((onSnapshot) => {
        onSnapshot.docs.map((doc) => {
          console.log("doc.id", doc.id);
          if (doc.id === toUser) {
            fire.db
              .collection("users")
              .doc(fromUser.uid)
              .collection("friends")
              .doc(toUser)
              .onSnapshot((userInfo) => {
                setFriendStatus(userInfo.data().status);
              });
          }
        });
      });

    // doc(toUser)
    //   .onSnapshot((snapshot) => {
    //     if (snapshot.data().status === undefined) {
    //       setFriendStatus(null);
    //     }
    //     setFriendStatus(snapshot.data().status);
    //   })
  };

  // axios 요청
  const handleAddFriend = (toUserId) => {
    const idToken = window.localStorage.getItem("idToken");
    console.log("idToken", idToken);

    addFriend(toUserId, idToken, (response) => {
      console.log(response);
    });
  };

  return (
    <div className={styles.root}>
      <br />
      <div className={styles.upper}>
        {/* 나의 정보 */}
        <div className={styles.section}>
          <Box className={styles.box}>
            <div className={styles.profile}>
              <AvatarComp
                size="superlarge"
                imgPath={toUserInfo.imgPath}
                textvalue={toUserInfo.nickname}
              ></AvatarComp>
              {/* <AvatarComp size="superlarge" textvalue={userInfo.nickname.substring(0, 1)} ></AvatarComp> */}
              <Typography className={styles.main_nick}>
                {toUserInfo.nickname}
              </Typography>
              {/* 버튼 구분 */}
              {
                // 친구 요청됨
                friendStatus === 0 ? (
                  <div className={styles.add_btn}>
                    <Button className={styles.fix_btn}>SEND</Button>
                  </div>
                ) : // 친구 수락/ 거절
                friendStatus === 1 ? (
                  <div className={styles.add_btn}>
                    <ButtonComp
                      size="noti"
                      color="#ccff00"
                      textvalue="ACCEPT"
                      onClick={() => {
                        handleAddFriend(toUser);
                      }}
                    ></ButtonComp>
                  </div>
                ) : // 친구 관계
                friendStatus === 2 ? (
                  <div className={styles.add_btn}>
                    <Button className={styles.fix_btn}>FRIEND</Button>
                  </div>
                ) : friendStatus === 3 ? (
                  <div className={styles.add_btn}>
                    <Button className={styles.fix_btn}>IT'S ME</Button>
                  </div>
                ) : (
                  // 친구 추가
                  <div className={styles.add_btn}>
                    <ButtonComp
                      size="noti"
                      color="#ccff00"
                      textvalue="ADD"
                      onClick={() => {
                        handleAddFriend(toUser);
                      }}
                    ></ButtonComp>
                  </div>
                )
              }
            </div>
            <Divider
              orientation="vertical"
              flexItem
              className={styles.divider}
            />
            <div className={styles.info}>
              <Box className={styles.default}>
                <div className={styles.profile_content}>
                  <Typography className={styles.profile_title}>
                    EMAIL
                  </Typography>
                  <Typography className={styles.profile_sub}>
                    {toUserInfo.email}
                  </Typography>
                </div>
                <Divider
                  orientation="vertical"
                  flexItem
                  className={styles.divider}
                />
                <div className={styles.profile_content}>
                  <Typography className={styles.profile_title}>
                    GAMBTI
                  </Typography>
                  <Typography className={styles.profile_sub}>
                    {toUserInfo.mbtiSub}
                  </Typography>
                </div>
              </Box>
              <div className={styles.info_num}>
                <div className={styles.info_group}>
                  <Typography className={styles.info_title}>JOINED</Typography>
                  <Typography className={styles.info_number}>
                    {joinedGame}
                  </Typography>
                </div>
                <div className={styles.info_group}>
                  <Typography className={styles.info_title}>FRIEND</Typography>
                  <Typography className={styles.info_number}>
                    {friendNumber}
                  </Typography>
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
      {/* <Box> */}
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        style={{ color: "white", margin: "0rem 0rem 0rem 3rem" }}
      >
        <Tab label="Joined Games" {...a11yProps(0)} className={styles.tab} />
      </Tabs>

      <TabPanel value={value} index={0} className={styles.tab_panel}>
        <Container className={styles.tab_container}>
          <Grid container spacing={4}>
            {joinGameList.map((game, i) => (
              <Grid
                item
                key={i}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <GameCard isLogin={true} gameInfo={game}></GameCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </TabPanel>
      {/* </Box> */}
    </div>
  );
}
