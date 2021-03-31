import React from "react";
import styles from "./RecFriend.module.css";
import MediumProfile from "src/components/MediumProfile/MediumProfile";
import ButtonComp from "src/components/ButtonComp/ButtonComp";

export default function RecFriend() {
  return (
    <div className={styles.root}>
      <MediumProfile
        propsUser={{ nickname: "temp", email: "temp@temp.com" }}
      ></MediumProfile>
      <ButtonComp size="xsmall" textvalue="ADD" color="#CCFF00"></ButtonComp>
    </div>
  );
}
