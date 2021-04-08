import { React, useState, useEffect } from "react";
import axios from "axios";
import YoutubeCard from "./YoutubeCard";
import styles from "../index.module.css";

export default function YoutubeCards({ propsAppName }) {
  const [items, setItems] = useState(new Array());

  const keyArr = [
    process.env.REACT_APP_YOUTUBE_API_KEY1,
    process.env.REACT_APP_YOUTUBE_API_KEY2,
    process.env.REACT_APP_YOUTUBE_API_KEY3,
    process.env.REACT_APP_YOUTUBE_API_KEY4,
    process.env.REACT_APP_YOUTUBE_API_KEY5,
  ];

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 5);
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&type=video&q=${propsAppName}&key=${keyArr[randomNum]}`
      )
      .then((search) => {
        let searchItems = search.data.items;
        setItems(
          searchItems.map((searchItem, i) => ({
            videoId: searchItem.id.videoId,
            videoTitle: searchItem.snippet.title,
            channelId: searchItem.snippet.channelId,
            channelTitle: searchItem.snippet.channelTitle,
            description: searchItem.snippet.description,
            videoImage: searchItem.snippet.thumbnails.high.url,
            publishTime: searchItem.snippet.publishTime.substring(0, 10),
          }))
        );

        // fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.detail_youtube_cards}>
      {items.map((item, i) => (
        <div key={i} style={{ width: "90%" }}>
          <YoutubeCard propsYoutubeInfo={item}></YoutubeCard>
        </div>
      ))}
    </div>
  );
}
