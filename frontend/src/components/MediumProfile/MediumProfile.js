import React, { useState, useEffect } from "react";
import styles from './MediumProfile.module.css';
import AvatarComp from 'src/components/AvatarComp/AvatarComp';
import Typography from "@material-ui/core/Typography";

export default function MediumProfile() {
  const [nickName, setNickName] = useState("김싸피");
  const [email, setEmail] = useState("ssafy@naver.com");

  return (
    <div className={styles.root}>
      <AvatarComp size='medium'></AvatarComp>
      <div className={styles.text_margin}>
        <Typography className={styles.nick}>{nickName}</Typography>
        <Typography className={styles.email}>{email}</Typography>
      </div>
    </div>
  );
}
