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
  // const [simpleUsers, setSimpleUsers] = useState(new Array());
  const [users, setUsers] = useState(new Array());
  const [gameTotalCnt, setGameTotalCnt] = useState(new Array());
  const [userTotalCnt, setUserTotalCnt] = useState(new Array());

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
    // for (let i = 0; i < 11; ++i) {
    //   temp1.push(userInfo);
    //   fire.db
    //     .collection("users")
    //     .doc(userInfo.userId)
    //     .get()
    //     .then((user) => {
    //     });
    //   temp2.push(gameInfo);
    // }

    // setSimpleUsers(temp1);
    // setUsers(temp1);
    // setGames(temp2);

    searchGames(
      {
        word: queryString.parse(location.search).word,
        pageNum: 0,
        size: 9,
        colName: "appName",
      },
      (response) => {
        if (response.data.status) {
          setGameTotalCnt(response.data.data.totalElements);
          setGames(response.data.data.content);
        } else {
          console.log("search game ??????");
        }
      },
      (error) => {
        console.log(error);
      }
    );
    searchUsers(
      {
        word: queryString.parse(location.search).word,
        pageNum: 0,
        size: 11,
        colName: "nickname",
      },
      (response) => {
        if (response.data.status) {
          setUserTotalCnt(response.data.data.totalElements);
          let simpleUsers = response.data.data.content;
          let tempUsers = new Array();
          // setUsers(simpleUsers);
          for (let i = 0; i < simpleUsers.length; ++i) {
            fire.db
              .collection("users")
              .doc(simpleUsers[i].userId)
              .get()
              .then((user) => {
                if (user.data() !== null && user.data() !== undefined) {
                  tempUsers.push(user.data());
                }
                if (i === simpleUsers.length - 1) {
                  setUsers(tempUsers);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
          if (simpleUsers.length === 0) {
            setUsers(new Array());
          }
        } else {
          console.log("search User ??????");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, [match]);

  return (
    <div
      style={{ backgroundColor: "#222222", minHeight: "calc(100vh - 54px)" }}
    >
      <SearchDescription></SearchDescription>

      <SearchNavigation
        propsMatch={match}
        gameCnt={gameTotalCnt}
        userCnt={users.length}
        // gameCnt={3}
        // userCnt={3}
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
