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

  const handleChatChange = (fuser) => {
    setFriend(fuser);
    makeOOOchatRoom(fuser)
    setChat(!chat);
    // console.log(user);
    // console.log(friend, chat);
    // console.log(showChat);

  }


  return (
    <div className={styles.friend_list}>
      <div style={{ width: '500px' }}>
        {friendList.map((fuser, i) =>
          <div key={i} style={{ width: '195px' }}
          >
            <MediumProfile
              propsUser={fuser}
              onClick={() => {
                handleChatChange(fuser)
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



