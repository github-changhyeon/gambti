import { React } from "react";
import { useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";
import InfiniteScrollCard from "src/components/InfiniteScrollCard/InfiniteScrollCard";
import queryString from "query-string";

export default function SearchGames({ propsMatch }) {
  const location = useLocation();

  return (
    <Container>
      <br />

      <InfiniteScrollCard
        params={{
          type: 1,
          genreId: 0,
          order: "DESC",
          word: queryString.parse(location.search).word,
        }}
        routerMatch={propsMatch}
      ></InfiniteScrollCard>
    </Container>
  );
}
