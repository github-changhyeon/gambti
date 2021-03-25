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
            <source src={gameInfo.videoPath} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
