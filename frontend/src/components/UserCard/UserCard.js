import { React, useContext, useEffect, useState } from "react";
import styles from "./UserCard.module.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ButtonComp from "src/components/ButtonComp/ButtonComp.js";
import { Container } from "@material-ui/core";
import AvatarComp from "src/components/AvatarComp/AvatarComp.js";
import fire from "src/fire";
import routerInfo from "src/constants/routerInfo";
import { useHistory, generatePath } from "react-router";
import Button from "@material-ui/core/Button";
import { UserContext } from "src/Context/UserContext";
import { addFriend } from "src/common/axios/Friends";

export default function UserCard({ isLogin, simpleUserInfo }) {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(null);
  const [friendStatus, setFriendStatus] = useState(null);

  const user = useContext(UserContext);

  const clickAddBtn = (userId) => {
    const token = localStorage.getItem("idToken");
    if (token === null || token === undefined || !user) {
      alert("로그인 해주세요");
      return;
    }
    addFriend(userId, token, (response) => {
      setFriendStatus(1);
    });
  };

  useEffect(() => {
    fire.db
      .collection("users")
      .doc(simpleUserInfo.userId)
      .get()
      .then((user) => {
        setUserInfo(user.data());
      })
      .catch((error) => {
        console.log(error);
      });
    setFriendStatus(simpleUserInfo.friendStatus);
  }, []);

  // history.push({
  //   pathname: generatePath(routerInfo.PAGE_URLS.PROFILE_EDIT, {
  //     uid: userInfo.uid,
  //   }),

  return (
    <div style={{ width: "99%" }}>
      {userInfo ? (
        <Card className={styles.user_card}>
          <CardMedia
            className={styles.user_card_background_img}
            image="#"
            title="Contemplative Reptile"
          />

          {friendStatus === 4 ? (
            <CardContent
              className={styles.card_logo_img}
              onClick={() => {
                history.push({
                  pathname: generatePath(routerInfo.PAGE_URLS.PROFILE, {
                    uid: userInfo.uid,
                  }),
                });
              }}
            >
              <Container
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <AvatarComp
                  size="xlarge"
                  // textvalue="temp"
                  imgPath={userInfo.imgPath}
                />
              </Container>
            </CardContent>
          ) : (
            <CardContent
              className={styles.card_logo_img}
              onClick={() => {
                history.push({
                  pathname: generatePath(routerInfo.PAGE_URLS.PROFILE, {
                    uid: userInfo.uid,
                  }),
                });
              }}
            >
              <Container
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <AvatarComp
                  size="xlarge"
                  // textvalue="temp"
                  imgPath={userInfo.imgPath}
                />
              </Container>
            </CardContent>
          )}
          <CardContent style={{}}>
            <Typography
              className={styles.user_card_title}
              gutterBottom
              variant="h5"
              component="h2"
              noWrap={true}
            >
              {userInfo.nickname}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              component="span"
              style={{ color: "white" }}
            >
              {userInfo.email}
            </Typography>
            {/* <Typography variant="body2" color="textSecondary" component="span">
          {descriptionText}
        </Typography> */}
          </CardContent>
          <CardActions className={styles.user_card_button}>
            {
              // ADD
              friendStatus === 0 ? (
                <ButtonComp
                  size="medium"
                  joined={false}
                  color="#ccff00"
                  textvalue="ADD"
                  onClick={() => {
                    clickAddBtn(userInfo.uid);
                  }}
                ></ButtonComp>
              ) : //  친구 관계
              friendStatus === 1 ? (
                <Button className={styles.fix_btn}>FRIEND</Button>
              ) : // 요청 됨 SENT
              friendStatus === 2 ? (
                <Button className={styles.fix_btn}>SENT</Button>
              ) : // 요청 받은거 ACCEPT
              friendStatus === 3 ? (
                <ButtonComp
                  size="medium"
                  joined={false}
                  color="#ccff00"
                  textvalue="ACCEPT"
                  onClick={() => {
                    clickAddBtn(userInfo.uid);
                  }}
                ></ButtonComp>
              ) : (
                // 본인
                <ButtonComp
                  size="medium"
                  joined={false}
                  color="#ccff00"
                  textvalue="PROFILE"
                  onClick={() => {
                    history.push({
                      pathname: generatePath(routerInfo.PAGE_URLS.PROFILE, {
                        uid: userInfo.uid,
                      }),
                    });
                  }}
                ></ButtonComp>
              )
            }
            {/* <ButtonComp
          size="medium"
          joined={false}
          textvalue="ADD"
          onClick={clickAddBtn}
          color="#ccff00"
        ></ButtonComp> */}
          </CardActions>
        </Card>
      ) : null}
    </div>
  );
}
