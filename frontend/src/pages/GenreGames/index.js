import { React } from "react";
import GenreList from "src/components/GenreList/GenreList";
import DescriptionPage from "src/pages/GenreGames/genreGame-components/DescriptionPage";
import GenreRecommendedGames from "src/pages/GenreGames/genreGame-components/GenreRecommendedGames";
import GamesOrderBy from "src/pages/GenreGames/genreGame-components/GamesOrderBy";

export default function GenreGames({ match }) {
  return (
    <div style={{ backgroundColor: "#222222" }}>
      <DescriptionPage propsMatch={match}></DescriptionPage>
      <GenreList propsOrder="hot"></GenreList>
      <GenreRecommendedGames propsMatch={match}></GenreRecommendedGames>
      <GamesOrderBy propsMatch={match}></GamesOrderBy>
    </div>
  );
}
