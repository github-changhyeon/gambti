import React, { useEffect, useContext, useState } from "react";
import styles from "./EditProfiles.module.css";
import { UserContext } from "src/Context/UserContext";
import fire from "src/fire";
import firebase from "firebase";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router";
import { editProfile } from "src/common/axios/Account";

export default function EditProfile() {
  const history = useHistory();
  const user = useContext(UserContext);
  const currentUser = fire.auth.currentUser;

  const [nickname, setNickname] = useState(user.nickname);
  const [currentpw, setCurrentpw] = useState("");
  const [nickError, setNickError] = useState(false);
  const [pwcheck, setPwcheck] = useState(false);
  const [pwcheckError, setPwcheckError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [test, setTest] = useState(user.nickname);

  useEffect(() => {
    setNickname(user.nickname);
  }, []);

  // niciname 설정
  const handleChangeNick = (event) => {
    setNickname(event.target.value);
    // handleChangeNick.current.focus();
  };

  // TODO: Back에 nickname 수정된거 보내주기
  // nickname 수정, 수정 안될시 nickError
  const updateNick = (event) => {
    const idToken = window.localStorage.getItem("idToken");
    if (1 > nickname.length || 10 < nickname.length) {
      setNickError(true);
    } else {
      setNickError(false);
      currentUser.updateProfile({
        displayName: nickname,
      });
      fire.db.collection("users").doc(currentUser.uid).update({
        nickname: nickname,
      });
      const param = {
        nickname: nickname,
      };
      editProfile(
        idToken,
        param,
        (response) => {
          if (response.data.status !== "success") {
            console.log("edit profile error");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };
  // enter하면 updateNick 함수 호출(수정)
  const handleNickKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      updateNick();
    }
  };
  // 현재 비밀번호 설정
  const handleCurrentPasswordChange = (event) => {
    setCurrentpw(event.target.value);
  };
  // 현재 비밀번호가 user의 비밀번호와 일치한지 확인
  const handlePwKeyPress = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const credential = firebase.auth.EmailAuthProvider.credential(
        currentUser.email,
        event.target.value
      );
      await currentUser
        .reauthenticateWithCredential(credential)
        .then(() => {
          setPwcheck(true);
          setPwcheckError(false);
        })
        .catch((err) => {
          console.log(err);
          setPwcheck(false);
          setPwcheckError(true);
        });
    }
  };
  // 비밀번호 규칙
  const reg = /^(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/;

  // 새 비밀번호 설정
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  // 새 비밀번호 확인
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
        return <Typography>&nbsp;</Typography>;
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

  // 비밀번호 수정
  const handleSubmitKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (passwordError || passwordMatchError) {
        alert("조건에 적합하지 않은 부분이 있습니다.");
      } else {
        // 비밀번호 수정
        currentUser
          .updatePassword(password)
          .then(() => {
            alert("비밀번호 변경이 완료되었습니다.");
            history.push("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <form className={styles.edit}>
      <div className={styles.edit_content}>
        <label className={styles.edit_title}>닉네임 변경</label>
        <input
          className={styles.edit_sub}
          type="text"
          value={nickname}
          onChange={handleChangeNick}
          onKeyPress={handleNickKeyPress}
        />
        {nickError && (
          <div className={styles.error}>
            10자 이내로 닉네임을 설정해 주세요!
          </div>
        )}
      </div>
      <div className={styles.edit_content}>
        <label className={styles.edit_title}>비밀번호 변경</label>
        <input
          type="password"
          className={styles.edit_sub}
          placeholder="현재 비밀번호를 입력해 주세요."
          onChange={handleCurrentPasswordChange}
          onKeyPress={handlePwKeyPress}
          defaultValue={currentpw}
        />
        {pwcheckError && (
          <div className={styles.error}>비밀번호가 일치하지 않습니다.</div>
        )}
        {pwcheck && (
          <div className={styles.edit_pw}>
            <input
              id="password"
              type="password"
              className={styles.edit_sub}
              placeholder="새 비밀번호를 입력해주세요"
              defaultValue={password}
              onChange={handlePasswordChange}
            />
            <Pass className={styles.error} />

            <input
              id="passwordConfirm"
              type="password"
              className={styles.edit_sub}
              placeholder="새 비밀번호를 다시 한 번 입력해주세요"
              defaultValue={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              onKeyPress={handleSubmitKeyPress}
            />
            <PassConfirm className={styles.error}></PassConfirm>
          </div>
        )}
      </div>
    </form>
  );
}
