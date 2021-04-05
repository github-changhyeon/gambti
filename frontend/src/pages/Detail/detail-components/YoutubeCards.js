import { React, useState, useEffect } from "react";
import axios from "axios";
import YoutubeCard from "./YoutubeCard";
import styles from "../index.module.css";

export default function YoutubeCards({ propsAppName }) {
  const [items, setItems] = useState(new Array());

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&type=video&q=${propsAppName}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      )
      .then((search) => {
        console.log("search data", search.data);
        let searchItems = search.data.items;
        setItems(
          searchItems.map((searchItem, i) => ({
            videoId: searchItem.id.videoId,
            videoTitle: searchItem.id.videoTitle,
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
        alert("유튜브 api 할당량 초과");
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
