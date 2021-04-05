import { React, useState, useEffect } from "react";
import MediaQuery from "react-responsive";
import { useLocation } from "react-router-dom";
import GameCard from "src/components/GameCard/GameCard";
import VideoAndCard from "src/pages/GenreGames/genreGame-components/VideoAndCard";
import { Carousel } from "3d-react-carousal";
import Typography from "@material-ui/core/Typography";
import { getRecommendedGames } from "src/common/axios/Game";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

export default function GenreRecommendedGames({ propsMatch }) {
  const [recommendGames, setRecommendGames] = useState(new Array());
  const [videoAndCards, setVideoAndCards] = useState(new Array());
  const [isFetchEnd, setIsFetchEnd] = useState(false);
  const location = useLocation();
  // const isWide = MediaQuery ({
  //   query: "(min-width:1024px)"
  // });
  useEffect(() => {
    // TODO: AXIOS

    // console.log(location.state.genreId);
    setVideoAndCards(new Array());
    setRecommendGames(new Array());
    setIsFetchEnd(false);

    getRecommendedGames(
      location.state.genre.id,
      (response) => {
        let gameInfos = response.data.data;
        for (let i = 0; i < gameInfos.length; ++i) {
          //TODO: METASCORE 임의로 넣어줌 -> 제거
          gameInfos[i].metascore = 1000;

          setVideoAndCards((videoAndCards) => [
            ...videoAndCards,

            <VideoAndCard gameInfo={gameInfos[i]}></VideoAndCard>,
          ]);
          setRecommendGames((recommendGames) => [
            ...recommendGames,

            //TODO: VALUE
            <div style={{ width: "238px" }}>
              <GameCard gameInfo={gameInfos[i]}></GameCard>
            </div>,
          ]);
        }
        setIsFetchEnd(true);
      },
      (error) => {
        console.log(error);
      }
    );

    // console.log(tempArr);
    // setRecommendGames(new Array());
  }, [propsMatch.params.genre]);

  return (
    <div style={{ minHeight: "372px" }}>
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
