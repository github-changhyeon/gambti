import React, { useEffect } from 'react';
import styles from './Message.module.css';
import axios from 'axios';
import fire from 'src/fire';
import SmallProfile from "src/components/SmallProfile/SmallProfile";
import Typo from "src/components/Typo/Typo";
// import { getFriends, getChatRooms, makeOneOnOneChatRoom, makeGroupChatRoom, sendMessage, readMessage } from 'src/firebase/chat/chat';


export default function Message({ roomId }) {

  const [messageList, setMessageList] = React.useState(new Array());

  useEffect(() => {
    readMessage(roomId);
  }, []);



  const readMessage = (chatRoomId) => {
    var docs = [];
    fire.db.collection('rooms').doc(chatRoomId).collection('messages').orderBy('timestamp')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.doc.data()) {
            docs.push(change.doc.data());
            console.log('되는거ㅑㅇ?')
          } else {
            console.log('변화 zero');
          }
        })
        setMessageList(docs);
        console.log('들어갓어?', messageList)
      })
  }

  return (
    <div className={styles.root}>
      <div>
        {messageList.map((message, i) =>
          <div key={i} >
            <SmallProfile name={message.name}></SmallProfile>
            <Typo text={message.text} ></Typo>
          </div>
        )}

      </div>

    </div >
  );
}