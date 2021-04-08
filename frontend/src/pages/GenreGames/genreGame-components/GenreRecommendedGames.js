import { React, useState, useEffect, useContext, useRef } from "react";
import MediaQuery from "react-responsive";
import { useLocation } from "react-router-dom";
import RecommendedGameCard from "src/components/RecommendedGameCard/RecommendedGameCard";
import VideoAndCard from "src/pages/GenreGames/genreGame-components/VideoAndCard";
import { Carousel } from "3d-react-carousal";
import Typography from "@material-ui/core/Typography";
import { getRecommendedGenreGames, deleteGame } from "src/common/axios/Game";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { UserContext } from "src/Context/UserContext";
import { SignalCellularNoSimOutlined } from "@material-ui/icons";

export default function GenreRecommendedGames({ propsMatch }) {
  const user = useContext(UserContext);

  const [recommendGames, setRecommendGames] = useState(new Array());
  const [videoAndCards, setVideoAndCards] = useState(new Array());
  const [isFetchEnd, setIsFetchEnd] = useState(false);

  const location = useLocation();
  // const isWide = MediaQuery ({
  //   query: "(min-width:1024px)"
  // });//

  const clickDeleteBtnFunc = (gameId) => {
    deleteGame(
      gameId,
      (response) => {
        if (response.data.status === "success") {
          getRecommendedGenreGames(
            {
              isLogin: user.isLoggedIn,
              genreId: location.state.genre.id,
              pageNum: 1,
              size: 15,
            },
            (response) => {
              let gameInfos = response.data.data.content;
              if (user.isLoggedIn) {
                gameInfos = response.data.data;
              }
              console.log("이녀석", gameInfos);
              let tempVideoAndCards = new Array();
              let tempRecommendedCards = new Array();
              for (let i = 0; i < gameInfos.length; ++i) {
                // setGameIds((gameIds) => [...gameIds, gameInfos[i].gameId]);
                // TODO: 빈배열일때 SLIDE 에러
                tempVideoAndCards.push(
                  <VideoAndCard
                    clickDeleteBtn={() => {
                      clickDeleteBtnFunc(gameInfos[i].gameId);
                    }}
                    gameInfo={gameInfos[i]}
                  ></VideoAndCard>
                );

                if (i === gameInfos.length - 1) {
                  setVideoAndCards(tempVideoAndCards);
                }
                tempRecommendedCards.push(
                  <div style={{ width: "283px" }}>
                    <RecommendedGameCard
                      clickDeleteBtn={() => {
                        clickDeleteBtnFunc(gameInfos[i].gameId);
                      }}
                      gameInfo={gameInfos[i]}
                    ></RecommendedGameCard>
                  </div>
                );
                if (i === gameInfos.length - 1) {
                  setRecommendGames(tempRecommendedCards);
                }
              }
              setIsFetchEnd(true);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    // TODO: AXIOS

    setVideoAndCards(new Array());
    setRecommendGames(new Array());
    setIsFetchEnd(false);
  }, [propsMatch.params.genre]);

  useEffect(() => {
    if (isFetchEnd) {
      return;
    }

    getRecommendedGenreGames(
      {
        isLogin: user.isLoggedIn,
        genreId: location.state.genre.id,
        pageNum: 1,
        size: 15,
      },
      (response) => {
        let gameInfos = response.data.data.content;
        if (user.isLoggedIn) {
          gameInfos = response.data.data;
        }
        console.log("이녀석", gameInfos);
        let tempVideoAndCards = new Array();
        let tempRecommendedCards = new Array();
        for (let i = 0; i < gameInfos.length; ++i) {
          // setGameIds((gameIds) => [...gameIds, gameInfos[i].gameId]);
          // TODO: 빈배열일때 SLIDE 에러
          tempVideoAndCards.push(
            <VideoAndCard
              clickDeleteBtn={() => {
                clickDeleteBtnFunc(gameInfos[i].gameId);
              }}
              gameInfo={gameInfos[i]}
            ></VideoAndCard>
          );

          if (i === gameInfos.length - 1) {
            setVideoAndCards(tempVideoAndCards);
          }
          tempRecommendedCards.push(
            <div style={{ width: "283px" }}>
              <RecommendedGameCard
                clickDeleteBtn={() => {
                  clickDeleteBtnFunc(gameInfos[i].gameId);
                }}
                gameInfo={gameInfos[i]}
              ></RecommendedGameCard>
            </div>
          );
          if (i === gameInfos.length - 1) {
            setRecommendGames(tempRecommendedCards);
          }
        }
        setIsFetchEnd(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [isFetchEnd]);

  return (
    <div style={{ minHeight: "372px" }}>
      {/* {gameIds.map((item, i) => item)} */}
      <Container
        style={{
          boxSizing: "border-box",
          borderBottom: "2px solid #666666",
          height: "32px",
          marginTop: "20px",
          marginBottom: "40px",
        }}
      >
        <Button
          variant="outlined"
          style={{
            backgroundColor: "#222222",
            textTransform: "none",
            height: "32px",
            borderTop: "2px solid #666666",
            borderBottom: "0px solid #666666",
            borderLeft: "2px solid #666666",
            borderRight: "2px solid #666666",
            color: "#ccff00",
            borderRadius: "8px 8px 0px 0px",
            marginRight: "5px",
          }}
        >
          Recommended
        </Button>
      </Container>
      <MediaQuery minWidth="1024px">
        {!isFetchEnd ? null : (
          // <Carousel slides={videoAndCards} />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: "85%" }}>
              <Carousel slides={videoAndCards} />
            </div>
          </div>
        )}
      </MediaQuery>
      <MediaQuery maxWidth="1024px">
        {!isFetchEnd ? null : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%" }}>
              <Carousel slides={recommendGames} />
            </div>
          </div>
        )}
      </MediaQuery>

      <Typography
        variant="h5"
        style={{ color: "white", margin: "20px 0px 0px 20px" }}
        gutterBottom
      ></Typography>
    </div>
  );
}
