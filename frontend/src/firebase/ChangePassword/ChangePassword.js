import React, { useEffect, useContext } from 'react';
import styles from './ChangePassword.module.css';
import fire from 'src/fire';
import qs from 'query-string';
import { useHistory } from 'react-router';
import background from 'src/Images/background.jpg';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


export default function ChangePassword({ query }) {
  const history = useHistory();
  const auth = fire.auth;
  const actionCode = query.oobCode;
  const currentUser = fire.auth.currentUser;


  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordMatchError, setPasswordMatchError] = React.useState(false);

  // 계정을 찾는 사용자가 이메일 인증 후 유효한 비밀번호를 제출하면 firebase에 적용하는 함수
  const handleResetPassword = async (auth, actionCode) => {
    fire.auth.verifyPasswordResetCode(actionCode)
      .then((email) => {
        if (passwordError || passwordMatchError) {
          console.log('문제잇어')
        } else {
          auth.confirmPasswordReset(actionCode, password)
            .then((res) => {
              alert('비밀번호 변경이 완료되었습니다.');
              history.push('/');
            })
            .catch((err) => {
              console.log('verify', err);
            })

        }
      })
      .catch((err) => {
        console.log('reset', err)
      })
  }



  // 비밀번호 규칙
  const reg = /^(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/;

  // 비밀번호 설정
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  // 비밀번호 확인
  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };


  function PassConfirm() {
    const pass = document.getElementById("password");
    const confirm = document.getElementById("passwordConfirm");
    if (pass && confirm != null) {
      if (pass.value === "" || confirm.value === "") {
        return <Typography>&nbsp;</Typography>;
      }
      if (pass.value === confirm.value) {
        setPasswordMatchError(false);
        return (
          <Typography>&nbsp;</Typography>
        );
      }
      if (pass.value !== confirm.value) {
        setPasswordMatchError(true);
        return (
          <Typography className={styles.error}>
            비밀번호가 일치하지 않습니다.
          </Typography>
        );
      }
    }
    return <Typography>&nbsp;</Typography>;
  }

  function Pass() {
    const pass = document.getElementById("password");
    if (pass != null) {
      if (pass.value === "") {
        return <Typography>&nbsp;</Typography>;
      }
      if (!reg.test(pass.value)) {
        setPasswordError(true);
        return (
          <Typography className={styles.error}>
            비밀번호는 소문자/숫자 포함 8자 이상, 20자 이하입니다.
          </Typography>
        );
      } else {
        setPasswordError(false);
        return <Typography>&nbsp;</Typography>;
      }
    }
    return <Typography>&nbsp;</Typography>;
  }

  const handleKeyPress = (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
      handleResetPassword(auth, actionCode);
    }
  };

  return (
    <div
      className={styles.background}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <Container component="main" maxWidth="xs">
        <div className={styles.root}>
          <form noValidate className={styles.form}>
            <img className={styles.logo} src="/images/gambti/gambti_logo.png" alt="logo" />
            <div>
              <Typography className={styles.title}>Reset Password</Typography>
              <Typography className={styles.sub}>If you’d like to reset your password. enter a new  one below.</Typography>
            </div>
            <div className={styles.form_holder} >
              <input
                id="password"
                type="password"
                className={styles.newinput}
                placeholder="새로운 비밀번호를 입력해주세요."
                required
                onChange={handlePasswordChange}
              />
              <Pass className={styles.error} />
              <input
                id="passwordConfirm"
                type="password"
                className={styles.newinput}
                placeholder="비밀번호를 확인해 주세요"
                required
                onChange={handlePasswordConfirmChange}
              />
              <PassConfirm className={styles.error}></PassConfirm>
            </div>
            <div className={styles.buttons}>
              <ButtonComp
                size='large'
                textvalue='Reset Password'
                color='#CCFF00'
                onClick={() => {
                  handleResetPassword(auth, actionCode);
                }}
                onKeyPress={handleKeyPress}
              />
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

