import React from 'react';
import styles from './ChatDrawer.module.css';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from "@material-ui/core/InputBase";
import MediumProfile from "src/components/MediumProfile/MediumProfile";
import Chat from './Chat';


export default function ChatDrawer({ showChat }) {

  const [chat, setChat] = React.useState(false);

  const handleChatChange = () => {
    console.log(chat);
    setChat(!chat);
  }

  return (
    <div>
      {
        showChat && (
          <div className={styles.root}>
            <List>
              <ListItem>
                <ListItemText className={styles.title}>
                  Chat
                </ListItemText>
                <ListItemText className={styles.title}>
                  Friends
                </ListItemText>
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
              <div>

                <ListItem onClick={handleChatChange}>
                  <MediumProfile propsUser={{ nickname: "김싸피", email: "ssafy@test.com" }} />
                </ListItem>
                <ListItem>
                  <MediumProfile propsUser={{ nickname: "김싸피", email: "ssafy@test.com" }} />
                </ListItem>
                <ListItem>
                  <MediumProfile propsUser={{ nickname: "김싸피", email: "ssafy@test.com" }} />
                </ListItem>
                <ListItem>
                  <MediumProfile propsUser={{ nickname: "김싸피", email: "ssafy@test.com" }} />
                </ListItem>
              </div>


            </List>
          </div>

        )
      }
      {/* Chat방 */}
      {
        chat &&
        <div className={styles.chat}>
          <Chat chat={chat} />
        </div>}
    </div >
  );
}
