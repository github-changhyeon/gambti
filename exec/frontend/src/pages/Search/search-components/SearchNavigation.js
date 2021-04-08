import { React, useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { useLocation, useHistory, generatePath } from "react-router-dom";
import styles from "../index.module.css";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import routerInfo from "src/constants/routerInfo";
import queryString from "query-string";

export default function SearchNavigation({ propsMatch, gameCnt, userCnt }) {
  const history = useHistory();
  const location = useLocation();
  const [borderSizes, setBorderSizes] = useState(["2px", "0px", "0px"]);
  const [fontColors, setFontColors] = useState([
    "#ccff00",
    "#ffffff",
    "#ffffff",
  ]);

  const clickBtnFunc = (path) => {
    history.push({
      pathname: path,
      search: `?word=${queryString.parse(location.search).word}`,
    });
  };

  useEffect(() => {
    // console.log(propsMatch.params.all);
    if (propsMatch.params.all === null || propsMatch.params.all === undefined) {
      setBorderSizes(
        borderSizes.map((borderSize, i) => (i === 0 ? "4px" : "0px"))
      );
      setFontColors(
        fontColors.map((fontColor, i) => (i === 0 ? "#ccff00" : "#ffffff"))
      );
    } else if (propsMatch.params.all === "games") {
      setBorderSizes(
        borderSizes.map((borderSize, i) => (i === 1 ? "4px" : "0px"))
      );
      setFontColors(
        fontColors.map((fontColor, i) => (i === 1 ? "#ccff00" : "#ffffff"))
      );
    } else if (propsMatch.params.all === "users") {
      setBorderSizes(
        borderSizes.map((borderSize, i) => (i === 2 ? "4px" : "0px"))
      );
      setFontColors(
        fontColors.map((fontColor, i) => (i === 2 ? "#ccff00" : "#ffffff"))
      );
    }
  }, [propsMatch]);

  return (
    <div className={styles.search_nav_root}>
      <Container>
        <div className={styles.search_nav}>
          <Button
            className={styles.search_nav_btn}
            onClick={() => {
              clickBtnFunc(generatePath(routerInfo.PAGE_URLS.SEARCH, {}));
            }}
            style={{
              borderBottom: borderSizes[0] + " solid #ccff00",
              color: fontColors[0],
            }}
          >
            All
          </Button>
          <Button
            className={styles.search_nav_btn}
            onClick={() => {
              clickBtnFunc(
                generatePath(routerInfo.PAGE_URLS.SEARCH, {
                  all: "games",
                })
              );
            }}
            style={{
              borderBottom: borderSizes[1] + " solid #ccff00",
              color: fontColors[1],
            }}
          >
            Games
          </Button>
          <Typography className={styles.search_nav_cnt} gutterBottom>
            {gameCnt}
          </Typography>
          <Button
            className={styles.search_nav_btn}
            onClick={() => {
              clickBtnFunc(
                generatePath(routerInfo.PAGE_URLS.SEARCH, {
                  all: "users",
                })
              );
            }}
            style={{
              borderBottom: borderSizes[2] + " solid #ccff00",
              color: fontColors[2],
            }}
          >
            Users
          </Button>
          <Typography className={styles.search_nav_cnt} gutterBottom>
            {userCnt}
          </Typography>
        </div>
      </Container>
    </div>
  );
}
