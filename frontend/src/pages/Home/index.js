import React, { useEffect, useState, useContext } from 'react';
import { generatePath } from 'react-router-dom';
import routerInfo from 'src/constants/routerInfo';
import styles from './index.module.css';
import GameCard from 'src/components/GameCard/GameCard';
import fire from 'src/fire';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import GenreList from 'src/components/GenreList/GenreList';
import InfiniteScrollCard from 'src/components/InfiniteScrollCard/InfiniteScrollCard';
import RepresentImage from 'src/pages/Home/home-components/RepresentImage';
import { UserContext } from 'src/Context/UserContext';

export default function Home({ match }) {
  const history = useHistory();

  // var user = fire.auth().currentUser;
  // const [nickname, setNickname] = useState('')
  // const [email, setEmail] = useState('')
  // const [photoUrl, setPhotoUrl] = useState('')
  // const [uid, setUid] = useState('')
  // const [emailVerified, setEmailVerified] = useState('')
  // 전역변수 usertoken 가져오기
  console.log(match);
  const user = useContext(UserContext);
  const currentUser = fire.auth.currentUser;

  // 로그아웃
  const logout = (event) => {
    fire.auth
      .signOut()
      .then(() => {
        history.push('/');
        window.localStorage.clear();
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className={styles.background}>
      <RepresentImage />
      <Typography variant="h5" style={{ color: 'white', margin: '20px 0px 0px 20px' }} gutterBottom>
        Type of Games
      </Typography>
      <GenreList propsOrder="Random"></GenreList>
      <Typography
        variant="h5"
        style={{ color: 'white', margin: '20px 0px' }}
        gutterBottom
        align="center"
      >
        Browse Games
      </Typography>
      <Typography
        variant="body1"
        style={{ color: 'white', margin: '20px 0px 40px 0px' }}
        paragraph
        align="center"
      >
        Discover, follow, and play games!
      </Typography>
      {/* TODO: 인피니티 스크롤 router 이동에 따라서 랜더링 다시 안되는 부분 수정 */}
      <InfiniteScrollCard
        params={{
          type: 0,
          genreId: 0,
          order: 'DESC',
          word: '',
        }}
        routerMatch={match}
      />
      {/* <h1>Hello Home</h1>
      <a href="/test">Test Page</a>
      { user != null ?
        //로그인 되었을 경우

        user.emailVerified ?
          // 인증 되었을때 상황 
          <div>
            <p>{user.displayName}</p>
            <button onClick={logout}>로그아웃</button>
            <button onClick={updateTest}>update</button>
          </div> :
          // 인증이 안되었을 경우
          <p>
            {user.displayName}
            이메일 인증하세요.
          </p>
        :
        // 로그아웃 상황
        <div>
          <button onClick={login}>로그인</button>
        </div>
      } */}
    </div>
  );
}
