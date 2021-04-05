import React, { useState, useEffect } from "react";
import axios from "axios";
import GameCard from "src/components/GameCard/GameCard";
import styles from "./InfiniteScrollCard.module.css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Button, Card } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { getGamesOrderBy } from "src/common/axios/Game";
import { searchGames, searchUsers } from "src/common/axios/Search";
import UserCard from "src/components/UserCard/UserCard";

export default function InfiniteScrollCard({ params, routerMatch }) {
  // 새로운 state 변수를 선언하고, count라 부르겠습니다.

  // const [items, setItems] = useState(Array.from({ length: 20 }));
  const [items, setItems] = useState(new Array());
  const [pageNum, setPageNum] = useState(0);
  const [size, setSize] = useState(20);
  const [isEnd, setIsEnd] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = () => {
    //TODO: change
    setIsFetching(true);

    if (params.type === 0) {
      getGamesOrderBy(
        {
          genreId: params.genreId,
          pageNum: pageNum,
          size: size,
        },
        (response) => {
          console.log("무한스크롤", response.data.data.content);
          setItems((items) => [...items, ...response.data.data.content]);
          // setItems([...items, ...response.data.data.content]);
          setPageNum((pageNum) => pageNum + 1);
          if (response.data.data.last) {
            setIsEnd(true);
          }
          setIsFetching(false);
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (params.type === 1) {
      searchGames(
        {
          word: params.word,
          pageNum: pageNum,
          size: size,
          colName: "appName",
        },
        (response) => {
          console.log("무한스크롤", response.data.data.content);
          setItems((items) => [...items, ...response.data.data.content]);
          // setItems([...items, ...response.data.data.content]);
          setPageNum((pageNum) => pageNum + 1);
          // setPageNum(pageNum + 1);

          if (response.data.data.last) {
            setIsEnd(true);
          }
          setIsFetching(false);
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (params.type === 2) {
      searchUsers(
        {
          word: params.word,
          pageNum: pageNum,
          size: size,
          colName: "nickname",
        },
        (response) => {
          console.log("무한스크롤", response.data.data.content);
          setItems((items) => [...items, ...response.data.data.content]);
          // setItems([...items, ...response.data.data.content]);
          setPageNum(pageNum + 1);
          if (response.data.data.last) {
            setIsEnd(true);
          }
          setIsFetching(false);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (
      scrollTop + clientHeight >= scrollHeight - 1 &&
      isFetching === false &&
      !isEnd
    ) {
      // 페이지 끝에 도달하면 추가 데이터를 받아온다
      fetchData();
    }
  };

  useEffect(() => {
    setItems(new Array());
    setPageNum(0);
    fetchData();
  }, [routerMatch]);

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // scroll event listener 해제

      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching]);

  return (
    <Container maxWidth="lg" spacing={4}>
      <Grid container spacing={4}>
        {items.map((item, i) => (
          <Grid
            item
            key={i}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {params.type === 2 ? (
              <UserCard isLogin={true} simpleUserInfo={item}></UserCard>
            ) : (
              <GameCard isLogin={true} gameInfo={item}></GameCard>
            )}
          </Grid>
        ))}
      </Grid>
      {isFetching ? (
        <Typography
          variant="h5"
          style={{ color: "white", margin: "10px 0px 0px 0px" }}
          gutterBottom
        >
          데이터를 받아오는 중입니다.
        </Typography>
      ) : null}
      {isEnd ? (
        <Typography
          variant="h5"
          style={{ color: "white", margin: "10px 0px 0px 0px" }}
          gutterBottom
        >
          불러올 데이터가 없습니다.
        </Typography>
      ) : null}
    </Container>
  );
}
