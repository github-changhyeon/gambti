import React, { useEffect, useContext } from "react";
import styles from "./JoinComplete.module.css";
import fire from "src/fire";
import qs from "query-string";
import { useHistory } from "react-router";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import background from "src/Images/background.jpg";

export default function JoinComplete({ query }) {
  const history = useHistory();
  const auth = fire.auth;
  const actionCode = query.oobCode;

  const currentUser = fire.auth.currentUser;

  const handleVerifyEmail = (auth, actionCode) => {
    auth
      .applyActionCode(actionCode)
      .then(() => {
        fire.db
          .collection("users")
          .doc(currentUser.uid)
          .update({
            emailVerified: true,
          })
          .then(() => {
            history.push("/");
          })
          .catch(() => {});
      })
      .catch((error) => {
        console.log(error);
      });
    history.push("/");
  };

  useEffect(() => {
    // const auth = fire.auth;
    // const query = qs.parse(location && location.search);
    // const actionCode = query.oobCode
    handleVerifyEmail(auth, actionCode);
  }, []);

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
            <img
              className={styles.logo}
              src="/images/gambti/gambti_logo.png"
              alt="logo"
            />
            <div>
              <Typography className={styles.title}>인증되었습니다.</Typography>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
