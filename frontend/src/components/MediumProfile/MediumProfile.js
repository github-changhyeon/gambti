import React, { useState, useEffect } from "react";
import styles from "./MediumProfile.module.css";
import AvatarComp from "src/components/AvatarComp/AvatarComp";
import Typography from "@material-ui/core/Typography";

export default function MediumProfile({ propsUser, onClick }) {
  // const [nickName, setNickName] = useState("김싸피");
  // const [email, setEmail] = useState("ssafy@naver.com");

  return (
    <div className={styles.root} onClick={onClick}>
      <AvatarComp size="medium" imgPath={propsUser.imgPath}></AvatarComp>
      <div className={styles.text_margin}>
        <Typography noWrap={true} className={styles.nick}>
          {propsUser.nickname}
        </Typography>
        <Typography noWrap={true} className={styles.email}>
          {propsUser.email}
        </Typography>
      </div>
    </div>
  );
}
