import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GameCard from "src/components/GameCard/GameCard";
import styles from "./InfiniteScrollCard.module.css";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Button, Card } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {
  getGamesOrderBy,
  getRecommendedGames,
  deleteGame,
} from "src/common/axios/Game";
import { searchGames, searchUsers } from "src/common/axios/Search";
import UserCard from "src/components/UserCard/UserCard";
import { UserContext } from "src/Context/UserContext";
import RecommendedGameCard from "src/components/RecommendedGameCard/RecommendedGameCard";
import $ from "jquery";
import zIndex from "@material-ui/core/styles/zIndex";
import fire from "src/fire";

export default function InfiniteScrollCard({ params, routerMatch }) {
  const user = useContext(UserContext);

  // const [items, setItems] = useState(Array.from({ length: 20 }));
  const [items, setItems] = useState(new Array());
  const [pageNum, setPageNum] = useState(1);
  const [size, setSize] = useState(20);
  const [isEnd, setIsEnd] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  // $(".close")
  //   .off()
  //   .on("click", function () {
  //     // alert("haha");
  //     console.log("안녕", this);
  //     var $target = $(this).parents(".abc");
  //     console.log($target);
  //     $target.hide("slow", function () {
  //       $target.css("display", "none");
  //     });
  //   });

  const clickDeleteBtnFunc = (params) => {
    let $pTarget = $(params.element.target).parents(".parentGrid");
    console.log($pTarget);
    $pTarget.hide("slow", function () {
      $pTarget.css("display", "none");
    });
    deleteGame(
      params.gameId,
      (response) => {
        if (response.data.status !== "success") {
          console.log("delete error");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const fetchData = () => {
    //TODO: change
    setIsFetching(true);

    if (params.type === 0) {
      // find
      let direction = params.direction;
      let colName = params.colName;
      if (colName === "price") {
        direction = "ASC";
      } else if (colName === "hot") {
        colName = "metascore";
      } else if (colName === "new") {
        colName = "releaseDate";
      }
      getGamesOrderBy(
        {
          genreId: params.genreId,
          pageNum: pageNum,
          size: size,
          direction: direction,
          colName: colName,
        },
        (response) => {
          console.log("무한스크롤", response.data.data.content);
          console.log("여기야", pageNum);
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
      // search games
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
      // search users
      searchUsers(
        {
          word: params.word,
          pageNum: pageNum,
          size: size,
          colName: "nickname",
        },
        (response) => {
          console.log("무한스크롤", response.data.data.content);
          // setItems((items) => [...items, ...response.data.data.content]);
          // setItems([...items, ...response.data.data.content]);
          let tempArr = new Array();
          for (let i = 0; i < response.data.data.content.length; ++i) {
            fire.db
              .collection("users")
              .doc(response.data.data.content[i].userId)
              .get()
              .then((user) => {
                console.log("유저");
                console.log("유저", user.data());
                if (user.data() !== null && user.data() !== undefined) {
                  tempArr.push(response.data.data.content[i]);
                }

                if (i === response.data.data.content.length - 1) {
                  setItems((items) => [...items, ...tempArr]);
                }
                setPageNum((pageNum) => pageNum + 1);
                if (response.data.data.last) {
                  setIsEnd(true);
                }
                setIsFetching(false);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (params.type === 3) {
      // recommends
      console.log("왜0?", pageNum);
      getRecommendedGames(
        {
          isLogin: user.isLoggedIn,
          genreId: params.genreId,
          pageNum: pageNum,
          size: size,
        },
        (response) => {
          console.log("무한스크롤", response.data.data.content);
          setItems((items) => [...items, ...response.data.data.content]);
          // setItems([...items, ...response.data.data.content]);
          let tempArr = new Array();
          for (let i = 0; i < response.data.data.content.length; ++i) {
            fire.db
              .collection("users")
              .doc(response.data.data.content[i].userId)
              .get()
              .then((user) => {
                console.log("유저");
                console.log("유저", user.data());
                tempArr.push(user.data());
                if (i === response.data.data.content.length - 1) {
                  setItems([...items, ...response.data.data.content]);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
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
    } else if (params.type === 4) {
      // friend
      // searchUsers(
      //   {
      //     word: params.word,
      //     pageNum: pageNum,
      //     size: size,
      //     colName: "nickname",
      //   },
      //   (response) => {
      //     console.log("무한스크롤", response.data.data.content);
      //     setItems((items) => [...items, ...response.data.data.content]);
      //     // setItems([...items, ...response.data.data.content]);
      //     setPageNum((pageNum) => pageNum + 1);
      //     if (response.data.data.last) {
      //       setIsEnd(true);
      //     }
      //     setIsFetching(false);
      //   },
      //   (error) => {
      //     console.log(error);
      //   }
      // );
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
    setPageNum(1);
  }, [routerMatch]);

  useEffect(() => {
    if (pageNum === 1) {
      fetchData();
    }
  }, [pageNum]);

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
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={i}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            className="parentGrid"
          >
            {params.type === 2 ? (
              <UserCard isLogin={true} simpleUserInfo={item}></UserCard>
            ) : null}
            {params.type === 3 ? (
              <RecommendedGameCard
                gameInfo={item}
                className="close"
                clickDeleteBtn={(params) => {
                  clickDeleteBtnFunc({ element: params, gameId: item.gameId });
                }}
              ></RecommendedGameCard>
            ) : null}
            {params.type === 0 || params.type === 1 ? (
              <GameCard gameInfo={item}></GameCard>
            ) : null}
          </Grid>
        ))}
      </Grid>
      {isFetching ? (
        <div
          style={{
            flexFlow: "nowrap",
            flexDirection: "row",
            display: "Flex",
            justifyContent: "space-around",
            alignItems: "center",
            zIndex: "100",
          }}
        >
          <Typography
            variant="h7"
            className={styles.dataLoading}
            data-text="데이터를 받아오는 중입니다."
            style={{
              color: "white",
              margin: "10px 0px 0px 0px",
              fontFamily: "DungGeunMo",
            }}
            gutterBottom
          >
            데이터를 받아오는 중입니다.
          </Typography>
        </div>
      ) : null}
      {isEnd ? (
        <div
          style={{
            flexFlow: "nowrap",
            flexDirection: "row",
            display: "Flex",
            justifyContent: "space-around",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <Typography
            variant="h7"
            style={{
              color: "white",
              margin: "10px 0px 0px 0px",
              fontFamily: "DungGeunMo",
            }}
            gutterBottom
          >
            불러올 데이터가 없습니다.
          </Typography>
        </div>
      ) : null}
    </Container>
  );
}
