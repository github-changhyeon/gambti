import { React, useState, useEffect, useLayoutEffect } from "react";
import styles from "./index.module.css";
import GenreList from "src/components/GenreList/GenreList";
import InfiniteScrollCard from "src/components/InfiniteScrollCard/InfiniteScrollCard";
import Typography from "@material-ui/core/Typography";
import { Carousel } from "3d-react-carousal";
import GameCard from "src/components/GameCard/GameCard";
import VideoAndCard from "src/pages/GenreGames/genreGame-components/VideoAndCard";
import MediaQuery from "react-responsive";

export default function GenreGames({ match }) {
  const [recommendGames, setRecommendGames] = useState(new Array());

  const [videoAndCards, setVideoAndCards] = useState(new Array());

  const gameInfo = {
    appName: "title",
    isJoined: false,
    isOwned: true,
    image: {
      logoImage: {
        id: 1,
        path:
          "https://m.gjcdn.net/community-header/950/18067-crop0_296_1920_776-npqpqk9f-v4.webp",
      },
      backgroundImage: {
        id: 1,
        path:
          "https://m.gjcdn.net/community-header/950/18067-crop0_296_1920_776-npqpqk9f-v4.webp",
      },
    },
    videoPath:
      "https://cdn.akamai.steamstatic.com/steam/apps/256733242/movie_max.webm?t=1540671394",
    suitedRate: 67.7,
    totalJoin: 123456,
  };

  // let slides = [
  //   <div
  //     style={{
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       width: "250px",
  //     }}
  //   >
  //     <GameCard gameInfo={gameInfo1}></GameCard>
  //   </div>,
  //   <div
  //     style={{
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       width: "250px",
  //     }}
  //   >
  //     <GameCard gameInfo={gameInfo1}></GameCard>
  //   </div>,
  //   <div
  //     style={{
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       width: "250px",
  //     }}
  //   >
  //     <GameCard gameInfo={gameInfo1}></GameCard>
  //   </div>,
  //   <div
  //     style={{
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       width: "250px",
  //     }}
  //   >
  //     <GameCard gameInfo={gameInfo1}></GameCard>
  //   </div>,
  // ];

  useEffect(() => {
    // TODO: AXIOS

    setVideoAndCards(new Array());

    // console.log(tempArr);
    // setRecommendGames(new Array());
    for (let i = 0; i < 10; ++i) {
      setVideoAndCards((videoAndCards) => [
        ...videoAndCards,

        <VideoAndCard gameInfo={gameInfo}></VideoAndCard>,
      ]);
    }
    for (let i = 0; i < 10; ++i) {
      setRecommendGames((recommendGames) => [
        ...recommendGames,

        <div style={{ width: "238px" }}>
          <GameCard gameInfo={gameInfo}></GameCard>
        </div>,
      ]);
    }
  }, [match]);

  return (
    <div style={{ backgroundColor: "#222222" }}>
      <GenreList propsOrder="all"></GenreList>
      <MediaQuery minWidth="1024px">
        {videoAndCards.length === 0 ? null : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%" }}>
              <Carousel slides={videoAndCards} />
            </div>
          </div>
        )}
      </MediaQuery>
      <MediaQuery maxWidth="1024px">
        {recommendGames.length === 0 ? null : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%" }}>
              <Carousel slides={recommendGames} />
            </div>
          </div>
        )}
      </MediaQuery>
      {/* //["talk-bubble tri-right border round btm-left-in"] */}
      {/* <div
        className={
          styles.talk_bubble +
          " " +
          styles.tri_right +
          " " +
          styles.border +
          " " +
          styles.round +
          " " +
          styles.btm_left_in
        }
      >
        <video
          playsinline
          autoPlay={true}
          muted={true}
          loop={true}
          width="100%"
          height="100%"
          controls={false}
          className={styles.round}
        >
          <source
            src="https://cdn.akamai.steamstatic.com/steam/apps/256733242/movie_max.webm?t=1540671394"
            type="video/mp4"
          />
        </video>
      </div> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <video
          autoPlay={true}
          muted={true}
          loop={true}
          width="40%"
          height="150px"
          controls={false}
        >
          <source
            src="https://cdn.akamai.steamstatic.com/steam/apps/256733242/movie_max.webm?t=1540671394"
            type="video/mp4"
          />
        </video>
      </div>
      ,{/* <InfiniteScrollCard></InfiniteScrollCard> */}
    </div>
  );
}
