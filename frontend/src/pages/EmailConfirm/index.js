import React, { useEffect, useContext } from 'react';
import styles from './index.module.css';
import { useHistory } from 'react-router-dom';
import fire from 'src/fire';
import { UserContext } from 'src/Context/UserContext';
import background from 'src/Images/background.jpg';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import Button from '@material-ui/core/Button';

export default function EmailConfirm() {
  const history = useHistory();

  // user: firestore에 넣은 커스텀한 데이터
  const user = useContext(UserContext);
  // currentUser: 현재 로그인되어 있는 user의 정보
  const currentUser = fire.auth.currentUser;

  // TODO: 인증 만료 시간 띄워주기
  const reSend = (event) => {
    currentUser
      .sendEmailVerification()
      .then(() => {
        alert('이메일 인증메일을 재발송 했습니다. 이메일을 확인해주세요.');
      })
      .catch((err) => {
        alert('인증메일이 발송된지 얼마지나지 않았습니다.이메일에서 인증메일을 확인해주세요.');
      });
  };

  // 로그아웃
  const logout = (event) => {
    fire.auth
      .signOut()
      .then(() => {
        window.localStorage.clear();
        history.push('/');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  // useEffect(() => {
  //   if (user.emailVerified) {
  //     // console.log('go');
  //     history.push('/');
  //   }
  //   console.log(currentUser);
  //   console.log(user);
  // }, []);

  return (
    <div
      className={styles.background_image}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className={styles.background}>
        <form className={styles.root}>
          <img className={styles.logo} src="/images/gambti/welcome_to_gambti.png" alt="logo" />
          <div className={styles.button_group}>
            <div className={styles.button}>
              <ButtonComp size="xlarge" textvalue="재전송" color="#CCFF00" onClick={reSend} />
            </div>
            <div className={styles.button}>
              <ButtonComp size="xlarge" textvalue="로그아웃" color="#CCFF00" onClick={logout} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
