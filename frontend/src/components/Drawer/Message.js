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
    // console.log('messageList', messageList);
  }, []);


  var docs = [];
  const readMessage = (chatRoomId) => {
    fire.db.collection('rooms').doc(chatRoomId).collection('messages').orderBy('timestamp')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          var message = change.doc.data();
          console.log('message가자', message);
          docs.push(message);
        })
        setMessageList(docs);
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