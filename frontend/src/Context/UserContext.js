import React, { useState, createContext, useEffect } from "react";
import fire from 'src/fire';

const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(null)
  // const user = fire.auth.currentUser;
  // const [nickName, setNickName] = useState('')
  // const [email, setEmail] = useState('')
  // const [photoUrl, setPhotoUrl] = useState('')
  // const [uid, setUid] = useState('')
  // const [emailVerified, setEmailVerified] = useState('')

  useEffect(() => {
    fire.auth.onAuthStateChanged((user) => {
      if (user) {
        // 로그인 O
        setUser(user)
        console.log(user)
      } else {
        // 로그인 X
      }
    });
  }, []);


  return (
    // Provieder를 통해 값을 변화시킬수 있음.
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };
