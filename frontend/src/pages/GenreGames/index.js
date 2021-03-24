import React from 'react';
import styles from './index.module.css';
import GenreList from 'src/components/GenreList/GenreList';
import InfiniteScrollCard from 'src/components/InfiniteScrollCard/InfiniteScrollCard';

export default function GenreGames() {
  return (
    <div>
      <GenreList propsOrder="all"></GenreList>

      <InfiniteScrollCard></InfiniteScrollCard>
    </div>
  );
}
