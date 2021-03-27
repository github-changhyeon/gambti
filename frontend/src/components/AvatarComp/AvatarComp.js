import React from 'react';
import styles from './AvatarComp.module.css';
import Avatar from '@material-ui/core/Avatar';

export default function AvatarComp({ size, textvalue, imgPath }) {
  // smallProfile
  if (size === 'xsmall') {
    return (
      <Avatar className={styles.xsmall} src={imgPath}>
        {textvalue}
      </Avatar>
    );
  }
  // header, chat(groupProfile, chattingProfile)
  else if (size === 'small') {
    return (
      // TODO: 뱃지 위치, 색깔 맞추기
      // <Badge color="primary" badgeContent=" " overlap="circle" variant="dot">
      <Avatar className={styles.small} src={imgPath}>
        {textvalue}
      </Avatar>
      // </Badge>
    );
  }
  // chatHeader, nav
  else if (size === 'medium') {
    return (
      <Avatar className={styles.medium} src={imgPath}>
        {textvalue}
      </Avatar>
    );
  }
  // mediumProfile
  else if (size === 'large') {
    return <Avatar className={styles.large}>{textvalue}</Avatar>;
  }
  // UserCard,GameCard, editProfile
  else if ((size = 'xlarge')) {
    return (
      <Avatar src={imgPath} className={styles.xlarge}>
        {textvalue}
      </Avatar>
    );
  }
}
