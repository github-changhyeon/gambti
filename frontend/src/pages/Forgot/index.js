import React from "react";
import styles from "./index.module.css";
import ButtonComp from "src/components/ButtonComp/ButtonComp";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import fire from "src/fire";
import { useHistory } from "react-router";
import background from "src/Images/background.jpg";

export default function Forgot() {
  const history = useHistory();

  const [email, setEmail] = React.useState("");

  // 이메일 입력
  const handleEmailChange = (event) => {
    setEmail(event.currentTarget.value);
  };
  // 이메일로 비밀번호 전송
  const handleSend = () => {
    if (email != "") {
      fire.auth
        .sendPasswordResetEmail(email)
        .then(() => {
          history.push("/forgot/sent");
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/user-not-found") {
            alert("사용자가 존재하지 않습니다.");
          }
        });
    } else {
    }
  };
  // enter 치면 함수 실행되도록
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={styles.background_image}
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className={styles.background}>
        <Container component="main" maxWidth="xs">
          <div className={styles.root}>
            <form noValidate className={styles.form}>
              <Typography className={styles.title}>Forgot password?</Typography>
              <Typography className={styles.sub}>
                Enter the email address on tour account and we'll email your
                login crdentials to you.
              </Typography>
              <div className={styles.form_holder}>
                <input
                  id="email"
                  type="email"
                  className={styles.newinput}
                  placeholder="Email"
                  required
                  onChange={handleEmailChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className={styles.buttons}>
                <ButtonComp
                  size="large"
                  textvalue="Send"
                  color="#CCFF00"
                  onClick={handleSend}
                  onKeyPress={handleKeyPress}
                ></ButtonComp>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
}
