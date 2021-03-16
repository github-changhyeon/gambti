import styles from './GameCard.module.css';
import AvatarComp from 'src/components/AvatarComp/AvatarComp.js';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ButtonComp from 'src/components/ButtonComp/ButtonComp.js';
import Avatar from '@material-ui/core/Avatar';

export default function GameCard({ isLogin, gameInfo }) {
  let descriptionNum, descriptionText, buttonText;
  const cardColor = { color: '#ffffff' };
  if (isLogin) {
    descriptionNum = Number(gameInfo.totalJoin).toLocaleString();
    descriptionText = ' joined';
  } else {
    descriptionNum = gameInfo.suitedRate + '%';
    descriptionText = ' suited';
  }
  if (gameInfo.isJoin) {
    buttonText = 'Join Game';
  } else {
    buttonText = 'Joined';
  }

  const neonCard = (
    <div className={styles['neon-block']}>
      <div className={styles.block}>
        <span className={styles.rainbow}></span>

        <Card className={styles.game_card}>
          <CardMedia
            className={styles.game_card_background_img}
            image="https://m.gjcdn.net/community-header/950/18067-crop0_296_1920_776-npqpqk9f-v4.webp"
            title="Contemplative Reptile"
          />
          <CardContent className={styles.card_logo_img}>
            <AvatarComp size="xlarge" textvalue="temp" />
          </CardContent>
          <CardContent>
            <Typography className={styles.game_card_title} gutterBottom variant="h5" component="h2">
              {gameInfo.appName}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="span" style={cardColor}>
              {descriptionNum}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="span" style={cardColor}>
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
        image="https://m.gjcdn.net/community-header/950/18067-crop0_296_1920_776-npqpqk9f-v4.webp"
        title="Contemplative Reptile"
      />
      <CardContent className={styles.card_logo_img}>
        <AvatarComp size="xlarge" textvalue="temp" />
      </CardContent>
      <CardContent>
        <Typography className={styles.game_card_title} gutterBottom variant="h5" component="h2">
          {gameInfo.appName}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="span" style={cardColor}>
          {descriptionNum}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="span" style={cardColor}>
          {descriptionText}
        </Typography>
      </CardContent>
      <CardActions className={styles.game_card_button}>
        <ButtonComp size="medium" textvalue={buttonText}></ButtonComp>
      </CardActions>
    </Card>
  );

  let ret = normalCard;
  if (gameInfo.suitedRate > 70) ret = neonCard;

  return ret;
}
