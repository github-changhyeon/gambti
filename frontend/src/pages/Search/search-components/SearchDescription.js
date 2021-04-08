import { React, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import queryString from "query-string";

export default function SearchDescription({}) {
  const location = useLocation();

  return (
    <div style={{ backgroundColor: "#1a1b1c" }}>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: "40px",
          paddingBottom: "20px",
        }}
      >
        <img
          src="/images/gambti/page_search.png"
          width="55px"
          height="55px"
        ></img>
        <div style={{ display: "inline-block", paddingLeft: "40px" }}>
          <Typography
            variant="h5"
            style={{
              color: "white",
              fontWeight: "bold",
            }}
            gutterBottom
          >
            Search "{queryString.parse(location.search).word}"
          </Typography>
          <Typography
            variant="body1"
            style={{
              color: "grey",
            }}
            gutterBottom
          >
            search and find
          </Typography>
        </div>
      </Container>
    </div>
  );
}
