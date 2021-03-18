import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from 'src/components/GameCard/GameCard';
import styles from './InfiniteScrollCard.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Button, Card } from '@material-ui/core';

export default function InfiniteScrollCard() {
  // 새로운 state 변수를 선언하고, count라 부르겠습니다.

  // const [items, setItems] = useState(Array.from({ length: 20 }));
  const [items, setItems] = useState(new Array());
  const [pageNum, setPageNum] = useState(1);
  const [size, setSize] = useState(20);
  const [isEnd, setIsEnd] = useState(false);

  const gameInfo = {
    appName: 'title',
    isJoined: false,
    isOwned: true,
    image: {
      logoImage: {
        id: 1,
        path: 'https://m.gjcdn.net/community-header/950/18067-crop0_296_1920_776-npqpqk9f-v4.webp',
      },
      backgroundImage: {
        id: 1,
        path: 'https://m.gjcdn.net/community-header/950/18067-crop0_296_1920_776-npqpqk9f-v4.webp',
      },
    },
    suitedRate: 77.7,
    totalJoin: 123456,
  };

  const fetchData = () => {
    //TODO: change
    setTimeout(() => {
      axios
        .get(`https://api.openbrewerydb.org/breweries?page=${pageNum}&per_page=${size}`)
        .then((res) => {
          //updating data
          let gameInfos = new Array();
          for (let i = 0; i < 20; ++i) gameInfos.push(gameInfo);
          setItems([...items, ...gameInfos]);
          //updating page numbers
          setPageNum(pageNum + 1);
        });
    }, 1000);
  };

  return (
    <Container maxWidth="lg" spacing={4}>
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={!isEnd}
        loader={<h4>Loading...</h4>}
      >
        {' '}
        <Grid container spacing={4}>
          {items.map((item, i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
              <GameCard isLogin={true} gameInfo={item}></GameCard>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Container>
  );
}
