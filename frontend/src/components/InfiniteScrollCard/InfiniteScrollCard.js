import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './InfiniteScrollCard.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function InfiniteScrollCard() {
  // 새로운 state 변수를 선언하고, count라 부르겠습니다.

  // const [items, setItems] = useState(Array.from({ length: 20 }));
  const [items, setItems] = useState(new Array());
  const [pageNum, setPageNum] = useState(1);
  const [size, setSize] = useState(20);
  const [isEnd, setIsEnd] = useState(false);

  const fetchData = () => {
    //TODO: change
    setTimeout(() => {
      axios
        .get(`https://api.openbrewerydb.org/breweries?page=${pageNum}&per_page=${size}`)
        .then((res) => {
          //updating data
          setItems([...items, ...res.data]);
          //updating page numbers
          setPageNum(pageNum + 1);
        });
    }, 1000);
  };

  return (
    <div style={{ height: '300px' }}>
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={!isEnd}
        loader={<h4>Loading...</h4>}
      >
        {items.map((brewery) => (
          <ul key={brewery.name}>
            <li>Name: {brewery.name}</li>
          </ul>
        ))}
      </InfiniteScroll>
    </div>
  );
}
