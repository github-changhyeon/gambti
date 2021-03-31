import { React } from "react";
import Container from "@material-ui/core/Container";
import InfiniteScrollCard from "src/components/InfiniteScrollCard/InfiniteScrollCard";

export default function SearchUsers({ propsMatch }) {
  return (
    <Container>
      <br />
      <InfiniteScrollCard
        genreId={1}
        routerMatch={propsMatch}
      ></InfiniteScrollCard>
    </Container>
  );
}
