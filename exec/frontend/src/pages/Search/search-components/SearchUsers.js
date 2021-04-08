import { React } from "react";
import Container from "@material-ui/core/Container";
import InfiniteScrollCard from "src/components/InfiniteScrollCard/InfiniteScrollCard";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

export default function SearchUsers({ propsMatch }) {
  const location = useLocation();

  return (
    <Container>
      <br />
      <InfiniteScrollCard
        params={{
          type: 2,
          genreId: 0,
          order: "DESC",
          word: queryString.parse(location.search).word,
        }}
        routerMatch={propsMatch}
      ></InfiniteScrollCard>
    </Container>
  );
}
