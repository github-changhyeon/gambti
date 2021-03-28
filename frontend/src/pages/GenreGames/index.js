import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./index.module.css";
import GenreList from "src/components/GenreList/GenreList";
import InfiniteScrollCard from "src/components/InfiniteScrollCard/InfiniteScrollCard";
import Typography from "@material-ui/core/Typography";
import { Carousel } from "3d-react-carousal";
import GameCard from "src/components/GameCard/GameCard";
import VideoAndCard from "src/pages/GenreGames/genreGame-components/VideoAndCard";
import MediaQuery from "react-responsive";
import { getRecommendedGames } from "src/common/axios/Game";
import DescriptionPage from "src/pages/GenreGames/genreGame-components/DescriptionPage";
import FilterOrder from "src/pages/GenreGames/genreGame-components/FilterOrder";

export default function GenreGames({ match }) {
  const [recommendGames, setRecommendGames] = useState(new Array());
  const [videoAndCards, setVideoAndCards] = useState(new Array());
  const [isFetchEnd, setIsFetchEnd] = useState(false);
  const location = useLocation();

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
          setVideoAndCards((videoAndCards) => [
            ...videoAndCards,

            <VideoAndCard gameInfo={gameInfos[i]}></VideoAndCard>,
          ]);
          setRecommendGames((recommendGames) => [
            ...recommendGames,

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
  }, [match]);

  return (
    <div style={{ backgroundColor: "#222222" }}>
      <DescriptionPage></DescriptionPage>
      <GenreList propsOrder="all"></GenreList>
      <FilterOrder></FilterOrder>

      <MediaQuery minWidth="1024px">
        {!isFetchEnd ? null : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ width: "100%" }}>
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
      <br />
      <br />
      <InfiniteScrollCard
        genreId={location.state.genre.id}
        routerMatch={match}
      ></InfiniteScrollCard>
    </div>
  );
}
