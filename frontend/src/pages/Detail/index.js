import { React, useEffect, useContext, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from './index.module.css';
import DetailInfo from 'src/pages/Detail/detail-components/DetailInfo';
import DetailYoutube from 'src/pages/Detail/detail-components/DetailYoutube';
import DetailDrawer from 'src/pages/Detail/detail-components/DetailDrawer';
import DetailMain from 'src/pages/Detail/detail-components/DetailMain';
import DetailNews from 'src/pages/Detail/detail-components/DetailNews';
import clsx from 'clsx';
import { getGameDetail } from 'src/common/axios/Game';
import ScrollArrow from 'src/components/ScrollArrow/ScrollArrow';

const useStyles = makeStyles((theme) => ({
  content: {
    // flexGrow: 1,
    width: '100%',
    // padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -300,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Detail({ match }) {
  const classes = useStyles();
  const theme = useTheme();
  const [gameInfo, setGameInfo] = useState(null);

  useEffect(() => {
    console.log(match);
    getGameDetail(
      match.params.gameId,
      (response) => {
        if (response.data.status) {
          console.log(response.data.data);
          setGameInfo(response.data.data);
        } else {
          console.log('game detail 받아오기 실패');
        }
      },
      (error) => {
        console.log(error);
      }
    );
    //로그인여부에 따라 left width 64
  }, [match]);

  return (
    <div className={styles.detail_root}>
      <ScrollArrow />
      {gameInfo ? <DetailDrawer propsMatch={match} propsGameInfo={gameInfo}></DetailDrawer> : null}
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: true,
        })}
      >
        <div
          className={
            match.params.tab === null || match.params.tab === undefined
              ? styles.detail_left_container_default
              : styles.detail_left_container
          }
        >
          {match.params.tab === null || match.params.tab === undefined ? (
            gameInfo ? (
              <>
                <div
                  className={styles.detail_main_img}
                  style={{
                    backgroundImage: `url(${gameInfo.backgroundImagePath})`,
                  }}
                >
                  <div className={styles.detail_main_img_after}></div>
                </div>
                <DetailMain propsGameInfo={gameInfo}></DetailMain>
              </>
            ) : null
          ) : null}

          {match.params.tab === 'youtube' ? (
            gameInfo ? (
              <DetailYoutube propsMatch={match} propsGameInfo={gameInfo}></DetailYoutube>
            ) : null
          ) : null}

          {match.params.tab === 'news' ? (
            gameInfo ? (
              <DetailNews propsMatch={match} propsGameInfo={gameInfo}></DetailNews>
            ) : null
          ) : null}
        </div>
        <div className={styles.detail_right_container}>
          <div
            className={
              match.params.tab === null || match.params.tab === undefined
                ? styles.detail_right_non_fixed
                : styles.detail_right_fixed
            }
          >
            {gameInfo ? <DetailInfo propsGameInfo={gameInfo} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
