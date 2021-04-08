import { React } from "react";
import Container from "@material-ui/core/Container";
import styles from "../index.module.css";
import Grid from "@material-ui/core/Grid";
import GameCard from "src/components/GameCard/GameCard";
import MediumProfile from "src/components/MediumProfile/MediumProfile";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory, generatePath, useLocation } from "react-router-dom";
import routerInfo from "src/constants/routerInfo";
import queryString from "query-string";

export default function SearchAll({ propsGames, propsUsers }) {
  const history = useHistory();
  const location = useLocation();

  const clickViewAllFunc = (path) => {
    history.push({
      pathname: path,
      search: location.search,
    });
  };

  return (
    <Container className={styles.search_all_container}>
      <div className={styles.search_left_container}>
        <div>
          <Typography
            variant="h5"
            className={styles.search_content_title}
            align="left"
          >
            Games
          </Typography>
          <Typography
            variant="body1"
            className={styles.search_content_title}
            style={{ paddingRight: "24px" }}
            align="right"
          >
            <Button
              className={styles.view_all_btn}
              onClick={() => {
                clickViewAllFunc(
                  generatePath(routerInfo.PAGE_URLS.SEARCH, {
                    all: "games",
                  })
                );
              }}
            >
              View all
            </Button>
          </Typography>
        </div>
        <Grid container spacing={4}>
          {propsGames.map((game, i) => (
            <Grid
              item
              key={i}
              xs={12}
              sm={6}
              md={4}
              // lg={3}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <GameCard isLogin={true} gameInfo={game}></GameCard>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={styles.search_right_container}>
        <div>
          <Typography
            variant="h5"
            className={styles.search_content_title}
            style={{ paddingLeft: "24px" }}
            align="left"
          >
            Users
          </Typography>
          <Typography
            variant="body1"
            className={styles.search_content_title}
            style={{ paddingRight: "24px" }}
            align="right"
          >
            <Button
              className={styles.view_all_btn}
              onClick={() => {
                clickViewAllFunc(
                  generatePath(routerInfo.PAGE_URLS.SEARCH, {
                    all: "users",
                  })
                );
              }}
            >
              View all
            </Button>
          </Typography>
        </div>

        <Container>
          {propsUsers.map((user, i) => (
            <div key={i} style={{ marginBottom: "20px" }}>
              <MediumProfile
                propsUser={{
                  nickname: user.nickname,
                  email: user.email,
                }}
              />
              {/* <Divider light={true} className={styles.profile_divider} /> */}
            </div>
          ))}
        </Container>
      </div>
    </Container>
  );
}
