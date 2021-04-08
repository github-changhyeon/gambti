import React, { useEffect } from 'react';
import styles from './Message.module.css';
import axios from 'axios';
import fire from 'src/fire';
import SmallProfile from "src/components/SmallProfile/SmallProfile";
import Typo from "src/components/Typo/Typo";
// import { getFriends, getChatRooms, makeOneOnOneChatRoom, makeGroupChatRoom, sendMessage, readMessage } from 'src/firebase/chat/chat';
import firebase from 'firebase';

export default function Message({ roomId }) {

  const [messageList, setMessageList] = React.useState([]);
  // messageList Reference 생성
  const messageRef = React.useRef();
  const messageEndRef = React.useRef();
  // Ref가 참조하는값을 messageList로 설정 => 쓰는 이유 scope 때문에 (민주피셜)
  messageRef.current = messageList;

  useEffect(() => {
    return readMessage(roomId);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messageList])

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }


  const readMessage = (chatRoomId) => {
    // message collection 변화값이 있는지 감시
    return fire.db.collection('rooms').doc(chatRoomId).collection('messages').orderBy('timestamp')
      .onSnapshot((snapshot) => {
        // changes에 변화된 값만 넣어서 return
        const changes = snapshot.docChanges().map((change) => {
          return change.doc.data();
        });

        // 이거했을때 messageList=[]여서 값이 쌓여서 안보임
        // setMessageList([...messageList, ...changes]);

        // 기존의 messageList+ changes를 SetMessage에 넣어줌
        // ref는 항상 최신 값을 참조해서 메시지가 다보임
        setMessageList([...messageRef.current, ...changes]);

      })
  }


  return (
    <div className={styles.root}>
      <div>
        {messageList.map((message, i) =>
          <div key={i} >
            <SmallProfile name={message.name} imgPath={message.profilePicUrl} ></SmallProfile>
            <Typo text={message.text} ></Typo>
          </div>
        )}
        <div ref={messageEndRef} />

      </div>

    </div >
  );
}