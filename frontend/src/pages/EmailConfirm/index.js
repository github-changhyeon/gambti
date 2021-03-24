import React, { useContext } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import fire from 'src/fire';
import { UserContext } from 'src/Context/UserContext';

export default function EmailConfirm() {
  const history = useHistory();

  const user = useContext(UserContext);

  const reSend = (event) => {
    // TODO: 재인증 실패 다시
    // const credential = fire.auth.EmailAuthProvider.credential(
    //   user.email,
    // )

    // user.reauthenticateWithCredential(credential).then(function () {
    //   // User re-authenticated.
    //   alert('인증 메일이 재전송 되었습니다.')
    // }).catch(function (error) {
    //   // An error happened.
    // });
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
