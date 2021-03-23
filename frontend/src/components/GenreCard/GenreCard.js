import styles from './GenreCard.module.css';
import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';

export default function GenreCard({ imagePath, genreName }) {
  const [color, setColor] = useState('#ffffff');

  return (
    <Card className={styles.genre}>
      <CardActionArea
        onMouseOver={() => {
          setColor('#ccff00');
        }}
        onMouseOut={() => {
          setColor('#ffffff');
        }}
      >
        <CardContent style={{ paddingTop: '12px', paddingBottom: '8px' }}>
          <CardMedia className={styles.genre_img} image={imagePath} />
        </CardContent>
        <CardContent style={{ paddingTop: '8px', paddingBottom: '12px' }}>
          <Typography gutterBottom variant="body2" style={{ color: color }}>
            #{genreName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
