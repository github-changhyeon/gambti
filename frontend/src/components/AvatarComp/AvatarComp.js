import React from "react";
import styles from "./AvatarComp.module.css";
import Avatar from "@material-ui/core/Avatar";
import Badge from '@material-ui/core/Badge';


export default function AvatarComp({ size, textvalue, imgPath, onClick, badge }) {
  // smallProfile
  if (size === "xsmall") {
    return (
      <div>

        {
          badge ?
            <Badge
              color="secondary"
              badgeContent=" "
              overlap="circle"
              variant="dot"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }
              }
            >
              <Avatar className={styles.xsmall} src={imgPath}>
                {textvalue}
              </Avatar>
            </Badge > :
            <Avatar className={styles.xsmall} src={imgPath}>
              {textvalue}
            </Avatar>
        }
      </div >

    );
  }
  // header, chat(groupProfile, chattingProfile)
  else if (size === "small") {
    return (
      // TODO: 뱃지 위치, 색깔 맞추기

      <Avatar className={styles.small} src={imgPath}>
        {textvalue}
      </Avatar>
    );
  }
  // chatHeader, nav
  else if (size === "medium") {
    return (
      <div>

        {
          badge ?
            <Badge
              color="secondary"
              badgeContent=" "
              overlap="circle"
              variant="dot"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }
              }
            >
              <Avatar className={styles.medium} src={imgPath}>
                {textvalue}
              </Avatar>
            </Badge > :
            <Avatar className={styles.medium} src={imgPath}>
              {textvalue}
            </Avatar>
        }
      </div>

    );
  }
  // mediumProfile
  else if (size === "large") {
    return <Avatar className={styles.large}>{textvalue}</Avatar>;
  }
  // UserCard,GameCard,
  else if (size === "xlarge") {
    return (
      <Avatar src={imgPath} className={styles.xlarge} onClick={onClick}>
        {textvalue}
      </Avatar>
    );
  }

  // editProfile
  else if (size === "superlarge") {
    return (
      <Avatar className={styles.super_large} src={imgPath}>
        {textvalue}
      </Avatar>
    );
  }
}
