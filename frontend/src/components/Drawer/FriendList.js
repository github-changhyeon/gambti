import React, { useState, useEffect } from 'react';
import styles from './FriendList.module.css';
import { getFriends, getChatRooms, makeOneOnOneChatRoom, makeGroupChatRoom, sendMessage, readMessage } from 'src/firebase/chat/chat';
import MediumProfile from 'src/components/MediumProfile/MediumProfile';
import Chat from './Chat';

export default function FriendList({ showChat }) {

  const [friend, setFriend] = React.useState('');
  const [chat, setChat] = React.useState(!showChat);


  const [friendList, setFriendList] = useState(new Array());
  useEffect(() => {
    getFriends().then((list) => {
      setFriendList(list);
    });
  }, [getFriends]);

  const makeOOOchatRoom = (fuid) => {
    // console.log("1:1 챗방 : " + fuid);
    makeOneOnOneChatRoom(fuid);
  }

  const handleChatChange = (user) => {
    setFriend(user);
    setChat(!chat);
    // console.log(friend, chat);
    // console.log(showChat);

  }


  return (
    <div className={styles.friend_list}>
      <div style={{ width: '500px' }}>
        {friendList.map((user, i) =>
          <div key={i} style={{ width: '195px' }}
          >
            <MediumProfile
              propsUser={user}
              onClick={() => {
                handleChatChange(user)
              }
              }
            />
            <hr />
            {/* Chat방 */}
            {/* <button onClick={() => makeOOOchatRoom(user.uid)}>1:1 대화 하기</button> */}
          </div>
        )}
        {/* {
          chat && */}
        {
          chat ?
            // <div className={styles.chat}>
            <div>
              <Chat propsUser={friend} chat={chat} />
            </div> :
            <div>

            </div>

        }
      </div>
    </div>
  );
}



