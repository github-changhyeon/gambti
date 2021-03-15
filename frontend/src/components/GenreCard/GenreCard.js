import styles from './GenreCard.module.css';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default function MediaCard({ imagePath, genreName, isClicked }) {
  const colorStyle = { color: '#ffffff' };
  if (isClicked) {
    colorStyle.color = '#ccff00';
  }

  return (
    <Card className={styles.genre}>
      <CardContent>
        <CardMedia className={styles.genre_img} image={imagePath} />
        <Typography gutterBottom variant="body" style={colorStyle}>
          #{genreName}
        </Typography>
      </CardContent>
    </Card>
  );
}
