import React from 'react';
import { generatePath } from 'react-router-dom';
import routerInfo from 'src/constants/routerInfo';
import styles from './index.module.css';
import GameCard from 'src/components/GameCard/GameCard';

export default function Home({ history }) {
  return (
    <>
      <h1>Hello Home</h1>
      <a href="/test">Test Page</a>
      <button
        onClick={() => {
          history.push(
            generatePath(routerInfo.PAGE_URLS.GAMES, {
              order: 'a',
              genre: 'b',
            })
          );
        }}
      >
        버튼
      </button>
    </>
  );
}
