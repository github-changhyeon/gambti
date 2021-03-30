import React from "react";
import GameCard from "src/components/GameCard/GameCard";
import styles from "src/pages/GenreGames/index.module.css";

export default function VideoAndCard({ gameInfo }) {
  return (
    <div
      style={{
        height: "300px",
        display: "flex",
        // width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#202020",
      }}
    >
      <GameCard gameInfo={gameInfo}></GameCard>
      <div style={{ padding: "0px 0px 0px 40px" }}>
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
          {gameInfo.videoUrl === null ? (
            <img
              className={styles.round}
              width="100%"
              height="auto"
              style={{ maxHeight: "283px" }}
              src={gameInfo.backgroundImagePath}
            ></img>
          ) : (
            <video
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
        </div>
      </div>
    </div>
  );
}
