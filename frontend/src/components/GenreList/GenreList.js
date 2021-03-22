import styles from './GenreList.module.css';
import React, { useState, useEffect } from 'react';
import GenreCard from 'src/components/GenreCard/GenreCard';
import Container from '@material-ui/core/Container';

export default function GenreList() {
  const [genres, setGenres] = useState(new Array());

  useEffect(() => {
    fetch('jsonFiles/genres.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setGenres(data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container maxWidth="lg" className={styles.genre_list}>
      <h2 style={{ color: 'white', margin: '0px' }}>Type of Games</h2>
      {genres.map((genre, i) => (
        <div key={i} className={styles.genre_item}>
          <GenreCard imagePath={genre.path} genreName={genre.name} isClicked={false}></GenreCard>
        </div>
      ))}
    </Container>
  );
}
