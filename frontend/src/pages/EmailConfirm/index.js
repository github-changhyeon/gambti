import React, { useEffect, useContext } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import fire from 'src/fire';
import { UserContext } from 'src/Context/UserContext';
import firebase from 'firebase';

export default function EmailConfirm() {
  const history = useHistory();

  const user = useContext(UserContext);
  const currentUser = fire.auth.currentUser;


  const reSend = (event) => {
    // TODO: 재인증 실패 다시
    console.log(user)
    console.log(currentUser)


    const credential = firebase.auth.EmailAuthProvider.credentialWithLink(
      user.email, window.location.href);

    // Re-authenticate the user with this credential.
    fire.auth.user.reauthenticateWithCredential(credential)
      .then((usercred) => {
        // The user is now successfully re-authenticated and can execute sensitive
        // operations.
        alert('인증 메일이 재전송 되었습니다.')

      })
      .catch((error) => {
        // Some error occurred.
        alert(error)
        console.log(error)
      });

  };

  // 로그아웃
  const logout = (event) => {
    fire.auth.signOut().then(() => {
      history.push('/')
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div>
      <h1>Hello EmailConfirm</h1>
      <button onClick={reSend}>재전송</button>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}
