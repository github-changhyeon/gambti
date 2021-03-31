import { React, useEffect, useState } from "react";
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

export default function UserCard({ isLogin, simpleUserInfo }) {
  const [userInfo, setUserInfo] = useState({});

  const clickAddBtn = () => {
    const token = localStorage.getItem("idToken");
    // console.log(token);
    if (token === null || token === undefined) {
      alert("로그인 해주세요");
      return;
    }

    alert("친구추가");
  };

  useEffect(() => {
    fire.db
      .collection("users")
      .doc(simpleUserInfo.userId)
      .get()
      .then((user) => {
        console.log("유저", user.data());
        setUserInfo(user.data());
      });
  }, []);

  return (
    <Card className={styles.user_card}>
      <CardMedia
        className={styles.user_card_background_img}
        image="#"
        title="Contemplative Reptile"
      />
      <CardContent className={styles.card_logo_img}>
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <AvatarComp
            size="xlarge"
            textvalue="temp"
            imgPath={userInfo.imagePath}
          />
        </Container>
      </CardContent>
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
        <ButtonComp
          size="medium"
          joined={false}
          textvalue="ADD"
          onClick={clickAddBtn}
          color="#ccff00"
        ></ButtonComp>
      </CardActions>
    </Card>
  );
}
