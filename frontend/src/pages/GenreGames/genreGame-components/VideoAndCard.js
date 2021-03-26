import React from "react";
import GameCard from "src/components/GameCard/GameCard";
import styles from "src/pages/GenreGames/index.module.css";

export default function VideoAndCard({ gameInfo }) {
  return (
    <div
      style={{
        height: "300px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#202020",
      }}
    >
      <div style={{ width: "35%", display: "inline-block" }}>
        <GameCard gameInfo={gameInfo}></GameCard>
      </div>
      <div style={{ width: "55%", padding: "0px 0px 0px 40px" }}>
        <div
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
          {" "}
          {gameInfo.videoUrl === null ? (
            <img
              className={styles.round}
              width="100%"
              style={{ maxHeight: "283px" }}
              src={gameInfo.backgroundImagePath}
            ></img>
          ) : (
            <video
              playsinline
              autoPlay={true}
              muted={true}
              loop={true}
              width="100%"
              height="auto"
              controls={false}
              className={styles.round}
            >
              <source src={gameInfo.videoUrl} type="video/mp4" />
            </video>
          )}
          {/* <video
            playsinline
            autoPlay={true}
            muted={true}
            loop={true}
            width="100%"
            height="auto"
            controls={false}
            className={styles.round}
          >
            <source
              src={
                "https://cdn.akamai.steamstatic.com/steam/apps/256733242/movie_max.webm?t=1540671394"
              }
              type="video/mp4"
            />
          </video> */}
          {/* <img
            className={styles.round}
            width="100%"
            src={gameInfo.backgroundImagePath}
          ></img> */}
        </div>
      </div>
    </div>
  );
}
