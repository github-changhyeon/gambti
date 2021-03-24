import React, { useState, createContext, useEffect } from "react";
import fire from 'src/fire';

const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(null)

  const subscribeUser = (uid) => {
    if (!uid) return;
    return fire.db.collection("user").doc(uid).onSnapshot((userDoc) => {
      console.log({ userDoc, ...userDoc.data() })
    }); //return type : function (unsubscribe user)
  }

  useEffect(() => {
    fire.auth.onAuthStateChanged((user) => {
      if (user) {
        // 로그인 O
        setUser(user)
        console.log(user)
      } else {
        // 로그인 X
        setUser(null)
      }
    });
  }, [user]);


  return (
    // Provieder를 통해 값을 변화시킬수 있음.
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };
