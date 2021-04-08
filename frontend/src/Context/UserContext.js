import React, { useState, createContext, useEffect, useRef } from "react";
import fire from "src/fire";

const UserContext = createContext();
const CurrentUser = fire.auth.currentUser;

const UserProvider = (props) => {
  const [user, setUser] = useState({ isLoggedIn: null });
  // 레퍼런스: 값을 지목시켜주는거
  const unsubscribe = useRef();

  const subscribeUser = (uid) => {
    if (!uid) return;

    // unsub는 함수
    const unsub = fire.db
      .collection("users")
      .doc(uid)
      // 리스너 (상태가 변할때 마다 알려주는 역할)
      .onSnapshot({
        // 바뀔때마다
        next: (user) => {
          // ...의미: use.id는 uid로 쓰고 나머지는 user.data에 있는거 뿌셔서 doc에 넣어줌
          updateUser({ uid: user.id, ...user.data() });
        },
        error: (error) => {
          console.log(`[User Listener Error] ${error.message}`);
        },
      });
    // unsubscribe.current는 unsub의 값을 가르키며 가진다.
    unsubscribe.current = unsub;
  };
  // 현재 user를 구독 취소해라.
  const unsubscribeCurrentUser = () => {
    if (!unsubscribe.current) return;
    // 리스너 구독해제하는 함수
    unsubscribe.current();
    // 리스너 구독 해제 했으니까 undefined한거
    unsubscribe.current = undefined;
  };

  // 리스너 구독
  const initUser = async (currentUser) => {
    subscribeUser(currentUser.uid);
  };

  // 업데이트 user
  const updateUser = async (user) => {
    if (!user.uid) return;
    setUser({ isLoggedIn: true, ...user });
  };

  useEffect(() => {
    const unsubscribeAuth = fire.auth.onAuthStateChanged((currentUser) => {
      unsubscribeCurrentUser();
      if (currentUser) {
        initUser(currentUser);
      } else {
        setUser({ isLoggedIn: false });
      }
    });

    // 컴포넌트가 unmount되었을때 실행되는 것
    return () => {
      unsubscribeAuth();
      unsubscribeCurrentUser();
    };
  }, []);

  return (
    // Provieder를 통해 값을 변화시킬수 있음.
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
