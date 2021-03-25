import React, { useEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import routerInfo from "src/constants/routerInfo";
import styles from "./index.module.css";
import GameCard from "src/components/GameCard/GameCard";
import fire from "src/firebaseConfig";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import GenreList from "src/components/GenreList/GenreList";
import InfiniteScrollCard from "src/components/InfiniteScrollCard/InfiniteScrollCard";
import RepresentImage from "src/pages/Home/home-components/RepresentImage";
import { restApi } from "src/common/axios/index";

export default function Home() {
  // const history = useHistory()

  // var user = fire.auth().currentUser;
  // const [nickName, setNickName] = useState('')
  // const [email, setEmail] = useState('')
  // const [photoUrl, setPhotoUrl] = useState('')
  // const [uid, setUid] = useState('')
  // const [emailVerified, setEmailVerified] = useState('')
  const [mainGameDatas, setMainGameDatas] = useState(new Array());

  // // user의 로그인 상황 바로 알기 위해 사용
  // useEffect(() => {
  //   if (user) {
  //     setNickName(user.displayName);
  //     setEmail(user.email);
  //     setPhotoUrl(user.photoURL);
  //     setEmailVerified(user.emailVerified);
  //     setUid(user.uid);
  //   }
  // }, [user])

  // // 로그아웃
  // const logout = (event) => {
  //   fire.auth().signOut().then(() => {
  //     history.push('/')
  //   }).catch((error) => {
  //     // An error happened.
  //   });
  // }

  // // 그냥 test 버튼
  // const login = () => {
  //   history.push('/login')
  // }
  // const classes = useStyles();
  useEffect(() => {
    restApi()
      .get(
        `games/find?genreId=1&page=1&size=10&direction=DESC&colName=metascore`
      )
      .then((res) => {
        console.log(res.data.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ backgroundColor: "#222222" }}>
      <RepresentImage />
      <Typography
        variant="h5"
        style={{ color: "white", margin: "20px 0px 0px 20px" }}
        gutterBottom
      >
        Type of Games
      </Typography>
      <GenreList propsOrder="all"></GenreList>
      <Typography
        variant="h5"
        style={{ color: "white", margin: "20px 0px" }}
        gutterBottom
        align="center"
      >
        Browse Games
      </Typography>
      <Typography
        variant="body1"
        style={{ color: "white", margin: "20px 0px 40px 0px" }}
        paragraph
        align="center"
      >
        Discover, follow, and play games!
      </Typography>
      <InfiniteScrollCard />
    </div>
    // <div>
    //   <h1>Hello Home</h1>
    //   <a href="/test">Test Page</a>
    //   { user != null ?
    //     // 로그인 되었을때 상황
    //     <div>
    //       <p>로그인 되었당</p>
    //       <p>닉네임: {nickName}</p>
    //       <p>아이디: {email}</p>
    //       <p>사진: {photoUrl}</p>
    //       <p>이메일인증: {emailVerified}</p>
    //       <p>uid: {uid}</p>
    //       <button onClick={logout}>로그아웃</button>
    //     </div> :
    //     // 로그아웃 상황
    //     <div>
    //       <button onClick={login}>로그인</button>
    //     </div>
    //   }
    //   <button
    //     onClick={() => {
    //       history.push(
    //         generatePath(routerInfo.PAGE_URLS.GAMES, {
    //           order: 'a',
    //           genre: 'b',
    //         })
    //       );
    //     }}
    //   >
    //     버튼
    //   </button>
    // </div>
  );
}
