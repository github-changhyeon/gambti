import React, { useContext, useEffect } from 'react';
import styles from './index.module.css';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import fire from 'src/fire';
import { GoogleLoginButton, TwitterLoginButton } from 'react-social-login-buttons';
// import { UserContext } from 'src/Context/UserContext';
import { signup } from 'src/common/axios/Account';
import background from 'src/Images/background.jpg';
import firebase from 'firebase';
import CheckInfo from 'src/pages/CheckInfo/index';
import CheckGambti from 'src/components/CheckInfo/CheckInfo';
import { useHistory, useLocation } from 'react-router';

export default function Signup() {
  const history = useHistory();
  const location = useLocation();
  // const user = useContext(UserContext);

  const [nickname, setNickname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');

  const [nullError, setNullError] = React.useState(false);
  const [passwordMatchError, setPasswordMatchError] = React.useState(false);
  const [emailVarifiedError, setEmailVarifiedError] = React.useState(false);
  const [passwordLengthError, setNullPasswordLengthError] = React.useState(false);
  const [nicknameError, setNicknameError] = React.useState(false);

  // check-gambti 에서 받아온 정보
  const mbti = location.state.mbti;
  const mbtiSub = location.state.mbtiSub;

  // check-info 에서 받아온 정보
  const gender = location.state.gender;
  const age = location.state.age;
  const maxPrice = location.state.maxPrice;
  const userLikeTagIds = location.state.userLikeTagIds;

  const isSignup = location.state.isSignup;

  useEffect(() => {
    console.log('시작');
  });

  const [basicImg, setBasicImg] = React.useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleUserChange = (event) => {
    setNickname(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  function Nickname() {
    // 닉네임 확인
    const nick = document.getElementById('nickname');
    if (nick != null) {
      if (nick.value === '') {
        setNullError(true);
        return <Typography className={styles.error_message}>&nbsp;</Typography>;
      }
      if (1 > nick.value.length || nick.value.length > 10) {
        setNullError(false);
        setNicknameError(true);
        return <Typography className={styles.error}>닉네임은 10자 이하입니다.</Typography>;
      } else {
        setNullError(false);
        setNicknameError(false);
        return <Typography className={styles.error_message}>&nbsp;</Typography>;
      }
    }
    // setNullError(true);
    return <Typography className={styles.error_message}>&nbsp;</Typography>;
  }

  // 이메일 형식
  const valid = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  function Email() {
    const email = document.getElementById('email');
    if (email != null) {
      if (email.value === '') {
        setNullError(true);
        return <Typography className={styles.error_message}>&nbsp;</Typography>;
      }
      if (!valid.test(email.value)) {
        setNullError(false);
        setEmailVarifiedError(true);
        return <Typography className={styles.error}>이메일 형식이 아닙니다.</Typography>;
      } else {
        setNullError(false);
        setEmailVarifiedError(false);
        return <Typography className={styles.error_message}>&nbsp;</Typography>;
      }
    }
    // setNullError(true);
    return <Typography className={styles.error_message}>&nbsp;</Typography>;
  }

  // 비밀번호 규칙
  const reg = /^(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/;
  function Pass() {
    const pass = document.getElementById('password');
    if (pass != null) {
      if (pass.value === '') {
        setNullError(true);
        return <Typography className={styles.error_message}>&nbsp;</Typography>;
      }
      if (!reg.test(pass.value)) {
        setNullError(false);
        setNullPasswordLengthError(true);
        return (
          <Typography className={styles.error}>
            비밀번호는 소문자/숫자 포함 8자 이상, 20자 이하입니다.
          </Typography>
        );
      } else {
        setNullError(false);
        setNullPasswordLengthError(false);
        return <Typography className={styles.error_message}>&nbsp;</Typography>;
      }
    }
    // setNullError(true);
    return <Typography className={styles.error_message}>&nbsp;</Typography>;
  }

  // 비밀번호 === 비밀번호 확인
  function PassConfirm() {
    const pass = document.getElementById('password');
    const confirm = document.getElementById('passwordConfirm');
    if (pass && confirm != null) {
      if (pass.value === '' || confirm.value === '') {
        setNullError(true);
        return <Typography className={styles.error_message}>&nbsp;</Typography>;
      }
      if (pass.value === confirm.value) {
        setNullError(false);
        setPasswordMatchError(false);
        return <Typography className={styles.error_message}>&nbsp;</Typography>;
      }
      if (pass.value !== confirm.value) {
        setNullError(false);
        setPasswordMatchError(true);
        return <Typography className={styles.error}>비밀번호가 일치하지 않습니다.</Typography>;
      }
    }
    // setNullError(true);
    return <Typography className={styles.error_message}>&nbsp;</Typography>;
  }

  const [isNext, setIsNext] = React.useState(false);

  const onNext = () => {
    if (
      nullError ||
      passwordMatchError ||
      emailVarifiedError ||
      nicknameError ||
      passwordLengthError
    ) {
      alert('조건에 적합하지 않은 부분이 있습니다.');
    } else {
      setIsNext(true);
    }
  };

  // TODO: male 처리;
  useEffect(() => {
    if (gender === 'MALE') {
      setBasicImg('/images/male.png');
    } else {
      setBasicImg('/image/female.png');
    }
  }, [gender]);


  useEffect(() => {
    if (isNext) {
      console.log('이즈넥스트!!');
    } else return;
  }, [isNext]);

  useEffect(() => {
    if (isSignup === true) {
      console.log('============================');
      console.log('성별: ' + gender);
      console.log('연령: ' + age);
      console.log('가격: ' + maxPrice);
      console.log('태그: ' + userLikeTagIds);
      console.log('mbti: ' + mbti);
      console.log('mbtiSub: ' + mbtiSub);
      console.log('============================');

      onSignup();
    } else return;
  }, [isSignup]);

  // TODO: 두번 눌러야 해결됨
  // firebase signup
  const onSignup = (event) => {
    fire.auth
      .createUserWithEmailAndPassword(email, password)
      .then((currentUser) => {
        history.push('/email-confirm');

        // token 받아오기
        fire.auth.currentUser
          .getIdToken()
          .then(function (idToken) {
            window.localStorage.setItem('idToken', idToken);
            // mbti, gender는 대문자
            const param = {
              mbti: mbti,
              gender: gender,
              steamId: '',
              maxPrice: maxPrice,
              age: age,
              nickname: nickname,
              userLikeTagIds: userLikeTagIds,
            };

            // add user to db
            fire.db.collection('users').doc(currentUser.user.uid).set({
              nickname: nickname,
              email: currentUser.user.email,
              // emailVerified: currentUser.user.emailVerified,
              emailVerified: true,
              uid: currentUser.user.uid,
              mbti: mbti,
              mbtiSub: mbtiSub,
              rooms: [],
              imgPath: basicImg,
            });

            // axios
            // response.data.status: 상태
            // response.data.message: 메세지
            // response.data.data: get할 경우 객체 받는거
            signup(
              idToken,
              param,
              (response) => {
                // console.log(response, 'response');
                if (!response.data.status) {
                } else {
                  // console.log(response.data.message);
                }
              },
              (error) => {
                // console.log(error);
              }
            );
          })
          .catch(function (error) {
            // Handle error
          });

        const createdUser = currentUser.user;

        // 정보 수정
        createdUser
          .updateProfile({
            displayName: nickname,
          })
          .then(function () {
            // Update successful.
          })
          .catch(function (error) {
            // An error happened.
          });
        // 이메일 인증
        createdUser
          .sendEmailVerification()
          .then(function () {
            alert('인증메일 발송 이메일을 확인해주세요');
          })
          .catch(function (error) {
            alert('인증메일 발송에 실패하였습니다.');
          });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (error.code === 'auth/email-already-in-use') {
          alert('해당 이메일은 이미 존재합니다.');
        }
        // console.log(errorMessage);
        // ..
      });
  };

  // TODO: preventDefault 알아보기
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onNext();
    }
  };

  useEffect(() => {
    if (mbti === null || mbti === undefined) return;
    else {
      console.log('이것의 mbti: ' + mbti);
      console.log('mbtiSub: ' + mbtiSub);
    }
  }, [mbti]);

  return (
    <div
      className={styles.background}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {isNext && <CheckGambti mbti={mbti} mbtiSub={mbtiSub} />}
      {!isNext && (
        <Container component="main" maxWidth="xs">
          <div className={styles.root}>
            <form noValidate className={styles.form}>
              <Typography className={styles.policy}>
                By signing up, you agree to the Terms of User and Privacy Policy, including the
                Cookie Policy.
              </Typography>

              <div className={styles.form_holder}>
                {/* nickname */}
                <input
                  id="nickname"
                  type="text"
                  className={styles.newinput}
                  autofocus
                  placeholder="Nickname"
                  required
                  onChange={handleUserChange}
                />
                <Nickname className={styles.error} />
                {/* Email */}
                <input
                  id="email"
                  type="email"
                  className={styles.newinput}
                  placeholder="Email"
                  required
                  onChange={handleEmailChange}
                />
                <Email className={styles.error} />
                {/* password */}
                <input
                  id="password"
                  type="password"
                  className={styles.newinput}
                  placeholder="Password"
                  required
                  onChange={handlePasswordChange}
                />
                <Pass className={styles.error} />
                <input
                  id="passwordConfirm"
                  type="password"
                  className={styles.newinput}
                  placeholder="PasswordConfirm"
                  required
                  onChange={handlePasswordConfirmChange}
                  onKeyPress={handleKeyPress}
                />
                <PassConfirm className={styles.error}></PassConfirm>
              </div>

              <div className={styles.buttons}>
                <ButtonComp
                  size="large"
                  textvalue="NEXT"
                  color="#CCFF00"
                  onClick={onNext}
                  onKeyPress={onNext}
                ></ButtonComp>
                {/* <ButtonComp
              size="large"
              textvalue="SIGN UP"
              color="#CCFF00"
              onClick={onSignup}
              onKeyPress={onSignup}
            ></ButtonComp> */}
              </div>
            </form>
            <div className={styles.move_page}>
              <a href="/login" className={styles.link}>
                or Log In
              </a>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}
