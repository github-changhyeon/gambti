import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import styles from './AvatarComp.module.css';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';



export default function AvatarComp({ size, textvalue, imgPath }) {
  const classes = useStyles();
  const circle = <div className={clsx(classes.shape, classes.shapeCircle)} />;
  // smallProfile
  if (size === 'xsmall') {
    return <Avatar className={styles.xsmall}>{textvalue}</Avatar>;
  }
  // header, chat(groupProfile, chattingProfile)
  else if (size === 'small') {

    return (
      // TODO: 뱃지 위치, 색깔 맞추기
      <Badge color="primary" badgeContent=" " overlap="circle" variant="dot">
        <Avatar className={styles.small} src={imgPath} > {textvalue}</Avatar >
      </Badge >
    );
  }
  // chatHeader, nav
  else if (size === 'medium') {
    return <Avatar className={styles.medium}>{textvalue}</Avatar>;
  }
  // mediumProfile
  else if (size === 'large') {
    return <Avatar className={styles.large}>{textvalue}</Avatar>;
  }
  // UserCard,GameCard, editProfile
  else if (size = 'xlarge') {
    return <Avatar className={styles.xlarge}>{textvalue}</Avatar>
  }

}



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  shape: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    height: 40,
  },
  shapeCircle: {
    borderRadius: '50%',
  },
}));
