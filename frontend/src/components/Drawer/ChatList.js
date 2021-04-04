import React, { useState, useContext, useEffect } from 'react';
import styles from './ChatList.module.css';
import { getFriends, getChatRooms, makeOneOnOneChatRoom, makeGroupChatRoom, sendMessage, readMessage } from 'src/firebase/chat/chat';
import MediumProfile from 'src/components/MediumProfile/MediumProfile';
import Chat from './Chat';
import { UserContext } from 'src/Context/UserContext';
import fire from 'src/fire';




export default function ChatList({ showChat }) {

  const [chat, setChat] = React.useState(!showChat);
  const [currentRoomId, setCurrentRoomId] = React.useState('');


  const [chatList, setChatList] = React.useState([]);
  const chatRef = React.useRef();
  chatRef.current = chatList;

  const user = useContext(UserContext);
  const roomId = user.rooms;
  // console.log(roomId);


  useEffect(() => {
    ReadChatList(roomId);
  }, []);

  const ReadChatList = async (roomIds) => {
    // console.log(roomIds.length);
    await roomIds.map((roomId) => {
      fire.db.collection("rooms").doc(roomId)
        .get().then((doc) => {
          const roomInfo = doc.data();
          if (roomInfo === undefined) {
            return
          }
          // chat방 소속 room의 정보를 setChatList에 넣어줌
          setChatList([...chatRef.current, roomInfo]);
          // console.log(roomInfo.users);
        })
        .catch((error) => {
          console.log('chatlist_Error', error);
        })
    })
  }
  console.log(chatList)


  // 채팅방 주소를 넣어줌
  const handleChatChange = (roomId) => {
    setCurrentRoomId(roomId);
    setChat(!chat);
  }


  return (

    <div className={styles.friend_list}>
      <div style={{ width: '500px' }}>
        {chatList.map((chat, i) =>
          <div key={i} style={{ width: '195px' }}
          >
            <MediumProfile
              propsUser={{
                // nickname: chat.users[2],
                nickname: chat.roomName,
                email: '',
              }}
              onClick={() => {
                handleChatChange(chat.roomId);
              }}
            />
            <hr />
          </div>
        )}
        {/* {
          chat && */}
        {
          chat ?
            <div>
              <Chat currentRoomId={currentRoomId} chat={chat} />
            </div> :
            <div>

            </div>

        }
      </div>
    </div>
  );
}



