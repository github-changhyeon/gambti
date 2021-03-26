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

export default function GameCard({ isLogin, gameInfo }) {
  let descriptionNum, descriptionText, buttonText;
  const [cardColor, setCardColor] = useState("#ffffff");
  if (isLogin) {
    descriptionNum = Number(gameInfo.joinUserCount).toLocaleString();
    descriptionText = " joined";
  } else {
    descriptionNum = gameInfo.metascore + "%";
    descriptionText = " suited";
  }
  if (gameInfo.joined) {
    buttonText = "Joined";
  } else {
    buttonText = "Join Game";
  }

  const neonCard = (
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
              <AvatarComp size="xlarge" imgPath={gameInfo.logoImagePath} />
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
            <ButtonComp size="medium" textvalue={buttonText}></ButtonComp>
          </CardActions>
        </Card>
      </div>
    </div>
  );

  const normalCard = (
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
        <ButtonComp size="medium" textvalue={buttonText}></ButtonComp>
      </CardActions>
    </Card>
  );

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
            <ButtonComp size="medium" textvalue={buttonText}></ButtonComp>
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
        <ButtonComp size="medium" textvalue={buttonText}></ButtonComp>
      </CardActions>
    </Card>
  );
}
