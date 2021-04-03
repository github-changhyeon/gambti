import React from 'react';
import styles from './ChatDrawer.module.css';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from "@material-ui/core/InputBase";
import FriendList from './FriendList';
import ChatList from './ChatList';
import fire from 'src/fire';
import Button from "@material-ui/core/Button";



export default function ChatDrawer({ showChat }) {

  // const [chat, setChat] = React.useState(false);
  // const currentUser = fire.auth.currentUser;
  // console.log(currentUser);

  // const handleChatChange = () => {
  //   console.log(chat);
  //   setChat(!chat);
  // }
  const [draw, setDraw] = React.useState(true);

  return (
    <div>
      {
        showChat && (
          <div className={styles.root}>
            <List>
              <ListItem>
                <Button
                  className={
                    draw ? styles.main_title : styles.title
                  }
                  onClick={() => {
                    setDraw(true);
                  }}
                >
                  Chat
                </Button>
                <Button
                  className={
                    draw ? styles.title : styles.main_title
                  }
                  onClick={() => {
                    setDraw(false);
                  }}>
                  Friends
                </Button>
              </ListItem>
              <ListItem>
                <div className={styles.header_center}>
                  <InputBase
                    className={styles.input_root}
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        console.log(event.target.value)
                      }
                    }}
                  />
                </div>
              </ListItem>
              <div className={styles.chat_friend}>
                <ListItem>
                  <div>
                    {
                      draw ?
                        <ChatList showChat={showChat} /> :
                        <FriendList showChat={showChat} />
                    }
                  </div>
                </ListItem>

              </div>


            </List>
          </div>

        )
      }

    </div >
  );
}
