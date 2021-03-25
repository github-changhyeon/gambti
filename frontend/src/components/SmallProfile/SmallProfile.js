import React, { useState, useEffect } from "react";
import styles from './SmallProfile.module.css';
import AvatarComp from 'src/components/AvatarComp/AvatarComp';
import Typography from "@material-ui/core/Typography";

export default function SmallProfile() {
  const [nickName, setNickName] = React.useState("김싸피");
  const [email, setEmail] = React.useState("ssafy@naver.com");

  return (
    <div className={styles.root}>
      <AvatarComp size='xsmall'></AvatarComp>
      <Typography className={styles.nick}>{nickName}</Typography>
      <Typography className={styles.email}>{email}</Typography>
    </div>
  );
}
