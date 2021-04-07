import { React, useState, useEffect, useContext } from "react";
import { useLocation, useHistory, generatePath } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import styles from "../index.module.css";
import { UserContext } from "src/Context/UserContext";
import GameCard from "src/components/GameCard/GameCard";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import routerInfo from "src/constants/routerInfo";

export default function DetailDrawer({ propsMatch, propsGameInfo }) {
  const user = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const [filters, setFilters] = useState([
    "brightness(100%) grayscale(0%)",
    "brightness(50%) grayscale(70%)",
    "brightness(50%) grayscale(70%)",
    "brightness(50%) grayscale(70%)",
  ]);
  const [nowCardId, setNowCardId] = useState(null);
  const [open, setOpen] = useState(false);

  const clickBtnFunc = (path) => {
    history.push({
      pathname: path,
    });
  };
  const mouseOverFunc = (cardId) => {
    if (cardId === nowCardId) {
      return;
    }
    setFilters(
      filters.map((filter, i) =>
        i === cardId ? "brightness(100%) grayscale(0%)" : filter
      )
    );
  };
  const mouseOutFunc = (cardId) => {
    if (cardId === nowCardId) {
      return;
    }
    setFilters(
      filters.map((filter, i) =>
        i === cardId ? "brightness(50%) grayscale(70%)" : filter
      )
    );
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    // setOpen(false);
    if (propsMatch.params.tab === null || propsMatch.params.tab === undefined) {
      setNowCardId(0);
      setFilters(
        filters.map((filter, i) =>
          i === 0
            ? "brightness(100%) grayscale(0%)"
            : "brightness(50%) grayscale(70%)"
        )
      );
    } else if (propsMatch.params.tab === "youtube") {
      setNowCardId(1);
      setFilters(
        filters.map((filter, i) =>
          i === 1
            ? "brightness(100%) grayscale(0%)"
            : "brightness(50%) grayscale(70%)"
        )
      );
    } else if (propsMatch.params.tab === "news") {
      setNowCardId(2);
      setFilters(
        filters.map((filter, i) =>
          i === 2
            ? "brightness(100%) grayscale(0%)"
            : "brightness(50%) grayscale(70%)"
        )
      );
    } else if (propsMatch.params.tab === "match") {
      setNowCardId(3);
      setFilters(
        filters.map((filter, i) =>
          i === 3
            ? "brightness(100%) grayscale(0%)"
            : "brightness(50%) grayscale(70%)"
        )
      );
    }
  }, [propsMatch]);

  return (
    <Drawer
      transitionDuration={500}
      className={styles.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: user.isLoggedIn ? styles.loginDrawer : styles.logoutDrawer,
      }}
    >
      <div className={styles.detail_game_card}>
        <GameCard
          gameInfo={{
            gameId: propsGameInfo.gameId,
            appName: propsGameInfo.appName,
            backgroundImagePath: propsGameInfo.backgroundImagePath,
            logoImagePath: propsGameInfo.logoImagePath,
            joined: propsGameInfo.joined,
            joinUserCount: propsGameInfo.joinUserCount,
            metascore: propsGameInfo.metascore,
          }}
        ></GameCard>
      </div>
      {/* <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      > */}
      {/* <div style={{ width: "100%", height: "80px" }}></div> */}
      <Card
        className={styles.detail_router_card}
        onClick={() => {
          clickBtnFunc(
            generatePath(routerInfo.PAGE_URLS.DETAIL, {
              gameId: propsGameInfo.gameId,
            })
          );
        }}
        style={{ filter: filters[0] }}
        onMouseOver={() => {
          mouseOverFunc(0);
        }}
        onMouseOut={() => {
          mouseOutFunc(0);
        }}
      >
        <CardMedia
          image="/images/gambti/detail_router_1.jpg"
          title="Contemplative Reptile"
          className={styles.detail_router_card_image}
        />
        <CardContent className={styles.detail_router_card_content}>
          <Typography className={styles.detail_router_card_name} align="center">
            Detail
          </Typography>
        </CardContent>
      </Card>
      <Card
        className={styles.detail_router_card}
        onClick={() => {
          clickBtnFunc(
            generatePath(routerInfo.PAGE_URLS.DETAIL, {
              gameId: propsGameInfo.gameId,
              tab: "youtube",
            })
          );
        }}
        style={{ filter: filters[1] }}
        onMouseOver={() => {
          mouseOverFunc(1);
        }}
        onMouseOut={() => {
          mouseOutFunc(1);
        }}
      >
        {/* <CardActionArea style={{ position: "relative" }}> */}
        <CardMedia
          image="/images/gambti/detail_router_2.jpg"
          title="Contemplative Reptile"
          className={styles.detail_router_card_image}
        />
        <CardContent className={styles.detail_router_card_content}>
          <Typography className={styles.detail_router_card_name} align="center">
            Youtube
          </Typography>
        </CardContent>
      </Card>
      {/* </div> */}
    </Drawer>
  );
}
