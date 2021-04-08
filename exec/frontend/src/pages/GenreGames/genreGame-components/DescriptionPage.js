import { React, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "@material-ui/core/Container";

import Typography from "@material-ui/core/Typography";

export default function DescriptionPage({ propsMatch }) {
  const location = useLocation();

  // useEffect(()=>{

  // }, propsMatch)

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
        <img src={location.state.genre.path} width="55px" height="55px"></img>
        <div style={{ display: "inline-block", paddingLeft: "40px" }}>
          <Typography
            variant="h5"
            style={{
              color: "white",
              fontWeight: "bold",
            }}
            gutterBottom
          >
            {propsMatch.params.order} {propsMatch.params.genre} Games
          </Typography>
          <Typography
            variant="body1"
            style={{
              color: "grey",
            }}
            gutterBottom
          >
            find and enjoy the games
          </Typography>
        </div>
      </Container>
    </div>
  );
}
