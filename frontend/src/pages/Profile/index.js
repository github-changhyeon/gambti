import React, { useEffect, useContext } from 'react';
import styles from './index.module.css';
import { UserContext } from 'src/Context/UserContext';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import AvatarComp from 'src/components/AvatarComp/AvatarComp';
import Divider from '@material-ui/core/Divider';

import RecFriend from './RecFriend';



export default function Profile() {
  const user = useContext(UserContext);
  const [joinedGame, setJoinedGame] = React.useState(8)
  const [friendNumber, setFriendNumber] = React.useState(1)

  return (
    <div className={styles.root}>
      <br />
      <div className={styles.upper}>
        {/* 나의 정보 */}
        <div className={styles.section}>
          <Box className={styles.box}>
            <div className={styles.profile}>
              <AvatarComp size='superlarge' textvalue={user.nickName.substring(0, 1)} ></AvatarComp>
              <Typography className={styles.main_nick}>{user.nickName}</Typography>
            </div>
            <Divider orientation="vertical" flexItem className={styles.divider} />
            <div className={styles.info}>
              <div className={styles.info_group}>
                <Typography className={styles.info_title}>JOINED</Typography>
                <Typography className={styles.info_number}>{joinedGame}</Typography>
              </div>
              <div className={styles.info_group}>
                <Typography className={styles.info_title}>FRIEND</Typography>
                <Typography className={styles.info_number}>{friendNumber}</Typography>
              </div>
            </div>
          </Box>
        </div>
        {/* 추천 친구 리스트 */}
        <div className={styles.section2}>
          <Box className={styles.friend_box}>
            <Typography className={styles.rec_title}>RECOMMEND FRIEND</Typography>
            <div className={styles.friend_list}>
              <RecFriend></RecFriend>
              <RecFriend></RecFriend>
              <RecFriend></RecFriend>
              <RecFriend></RecFriend>
              <RecFriend></RecFriend>
              <RecFriend></RecFriend>
              <RecFriend></RecFriend>
              <RecFriend></RecFriend>
            </div>
          </Box>
        </div>
      </div>

      <br />
      <Box>
        <h1>dkkd</h1>
      </Box>

    </div>
  );
}
