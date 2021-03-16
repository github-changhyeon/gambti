import styles from './GenreCard.module.css';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';

export default function GenreCard({ imagePath, genreName, isClicked }) {
  const colorStyle = { color: '#ffffff' };
  if (isClicked) {
    colorStyle.color = '#ccff00';
  }

  return (
    <Card className={styles.genre}>
      <CardContent style={{ paddingTop: '12px', paddingBottom: '8px' }}>
        <CardMedia className={styles.genre_img} image={imagePath} />
      </CardContent>
      <CardContent style={{ paddingTop: '8px', paddingBottom: '12px' }}>
        <Typography gutterBottom variant="body2" style={colorStyle}>
          #{genreName}
        </Typography>
      </CardContent>
    </Card>
  );
}
