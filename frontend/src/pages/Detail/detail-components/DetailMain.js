import { React, useEffect, useState, useContext } from "react";
import styles from "../index.module.css";
import { usePalette } from "react-palette";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { getGroupRoom } from "src/common/axios/Chat";
import { UserContext } from "src/Context/UserContext";
import { ChatContext } from "src/Context/ChatContext";

export default function DetailMain({ propsGameInfo }) {
  const user = useContext(UserContext);
  const { data, loading, error } = usePalette(
    propsGameInfo.backgroundImagePath
  );

  const mbtiMatch = "/images/mbti_chemistry/" + user.mbti + ".png";
  const wcThis = "/images/wordcloud/wc_" + propsGameInfo.gameId + ".png";
  const [isWC, setIsWC] = useState(false); // 밑에서 불러오기 !!
  const chatStore = useContext(ChatContext);

  const clickMatchFunc = () => {
    getGroupRoom(
      { appName: propsGameInfo.appName, gameId: propsGameInfo.gameId },
      (response) => {
        chatStore.dispatch({
          type: "clickMatchBtn",
          drawer: true,
          chat: true,
          roomId: response.data.data,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    isImage();
  }, [propsGameInfo]);

  function isImage() {
    let img = new Image();
    img.src = wcThis;

    img.onload = function () {
      setIsWC(true);
    };

    img.onerror = function () {
      setIsWC(false);
    };
  }

  return (
    <div className={styles.detail_main_container}>
      <div style={{ paddingLeft: "110px" }}>
        <Typography className={styles.detail_main_default_title}>
          {propsGameInfo.appName}
        </Typography>
      </div>
      <div className={styles.detail_main_root}>
        {user.isLoggedIn ? (
          <div
            className={styles.detail_main_item}
            style={{ borderColor: data.lightVibrant }}
          >
            <div style={{ padding: "10px 0" }}>
              <Typography className={styles.detail_main_title}>
                This is for you!
              </Typography>
            </div>
            <div className={styles.detail_main_contents}>
              <img
                src={mbtiMatch}
                className={styles.detail_main_contents}
              ></img>
            </div>
            <div className={styles.detail_div_center}>
              <Button
                className={styles.detail_match_button}
                style={{ backgroundColor: data.lightVibrant }}
                onClick={() => {
                  clickMatchFunc();
                }}
              >
                Match
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
        {propsGameInfo.videoUrl === null ? (
          <div
            className={styles.detail_main_item}
            style={{ borderColor: data.lightVibrant }}
          >
            <div style={{ padding: "10px 0" }}>
              <Typography className={styles.detail_main_title}>
                Main Image
              </Typography>
            </div>
            <div className={styles.detail_main_contents}>
              <img
                src={propsGameInfo.logoImagePath}
                className={styles.detail_main_contents}
              ></img>
            </div>
          </div>
        ) : (
          <div
            className={styles.detail_main_item}
            style={{ borderColor: data.lightVibrant }}
          >
            <div style={{ padding: "10px 0" }}>
              <Typography className={styles.detail_main_title}>
                Intro Video
              </Typography>
            </div>
            <div className={styles.detail_main_contents}>
              <video
                autoPlay={true}
                muted={true}
                loop={true}
                controls={false}
                className={styles.detail_main_contents}
                key={propsGameInfo.gameId}
              >
                <source src={propsGameInfo.videoUrl} type="video/mp4" />
              </video>
            </div>
          </div>
        )}
        {isWC ? (
          <div
            className={styles.detail_main_item}
            style={{ borderColor: data.lightVibrant }}
          >
            <div style={{ padding: "10px 0" }}>
              <Typography className={styles.detail_main_title}>
                Word Cloud
              </Typography>
              <Typography className={styles.detail_main_title_plus}>
                about {propsGameInfo.appName}
              </Typography>
            </div>
            <div className={styles.detail_main_contents}>
              <img src={wcThis} className={styles.detail_main_contents}></img>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
