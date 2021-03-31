import { React } from "react";
import Container from "@material-ui/core/Container";
import styles from "../index.module.css";
import Grid from "@material-ui/core/Grid";
import GameCard from "src/components/GameCard/GameCard";

export default function SearchAll({ propsGames, propsUsers }) {
  return (
    <Container style={{ overflow: "hidden" }}>
      <div className={styles.search_left_container}>
        <Grid container spacing={4}>
          {propsGames.map((game, i) => (
            <Grid
              item
              // key={i}
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
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
        a<br />
      </div>
    </Container>
  );
}
