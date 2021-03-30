import React, { useEffect, useContext } from 'react';
import styles from './JoinComplete.module.css';
import fire from 'src/fire';
import firebase from 'firebase';
import qs from 'query-string';
import { useHistory } from 'react-router';

export default function JoinComplete({ query }) {
  const history = useHistory();
  const auth = fire.auth;
  const actionCode = query.oobCode;

  const currentUser = fire.auth.currentUser;

  const handleVerifyEmail = (auth, actionCode) => {

    auth.applyActionCode(actionCode)
      .then(() => {
        fire.db.collection("users").doc(currentUser.uid).update({
          emailVerified: true
        })
          .then(() => {
            // console.log('then')
            history.push('/');
          })
          .catch(() => {
          })
      }
      )
      .catch((error) => {
        // console.log('JoinComplete', error)
      })
    history.push('/');
  }

  useEffect(() => {
    // const auth = fire.auth;
    // const query = qs.parse(location && location.search);
    // const actionCode = query.oobCode
    // console.log(query)
    // console.log(actionCode);
    handleVerifyEmail(auth, actionCode);

  }, [])

  return (
    <div>
      인증되었습니다.
    </div>
  );

}
