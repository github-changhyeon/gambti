import styles from "./GameCard.module.css";
import AvatarComp from "src/components/AvatarComp/AvatarComp.js";
import { React, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ButtonComp from "src/components/ButtonComp/ButtonComp.js";
import Avatar from "@material-ui/core/Avatar";
import { Container } from "@material-ui/core";
import ColorThief from "colorthief";
import { restApi } from "src/common/axios/index";

export default function GameCard({ isLogin, gameInfo }) {
  let descriptionText, buttonText;
  const [cardColor, setCardColor] = useState("#ffffff");
  const [descriptionNum, setDescriptionNum] = useState(
    gameInfo.joinUserCount
    // Number(gameInfo.joinUserCount).toLocaleString()
  );
  const [joined, setJoined] = useState(gameInfo.joined);
  if (isLogin) {
    descriptionText = " joined";
  } else {
    descriptionText = " joined";
    // descriptionNum = gameInfo.metascore + "%";
    // descriptionText = " suited";
  }

  const clickJoinBtn = () => {
    const token = localStorage.getItem("idToken");
    // console.log(token);
    if (token === null || token === undefined) {
      alert("로그인 해주세요");
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Authorization': 'Bearer ' + accessToken
        },
      };
      restApi()
        .post(`games/joinLeave/${gameInfo.gameId}`, {}, config)
        .then((res) => {
          if (res.data.status === "success") {
            // setDescriptionNum(res.data.data);

            if (joined) {
              setDescriptionNum(descriptionNum - 1);
            } else {
              setDescriptionNum(descriptionNum + 1);
            }

            setJoined(!joined);
          }
        })
        .catch((err) => {});
    }
  };

  useEffect(() => {
    const colorThief = new ColorThief();
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = gameInfo.backgroundImagePath;
    img.addEventListener("load", function () {
      let arr = colorThief.getColor(img);
      // setCardColor(`rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`);
    });
  }, []);

  return gameInfo.metascore > 958 ? (
    <div className={styles["neon-block"]}>
      <div className={styles.block}>
        <span className={styles.rainbow}></span>

        <Card className={styles.game_card}>
          <CardMedia
            className={styles.game_card_background_img}
            image={gameInfo.backgroundImagePath}
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
                imgPath={gameInfo.logoImagePath}
              />
            </Container>
          </CardContent>
          <CardContent>
            <Typography
              className={styles.game_card_title}
              gutterBottom
              variant="h5"
              component="h2"
              noWrap={true}
            >
              {gameInfo.appName}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              component="span"
              style={{ color: cardColor }}
            >
              {descriptionNum}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="span"
              style={{ color: cardColor }}
            >
              {descriptionText}
            </Typography>
          </CardContent>
          <CardActions className={styles.game_card_button}>
            <ButtonComp
              size="medium"
              joined={joined}
              textvalue={joined ? "JOINED" : "JOIN GAME"}
              onClick={clickJoinBtn}
            ></ButtonComp>
          </CardActions>
        </Card>
      </div>
    </div>
  ) : (
    <Card className={styles.game_card}>
      <CardMedia
        className={styles.game_card_background_img}
        image={gameInfo.backgroundImagePath}
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
            imgPath={gameInfo.logoImagePath}
          />
        </Container>
      </CardContent>
      <CardContent>
        <Typography
          className={styles.game_card_title}
          gutterBottom
          variant="h5"
          component="h2"
          noWrap={true}
        >
          {gameInfo.appName}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          component="span"
          style={{ color: cardColor }}
        >
          {descriptionNum}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="span"
          style={{ color: cardColor }}
        >
          {descriptionText}
        </Typography>
      </CardContent>
      <CardActions className={styles.game_card_button}>
        <ButtonComp
          size="medium"
          joined={joined}
          textvalue={joined ? "JOINED" : "JOIN GAME"}
          onClick={clickJoinBtn}
        ></ButtonComp>
      </CardActions>
    </Card>
  );
}
