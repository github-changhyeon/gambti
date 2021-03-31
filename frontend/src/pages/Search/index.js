import { React, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./index.module.css";
import SearchDescription from "src/pages/Search/search-components/SearchDescription";
import SearchNavigation from "src/pages/Search/search-components/SearchNavigation";
import SearchAll from "src/pages/Search/search-components/SearchAll";
import SearchGames from "src/pages/Search/search-components/SearchGames";
import SearchUsers from "src/pages/Search/search-components/SearchUsers";
import { searchGames, searchUsers } from "src/common/axios/Search";
import MediumProfile from "src/components/MediumProfile/MediumProfile";
import queryString from "query-string";
import fire from "src/fire";

export default function Search({ match }) {
  const location = useLocation();
  const [games, setGames] = useState(new Array());
  const [simpleUsers, setSimpleUsers] = useState(new Array());
  const [users, setUsers] = useState(new Array());

  const gameInfo = {
    appName: "Half-Life",
    backgroundImagePath:
      "https://cdn.akamai.steamstatic.com/steam/apps/70/0000002354.1920x1080.jpg?t=1591048039",
    gameId: 70,
    joinUserCount: 0,
    joined: false,
    logoImagePath:
      "https://cdn.akamai.steamstatic.com/steam/apps/70/header.jpg?t=1591048039",
    metascore: 96,
    owned: false,
    price: 10500,
    sentiment: "Overwhelmingly Positive",
    videoUrl: null,
  };

  const userInfo = {
    userId: "5HP2HV5S2GgP0q5if4CydTMA1x32",
    friendStatus: 1,
  };

  useEffect(() => {
    let temp1 = new Array();
    let temp2 = new Array();

    for (let i = 0; i < 9; ++i) {
      temp1.push(userInfo);
      fire.db
        .collection("users")
        .doc(userInfo.userId)
        .get()
        .then((user) => {
          console.log("유저", user.data());
        });
      temp2.push(gameInfo);
    }

    console.log(temp1);
    setSimpleUsers(temp1);
    setGames(temp2);

    // searchGames(
    //   queryString.parse(location.search).word,
    //   (response) => {
    //     if (response.data.status) {
    //     } else {
    //       console.log("search game 실패");
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    // searchUsers(
    //   queryString.parse(location.search).word,
    //   (response) => {
    //     if (response.data.status) {
    //     } else {
    //       console.log("search User 실패");
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }, [match]);

  return (
    <div style={{ backgroundColor: "#222222" }}>
      <SearchDescription></SearchDescription>
      {/* <div style={{ width: "200px" }}>
        <MediumProfile
          propsUser={{
            nickname: "aa",
            email:
              "bbdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddbbddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
          }}
        />
      </div> */}
      <SearchNavigation
        propsMatch={match}
        gameCnt={games.length}
        userCnt={users.length}
      ></SearchNavigation>

      {match.params.all === null || match.params.all === undefined ? (
        <SearchAll propsGames={games} propsUsers={users}></SearchAll>
      ) : null}
      {match.params.all === "games" ? (
        <SearchGames propsMatch={match}></SearchGames>
      ) : null}
      {match.params.all === "users" ? (
        <SearchUsers propsMatch={match}></SearchUsers>
      ) : null}
    </div>
  );
}
