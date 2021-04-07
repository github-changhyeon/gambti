import { React, useEffect, useState } from "react";
import styles from "../index.module.css";
import { usePalette } from "react-palette";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export default function DetailMain({ propsGameInfo }) {
  const { data, loading, error } = usePalette(
    propsGameInfo.backgroundImagePath
  );
  const wsThis = "/images/wordcloud/wc_" + propsGameInfo.gameId + ".png";
  const [isWC, setIsWC] = useState(false); // 밑에서 불러오기 !!

  useEffect(() => {
    console.log(propsGameInfo);

    isImage();
  }, []);

  function isImage() {
    var img = new Image();

    img.onload = function () {
      console.log("워드클라우드 있지롱");
      setIsWC(true);
    };

    img.onerror = function () {
      console.log("워드클라우드 없어 ㅠㅠㅠ");
    };

    img.src = wsThis;
  }

  return (
    <div className={styles.detail_main_container}>
      <div style={{ paddingLeft: "110px" }}>
        <Typography className={styles.detail_main_default_title}>
          {propsGameInfo.appName}
        </Typography>
      </div>
      <div className={styles.detail_main_root}>
        <div
          className={styles.detail_main_item}
          style={{ borderColor: data.lightVibrant }}
        >
          {/* <div style={{ padding: '10px 0' }}>
              <Typography className={styles.detail_main_title}>Main Image</Typography>
            </div> */}
          <div className={styles.detail_div_center}>
            <Button
              className={styles.detail_match_button}
              style={{ backgroundColor: data.lightVibrant }}
            >
              {" "}
              btn
            </Button>
          </div>
        </div>
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
            <div className={styles.detail_main_video}>
              <img
                src={propsGameInfo.logoImagePath}
                className={styles.detail_main_video}
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
            <div className={styles.detail_main_video}>
              <video
                autoPlay={true}
                muted={true}
                loop={true}
                controls={false}
                className={styles.detail_main_video}
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
            <div className={styles.detail_main_video}>
              <img src={wsThis} className={styles.detail_main_video}></img>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
