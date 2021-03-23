import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import GameCard from 'src/components/GameCard/GameCard';
import fire from 'src/firebaseConfig';
import { useHistory } from 'react-router';


export default function Home() {
  const history = useHistory()

  var user = fire.auth().currentUser;
  const [nickName, setNickName] = useState('')
  const [email, setEmail] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [uid, setUid] = useState('')
  const [emailVerified, setEmailVerified] = useState('')

  // user의 로그인 상황 바로 알기 위해 사용
  useEffect(() => {
    if (user) {
      setNickName(user.displayName);
      setEmail(user.email);
      setPhotoUrl(user.photoURL);
      setEmailVerified(user.emailVerified);
      setUid(user.uid);
    }
  }, [user])

  // 로그아웃
  const logout = (event) => {
    fire.auth().signOut().then(() => {
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
        // 로그인 되었을때 상황 
        <div>
          <p>로그인 되었당</p>
          <p>닉네임: {nickName}</p>
          <p>아이디: {email}</p>
          <p>사진: {photoUrl}</p>
          <p>이메일인증: {emailVerified}</p>
          <p>uid: {uid}</p>
          <button onClick={logout}>로그아웃</button>
        </div> :
        // 로그아웃 상황
        <div>
          <button onClick={login}>로그인</button>
        </div>
      }
    </div>
  );
}
