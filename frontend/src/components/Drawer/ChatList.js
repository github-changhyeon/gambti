import React, { useState, useContext, useEffect } from 'react';
import styles from './ChatList.module.css';
import { getFriends, getChatRooms, makeOneOnOneChatRoom, makeGroupChatRoom, sendMessage, readMessage } from 'src/firebase/chat/chat';
import MediumProfile from 'src/components/MediumProfile/MediumProfile';
import Chat from './Chat';
import { UserContext } from 'src/Context/UserContext';
import fire from 'src/fire';
import PlacesRoomService from 'material-ui/svg-icons/places/room-service';




export default function ChatList({ showChat }) {

  const [chat, setChat] = React.useState(!showChat);
  const [currentRoomId, setCurrentRoomId] = React.useState('');
  const [currentRoomName, setCurrentRoomName] = React.useState('');

  const [youId, setYouId] = React.useState('');
  const [you, setYou] = React.useState('');

  const [chatList, setChatList] = React.useState([]);
  const chatRef = React.useRef();
  chatRef.current = chatList;

  const user = useContext(UserContext);
  const roomId = user.rooms;
  // console.log(roomId);


  useEffect(() => {
    ReadChats(roomId);
    // console.log('mount');
  }, []);

  const ReadChats = async (roomIds) => {
    // map을 햇을경우 promise 약속값이 가지고 잇음
    const roomInfosPromise = roomIds.map((roomId) => {
      return fire.db.collection("rooms").doc(roomId).get().then(doc => {
        return doc.data();
      });
    });
    // map 끝낫을 경우 Promise.all로 약속값 -> 결과값을 바꿔줌
    const roomInfos = (await Promise.all(roomInfosPromise)).filter(roomInfo => roomInfo !== undefined);


    const extendedRoomInfosPromise = roomInfos.map((roomInfo) => {
      // ?.는 roomInfo가 잇을때만 참조, undefined면 안참조
      if (!roomInfo?.users)
        return undefined;
      const otherUser = roomInfo.users[1] !== user.uid ? roomInfo.users[1] : roomInfo.users[2];
      return fire.db.collection("users").doc(otherUser).get().then((doc) => {
        return { ...roomInfo, otherUser: doc.data() };
      });
    });

    const extendedRoomInfos = await Promise.all(extendedRoomInfosPromise);
    setChatList(extendedRoomInfos);
  }



  // 채팅방 주소를 넣어줌
  const handleChatChange = (room) => {
    setCurrentRoomId(room.roomId);
    setChat(!chat);
    // 1:1 채팅이면 상대방의 uid 넣어줌
    if (room.type === 'OneOnOne') {
      if (room.users[1] === user.uid) {
      } else {
        setYouId(room.users[1]);
        return
      }
      if (room.users[2] === user.uid) {
      } else {
        setYouId(room.users[2]);
        return
      }
    }
    // 1:N 채팅이면 방이름 넣어줌
    else {
      setCurrentRoomName(room.roomName);
    }
  }





  return (

    <div className={styles.friend_list}>
      <div style={{ width: '500px' }}>
        {chatList.map((room, i) =>
          <div key={i} style={{ width: '195px' }}
          >
            <MediumProfile
              propsUser={{
                nickname: room.otherUser.nickname,
                email: room.otherUser.email,
              }}
              onClick={() => {
                handleChatChange(room);
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
              {
                youId ?
                  <Chat youId={youId} currentRoomId={currentRoomId} chat={chat} />
                  :
                  <Chat currentRoomId={currentRoomId} chat={chat} currentRoomName={currentRoomName} />
              }
            </div> :
            <div>

            </div>

        }
      </div>
    </div>
  );
}



