import { React, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import InfiniteScrollCard from "src/components/InfiniteScrollCard/InfiniteScrollCard";
import { useLocation, useHistory, generatePath } from "react-router-dom";
import Container from "@material-ui/core/Container";
import routerInfo from "src/constants/routerInfo";
import Typography from "@material-ui/core/Typography";

export default function GamesorderBy({ propsMatch }) {
  // TODO: 코드 리팩토링

  const [buttonColor1, setButtonColor1] = useState("#ffffff");
  const [buttonColor2, setButtonColor2] = useState("#ffffff");
  const [buttonColor3, setButtonColor3] = useState("#ffffff");
  const [bordorBottom1, setBordorBottom1] = useState("2px solid #666666");
  const [bordorBottom2, setBordorBottom2] = useState("2px solid #666666");
  const [bordorBottom3, setBordorBottom3] = useState("2px solid #666666");
  const [infScroll, setInfScroll] = useState(null);

  const [order, setOrder] = useState("");
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setButtonColor1("#ffffff");
    setBordorBottom1("2px solid #666666");
    setButtonColor2("#ffffff");
    setBordorBottom2("2px solid #666666");
    setButtonColor3("#ffffff");
    setBordorBottom3("2px solid #666666");
    if (propsMatch.params.order === "hot") {
      setOrder("hot");
      setButtonColor1("#ccff00");
      setBordorBottom1("0px solid #666666");
    } else if (propsMatch.params.order === "new") {
      setOrder("new");
      setButtonColor2("#ccff00");
      setBordorBottom2("0px solid #666666");
    } else if (propsMatch.params.order === "price") {
      setOrder("price");
      setButtonColor3("#ccff00");
      setBordorBottom3("0px solid #666666");
    }
  }, [propsMatch]);

  return (
    <div style={{ minHeight: "600px" }}>
      <Container
        style={{
          boxSizing: "border-box",
          borderBottom: "2px solid #666666",
          height: "32px",
          marginTop: "40px",
        }}
      >
        <Button
          variant="outlined"
          style={{
            backgroundColor: "#222222",
            textTransform: "none",
            height: "32px",
            borderTop: "2px solid #666666",
            borderBottom: bordorBottom1,
            borderLeft: "2px solid #666666",
            borderRight: "2px solid #666666",
            color: buttonColor1,
            borderRadius: "8px 8px 0px 0px",
            marginRight: "5px",
          }}
          onClick={() => {
            history.push({
              pathname: generatePath(routerInfo.PAGE_URLS.GAMES, {
                order: "hot",
                genre: location.state.genre.name.toLowerCase(),
              }),
              state: { genre: location.state.genre },
            });
          }}
        >
          Hot
        </Button>
        <Button
          variant="outlined"
          style={{
            backgroundColor: "#222222",
            textTransform: "none",
            height: "32px",
            borderTop: "2px solid #666666",
            borderBottom: bordorBottom2,
            borderLeft: "2px solid #666666",
            borderRight: "2px solid #666666",
            color: buttonColor2,
            borderRadius: "8px 8px 0px 0px",
            marginRight: "5px",
          }}
          onClick={() => {
            history.push({
              pathname: generatePath(routerInfo.PAGE_URLS.GAMES, {
                order: "new",
                genre: location.state.genre.name.toLowerCase(),
              }),
              state: { genre: location.state.genre },
            });
          }}
        >
          New
        </Button>
        <Button
          variant="outlined"
          style={{
            backgroundColor: "#222222",
            textTransform: "none",
            height: "32px",
            borderTop: "2px solid #666666",
            borderBottom: bordorBottom3,
            borderLeft: "2px solid #666666",
            borderRight: "2px solid #666666",
            color: buttonColor3,
            borderRadius: "8px 8px 0px 0px",
            marginRight: "5px",
          }}
          onClick={() => {
            history.push({
              pathname: generatePath(routerInfo.PAGE_URLS.GAMES, {
                order: "price",
                genre: location.state.genre.name.toLowerCase(),
              }),
              state: { genre: location.state.genre },
            });
          }}
        >
          Price
        </Button>
      </Container>
      <Typography
        variant="body2"
        style={{ color: "white", margin: "20px 0px 0px 20px" }}
      >
        &nbsp;
      </Typography>
      <InfiniteScrollCard
        params={{
          type: 0,
          genreId: location.state.genre.id,
          colName: propsMatch.params.order,
          word: "",
          direction: "DESC",
        }}
        routerMatch={propsMatch}
      ></InfiniteScrollCard>
    </div>
  );
}
