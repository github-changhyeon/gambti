import { React, useState, useEffect, useContext, useRef } from "react";
import MediaQuery from "react-responsive";
import { useLocation } from "react-router-dom";
import RecommendedGameCard from "src/components/RecommendedGameCard/RecommendedGameCard";
import VideoAndCard from "src/pages/GenreGames/genreGame-components/VideoAndCard";
import { Carousel } from "3d-react-carousal";
import Typography from "@material-ui/core/Typography";
import { getRecommendedGenreGames } from "src/common/axios/Game";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { UserContext } from "src/Context/UserContext";

export default function GenreRecommendedGames({ propsMatch }) {
  const user = useContext(UserContext);

  const [recommendGames, setRecommendGames] = useState(new Array());
  const [videoAndCards, setVideoAndCards] = useState(new Array());
  const [isFetchEnd, setIsFetchEnd] = useState(false);
  const gameIds = useRef(new Array());

  const location = useLocation();
  // const isWide = MediaQuery ({
  //   query: "(min-width:1024px)"
  // });//

  const clickDeleteBtnFunc = (gameId) => {
    console.log("파람파람", gameId);
    console.log("게임아이디스", gameIds);
    let idx = -1;
    for (let i = 0; i < gameIds.current.length; ++i) {
      if (gameIds.current[i] === gameId) {
        idx = i;
        break;
      }
    }
    console.log(idx);
    if (idx === -1) {
      return;
    }

    console.log("인덱스!!", idx);
    console.log("지우기전", gameIds.current);
    console.log(gameIds.current.splice(idx, 1));
    console.log("지웠다", gameIds.current);
    setVideoAndCards((videoAndCards) =>
      videoAndCards.filter((item, i) => i !== idx)
    );
    // setVideoAndCards(videoAndCards.filter((item, i) => i !== idx));
  };

  useEffect(() => {
    // TODO: AXIOS

    // console.log(location.state.genreId);
    setVideoAndCards(new Array());
    setRecommendGames(new Array());
    // setGameIds(new Array());
    gameIds.current = new Array();
    setIsFetchEnd(false);

    // console.log(tempArr);
    // setRecommendGames(new Array());
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
        console.log("이녀석", gameInfos);
        for (let i = 0; i < gameInfos.length; ++i) {
          // setGameIds((gameIds) => [...gameIds, gameInfos[i].gameId]);
          gameIds.current.push(gameInfos[i].gameId);
          setVideoAndCards((videoAndCards) => [
            ...videoAndCards,

            <VideoAndCard
              clickDeleteBtn={() => {
                clickDeleteBtnFunc(gameInfos[i].gameId);
              }}
              gameInfo={gameInfos[i]}
            ></VideoAndCard>,
          ]);
          setRecommendGames((recommendGames) => [
            ...recommendGames,

            //TODO: VALUE
            <div style={{ width: "238px" }}>
              <RecommendedGameCard
                clickDeleteBtn={() => {
                  clickDeleteBtnFunc(gameInfos[i].gameId);
                }}
                gameInfo={gameInfos[i]}
              ></RecommendedGameCard>
            </div>,
          ]);
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
