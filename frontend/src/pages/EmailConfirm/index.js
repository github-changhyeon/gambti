import React, { useEffect, useContext } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import fire from 'src/fire';
import { UserContext } from 'src/Context/UserContext';

export default function EmailConfirm() {
  const history = useHistory();

  // user: firestore에 넣은 커스텀한 데이터
  const user = useContext(UserContext);
  // currentUser: 현재 로그인되어 있는 user의 정보
  const currentUser = fire.auth.currentUser;

  // TODO: 인증 만료 시간 띄워주기
  const reSend = (event) => {
    currentUser.sendEmailVerification()
      .then(() => {
        alert('이메일 인증메일을 재발송 했습니다. 이메일을 확인해주세요.');
      })
      .catch((err) => {
        alert('인증메일이 발송된지 얼마지나지 않았습니다.이메일에서 인증메일을 확인해주세요.');
      })
  };

  // 로그아웃
  const logout = (event) => {
    fire.auth.signOut().then(() => {
      window.localStorage.clear();
      history.push('/');
    }).catch((error) => {
      // An error happened.
    });
  }

  useEffect(() => {
    if (user.emailVerified) {
      // console.log('go');
      history.push('/');
    }
    console.log(currentUser);
    console.log(user);
  }, []);



  return (
    <div>
      <h1>Hello EmailConfirm</h1>
      <button onClick={reSend}>재전송</button>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}
