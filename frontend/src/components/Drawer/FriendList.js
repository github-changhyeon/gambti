import React, { useState, useEffect, useContext } from "react";
import styles from "./FriendList.module.css";
import { makeOneOnOneChatRoom } from "src/firebase/chat/chat";
import MediumProfile from "src/components/MediumProfile/MediumProfile";
import Chat from "./Chat";
import { UserContext } from "src/Context/UserContext";
import fire from "src/fire";

export default function FriendList({ showChat }) {
  const [friend, setFriend] = React.useState("");
  const [chat, setChat] = React.useState(!showChat);
  const user = useContext(UserContext);

  const [friendList, setFriendList] = useState(new Array());
  const friendListRef = React.useRef;
  friendListRef.current = friendList;

  useEffect(() => {
    setFriendList(new Array());
    getFriends();
  }, []);

  const getFriends = () => {
    fire.db
      .collection("users")
      .doc(user.uid)
      .collection("friends")
      .where("status", "==", 2)
      .onSnapshot((snapshot) => {
        const changes = snapshot.docs.map((change) => {
          return fire.db.collection("users").doc(change.id).get();
        });

        let temp = new Array();
        changes.forEach((item, i) => {
          item.then((info) => {
            temp.push(info);
            if (i === changes.length - 1) {
              setFriendList([...friendListRef.current, ...temp]);
            }
          });
        });
      });
  };

  const handleChatChange = (fuser) => {
    setFriend(fuser);
    setChat(!chat);
  };

  return (
    <div className={styles.friend_list}>
      <div style={{ width: "500px" }}>
        {/* TODO: 친구없을때 UI 고치기 */}
        {friendList.length === 0 ? (
          <div>
            <p>친구가 없습니다.</p>
            <p>새로운 친구를 만나보세요!</p>
          </div>
        ) : (
          <>
            {friendList.map((fuser, i) => {
              return (
                <div key={i} style={{ width: "195px" }}>
                  <MediumProfile
                    propsUser={{
                      nickname: fuser.data().nickname,
                      email: fuser.data().email,
                      imgPath: fuser.data().imgPath,
                    }}
                    onClick={() => {
                      handleChatChange(fuser);
                    }}
                  />
                  <hr />
                </div>
              );
            })}
          </>
        )}

        {/* {
          chat && */}
        {chat ? (
          <div>
            <Chat propsUser={friend} chat={chat} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
