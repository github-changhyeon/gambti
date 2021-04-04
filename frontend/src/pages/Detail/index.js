import { React, useEffect, useContext, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import styles from "./index.module.css";
import DetailYoutube from "src/pages/Detail/detail-components/DetailYoutube";
import DetailDrawer from "src/pages/Detail/detail-components/DetailDrawer";
import DetailMain from "src/pages/Detail/detail-components/DetailMain";
import DetailNews from "src/pages/Detail/detail-components/DetailNews";
import clsx from "clsx";
import { getGameDetail } from "src/common/axios/Game";

const useStyles = makeStyles((theme) => ({
  content: {
    // flexGrow: 1,
    width: "100%",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -300,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
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
          console.log("game detail 받아오기 실패");
        }
      },
      (error) => {
        console.log(error);
      }
    );
    //로그인여부에 따라 left width 64
  }, []);

  return (
    <div className={styles.detail_root}>
      {gameInfo ? (
        <DetailDrawer
          propsMatch={match}
          propsGameInfo={gameInfo}
        ></DetailDrawer>
      ) : null}
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: true,
        })}
      >
        <div className={styles.detail_left_container}>
          {match.params.tab === null || match.params.tab === undefined ? (
            gameInfo ? (
              <DetailMain
                propsMatch={match}
                propsGameInfo={gameInfo}
              ></DetailMain>
            ) : null
          ) : null}

          {match.params.tab === "youtube" ? (
            gameInfo ? (
              <DetailYoutube
                propsMatch={match}
                propsGameInfo={gameInfo}
              ></DetailYoutube>
            ) : null
          ) : null}

          {match.params.tab === "news" ? (
            gameInfo ? (
              <DetailNews
                propsMatch={match}
                propsGameInfo={gameInfo}
              ></DetailNews>
            ) : null
          ) : null}
        </div>
        <div className={styles.detail_right_container}>
          <div className={styles.detail_right_fixed}>
            여기에 오른쪽 컴포넌트 , 백그라운드 컬러는 index.mudule.css에
            detail_right_container에서 바꾸3
          </div>
        </div>
      </div>
    </div>
  );
}
