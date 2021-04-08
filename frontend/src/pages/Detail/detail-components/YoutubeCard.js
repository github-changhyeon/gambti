import { React, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import styles from "../index.module.css";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";

export default function YoutubeCard({ propsYoutubeInfo }) {
  const [viewCount, setViewCount] = useState("");
  const [channelImage, setChannelImage] = useState("");

  const keyArr = [
    process.env.REACT_APP_YOUTUBE_API_KEY1,
    process.env.REACT_APP_YOUTUBE_API_KEY2,
    process.env.REACT_APP_YOUTUBE_API_KEY3,
    process.env.REACT_APP_YOUTUBE_API_KEY4,
    process.env.REACT_APP_YOUTUBE_API_KEY5,
  ];

  const goToChannel = (path) => {
    window.open(path);
  };
  const goToVideo = (path) => {
    window.open(path);
  };

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 5);
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${propsYoutubeInfo.videoId}&maxResults=10&key=${keyArr[randomNum]}`
      )
      .then((video) => {
        setViewCount(
          Number(video.data.items[0].statistics.viewCount).toLocaleString("en")
        );
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${propsYoutubeInfo.channelId}&maxResults=1&key=${keyArr[randomNum]}`
      )
      .then((channel) => {
        setChannelImage(channel.data.items[0].snippet.thumbnails.medium.url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.detail_youtube_card_root}>
      <Card className={styles.detail_youtube_card}>
        <CardMedia
          className={styles.detail_youtube_card_image}
          image={propsYoutubeInfo.videoImage}
          title="Live from space album cover"
          onClick={() => {
            goToVideo(
              "https://www.youtube.com/watch?v=" + propsYoutubeInfo.videoId
            );
          }}
        />
        <CardContent className={styles.detail_youtube_card_content}>
          <Typography
            className={styles.detail_youtube_card_title}
            noWrap={true}
            onClick={() => {
              goToVideo(
                "https://www.youtube.com/watch?v=" + propsYoutubeInfo.videoId
              );
            }}
          >
            {propsYoutubeInfo.videoTitle}
          </Typography>
          <div className={styles.detail_youtube_card_text_wrap}>
            <Typography
              className={styles.detail_youtube_card_text}
              noWrap={true}
            >
              조회수 {viewCount}회
            </Typography>
            <Typography
              className={styles.detail_youtube_card_text}
              style={{ fontWeight: "bold" }}
              noWrap={true}
            >
              &nbsp;&#183;&nbsp;
            </Typography>
            <Typography
              className={styles.detail_youtube_card_text}
              noWrap={true}
            >
              {propsYoutubeInfo.publishTime}
            </Typography>
          </div>
          <div className={styles.detail_youtube_card_channel}>
            <Avatar
              className={styles.detail_youtube_card_avatar}
              src={channelImage}
              onClick={() => {
                goToChannel(
                  "https://www.youtube.com/channel/" +
                    propsYoutubeInfo.channelId
                );
              }}
            ></Avatar>
            <Typography
              className={styles.detail_youtube_card_channel_title}
              noWrap={true}
              onClick={() => {
                goToChannel(
                  "https://www.youtube.com/channel/" +
                    propsYoutubeInfo.channelId
                );
              }}
            >
              {propsYoutubeInfo.channelTitle}
            </Typography>
          </div>
          <div className={styles.detail_youtube_card_description}>
            <Typography className={styles.detail_youtube_card_description_text}>
              {propsYoutubeInfo.description}
            </Typography>
          </div>
        </CardContent>
        <div></div>
      </Card>
    </div>
  );
}
