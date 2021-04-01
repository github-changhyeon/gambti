import React from 'react';
import styles from './ChatDrawer.module.css';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from "@material-ui/core/InputBase";


export default function ChatDrawer({ showChat }) {


  return (
    <div>
      {
        showChat && (
          <div className={styles.root}>
            <List>
              <ListItem>
                <ListItemText>
                  Chat
                </ListItemText>
                <ListItemText>
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

            </List>
          </div>

        )
      }
    </div>
  );
}
