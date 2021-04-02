import React, { useEffect, useContext } from 'react';
import styles from './Chat.module.css';
import CloseButton from 'src/components/CloseButton/CloseButton';
import InputBase from "@material-ui/core/InputBase";
import MediumProfile from "src/components/MediumProfile/MediumProfile";
import SmallProfile from "src/components/SmallProfile/SmallProfile";
import NearMeIcon from '@material-ui/icons/NearMe';
import Message from './Message';
import axios from 'axios';
import fire from 'src/fire';
import Box from '@material-ui/core/Box';
import { getFriends, getChatRooms, makeOneOnOneChatRoom, makeGroupChatRoom, sendMessage, readMessage } from 'src/firebase/chat/chat';
import { UserContext } from 'src/Context/UserContext';



export default function Chat({ chat, propsUser }) {
  const [close, setClose] = React.useState(chat);
  const [chatRoomId, setChatRoomId] = React.useState('');

  const user = useContext(UserContext);


  const onClose = () => {
    setClose(false);
    // console.log('close', close);
  }

  useEffect(() => {
    setClose(chat);
    getChatRoomId(propsUser.uid);
    // console.log(close);
  }, [])
  // console.log(propsUser)

  async function getChatRoomId(friendUid) {
    //axios
    const token = localStorage.getItem("idToken");
    const options = {
      url: 'https://dev.gambti.com//v1/rooms/get',
      method: 'POST',
      Header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTP-8',
      },
      data: {
        maxNumber: 2,
        type: 'OneOnOne',
        friendUid: friendUid
      },
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios(options)
      .then((response) => {
        // console.log('getChatRoomId', response);
        setChatRoomId(response.data.data);
      })
      .catch(err => console.log(err))
  }

  const handleSendMessage = (chatRoomId, messageText) => {
    console.log('가자', chatRoomId, messageText);
    sendMessage(chatRoomId, messageText);
  }

  const sendMessage = (roomsId, messageText) => {
    // console.log(roomsId, messageText);
    var timestamp = + new Date();
    fire.db.collection('rooms').doc(roomsId).collection('messages').add({
      name: user.nickname,
      text: messageText,
      profilePicUrl: user.uid,
      timestamp: timestamp
    })
      .then(() => {

        console.log('가니...?')
      }
      )
      .catch(function (error) {
        console.error('Error writing new message to database', error);
      });
  }



  return (
    <div>
      {
        close ? (
          <div className={styles.chat}>
            <div className={styles.root}>
              <div className={styles.header}>
                <div className={styles.header_profile}>
                  <MediumProfile propsUser={{ nickname: propsUser.nickname, email: propsUser.email }} />
                </div>
                <div>
                  <CloseButton color="#cecece"
                    onClick={onClose}
                  />
                </div>
              </div>
              {/* Chat Message */}
              <Box className={styles.box}>
                <div className={styles.message}>
                  {chatRoomId ? <Message roomId={chatRoomId} /> : null}
                </div>
              </Box>
              {/* Input */}
              <div className={styles.input_position}>
                <div className={styles.input}>
                  <div
                    className={styles.search_icon}
                    onClick={(event) => {
                      if (chatRoomId && event.target.value) {
                        handleSendMessage(chatRoomId, event.target.value);
                      }
                    }}
                  >
                    <NearMeIcon />
                  </div>
                  <InputBase
                    className={styles.input_root}
                    placeholder="메시지를 입력하세요"
                    inputProps={{ "aria-label": "search" }}
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        console.log('hi', chatRoomId, event.target.value)
                        if (chatRoomId && event.target.value) {
                          handleSendMessage(chatRoomId, event.target.value);
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (<div>

        </div>)
      }

    </div>

  );
}