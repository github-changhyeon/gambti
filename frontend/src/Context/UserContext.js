import React, { useState, createContext, useEffect, useRef } from "react";
import fire from 'src/fire';

const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState({ isLoggedIn: null });
  const unsubscribe = useRef();


  const subscribeUser = (uid) => {
    if (!uid) return;
    console.log("subscribing user:", uid);

    const unsub = fire.db
      .collection("users")
      .doc(uid)
      .onSnapshot({
        next: (user) => {
          updateUser({ uid: user.id, ...user.data() });
        },
        error: (error) => {
          console.log(`[User Listener Error] ${error.message}`);
        },
      });
    unsubscribe.current = unsub;
  }
  const unsubscribeCurrentUser = () => {
    if (!unsubscribe.current) return;
    console.log("unsubscribing current user...");
    unsubscribe.current();
    unsubscribe.current = undefined;
    console.log("unsubscribed.");
  };

  const initUser = async (currentUser) => {
    console.log("initializing user:", currentUser.uid);
    subscribeUser(currentUser.uid);
  };

  const updateUser = async (user) => {
    if (!user.uid) return;
    setUser({ isLoggedIn: true, ...user });
    console.log("updated user");
  };


  useEffect(() => {
    const unsubscribeAuth = fire.auth.onAuthStateChanged((currentUser) => {
      unsubscribeCurrentUser();
      if (currentUser) {
        initUser(currentUser);
        // console.log(currentUser);
      }
      else {
        setUser({ isLoggedIn: false });
      };
    });

    return () => {
      unsubscribeAuth();
      unsubscribeCurrentUser();
    };
  }, []);




  return (
    // Provieder를 통해 값을 변화시킬수 있음.
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };
