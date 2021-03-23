import React, { useEffect, useState, useContext } from 'react';
import { generatePath } from 'react-router-dom';
import routerInfo from 'src/constants/routerInfo';
import styles from './index.module.css';
import GameCard from 'src/components/GameCard/GameCard';
import fire from 'src/fire';
import { useHistory } from 'react-router';
import { UserContext } from 'src/Context/UserContext';



export default function Home() {
  const history = useHistory()

  // 전역변수 usertoken 가져오기
  const user = useContext(UserContext);

  // 로그아웃
  const logout = (event) => {
    fire.auth.signOut().then(() => {
      history.push('/')
    }).catch((error) => {
      // An error happened.
    });
  }

  // 그냥 test 버튼
  const login = () => {
    history.push('/login')
  }


  return (
    <div>
      <h1>Hello Home</h1>
      <a href="/test">Test Page</a>
      { user != null ?
        //로그인 되었을 경우

        user.emailVerified ?
          // 인증 되었을때 상황 
          <div>
            <p>{user.email}</p>
            <button onClick={logout}>로그아웃</button>
          </div> :
          // 인증이 안되었을 경우
          <p>
            이메일 인증하세요.
          </p>
        :
        // 로그아웃 상황
        <div>
          <button onClick={login}>로그인</button>
        </div>
      }
      <button
        onClick={() => {
          history.push(
            generatePath(routerInfo.PAGE_URLS.GAMES, {
              order: 'a',
              genre: 'b',
            })
          );
        }}
      >
        버튼
      </button>
    </div>
  );
}
