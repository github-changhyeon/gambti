import styles from './GameCard.module.css';
import AvatarComp from 'src/components/AvatarComp/AvatarComp.js';
import { React, useState, useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ButtonComp from 'src/components/ButtonComp/ButtonComp.js';
import { Container } from '@material-ui/core';
import { joinAndLeave } from 'src/common/axios/Game';
import { usePalette } from 'react-palette';
import { useHistory, generatePath } from 'react-router-dom';
import routerInfo from 'src/constants/routerInfo';
import { UserContext } from 'src/Context/UserContext';

export default function GameCard({ gameInfo }) {
  const [descriptionNum, setDescriptionNum] = useState(
    gameInfo.joinUserCount
    // Number(gameInfo.joinUserCount).toLocaleString()
  );
  const [joined, setJoined] = useState(gameInfo.joined);
  const { data, loading, error } = usePalette(gameInfo.backgroundImagePath);
  const user = useContext(UserContext);

  const history = useHistory();

  const clickJoinBtn = () => {
    // console.log(token);

    console.log(user);
    if (!user.isLoggedIn) {
      alert('로그인 해주세요');
      return;
    }

    joinAndLeave(
      gameInfo.gameId,
      (response) => {
        if (response.data.status === 'success') {
          // setDescriptionNum(res.data.data);

          if (joined) {
            setDescriptionNum(descriptionNum - 1);
          } else {
            setDescriptionNum(descriptionNum + 1);
          }

          setJoined(!joined);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Card className={styles.game_card}>
      <CardMedia
        className={styles.game_card_background_img}
        image={gameInfo.backgroundImagePath}
        title="Contemplative Reptile"
      />
      <CardContent className={styles.card_logo_img}>
        <Container
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <AvatarComp
            size="xlarge"
            textvalue="temp"
            imgPath={gameInfo.logoImagePath}
            onClick={() => {
              history.push({
                pathname: generatePath(routerInfo.PAGE_URLS.DETAIL, {
                  gameId: gameInfo.gameId,
                }),
              });
            }}
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
          onClick={() => {
            history.push({
              pathname: generatePath(routerInfo.PAGE_URLS.DETAIL, {
                gameId: gameInfo.gameId,
              }),
            });
          }}
        >
          {gameInfo.appName}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          component="span"
          style={{ color: data.lightVibrant }}
        >
          {descriptionNum}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="span"
          style={{ color: data.lightVibrant }}
        >
          &nbsp; joined
        </Typography>
      </CardContent>
      <CardActions className={styles.game_card_button}>
        <ButtonComp
          size="medium"
          joined={joined}
          textvalue={joined ? 'JOINED' : 'JOIN GAME'}
          onClick={clickJoinBtn}
          color={data.lightVibrant}
        ></ButtonComp>
      </CardActions>
    </Card>
  );
}
