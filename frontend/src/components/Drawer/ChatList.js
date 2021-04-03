import React, { useState, useContext, useEffect } from 'react';
import styles from './ChatList.module.css';
import { getFriends, getChatRooms, makeOneOnOneChatRoom, makeGroupChatRoom, sendMessage, readMessage } from 'src/firebase/chat/chat';
import MediumProfile from 'src/components/MediumProfile/MediumProfile';
import Chat from './Chat';
import { UserContext } from 'src/Context/UserContext';




export default function ChatList({ showChat }) {


  const [friend, setFriend] = React.useState('');
  const [chatList, setChatList] = React.useState([]);
  const [chat, setChat] = React.useState(!showChat);

  const user = useContext(UserContext);

  // const [chatList, setChatList] = useState(user.rooms);
  useEffect(() => {
    getChatRooms().then((list) => {
      setChatList(list);
    });
  }, [setChatList]);

  console.log(chatList)

  // const makeOOOchatRoom = (fuid) => {
  //   // console.log("1:1 챗방 : " + fuid);
  //   makeOneOnOneChatRoom(fuid);
  // }

  const handleChatChange = (user) => {
    setFriend(user);
    setChat(!chat);
    // console.log(friend, chat);
    // console.log(showChat);

  }


  return (

    <div className={styles.friend_list}>
      <div style={{ width: '500px' }}>
        {chatList.map((user, i) =>
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
          </div>
        )}
        {/* {
          chat && */}
        {
          chat ?
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



