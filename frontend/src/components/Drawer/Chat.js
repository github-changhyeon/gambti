import React from 'react';
import styles from './Chat.module.css';
import CloseButton from 'src/components/CloseButton/CloseButton';
import InputBase from "@material-ui/core/InputBase";
import MediumProfile from "src/components/MediumProfile/MediumProfile";
import SmallProfile from "src/components/SmallProfile/SmallProfile";
import NearMeIcon from '@material-ui/icons/NearMe';

export default function Chat({ chat }) {

  const onClose = () => {
    console.log('닫히기');
  }

  return (
    <div>
      {
        chat && (
          <div className={styles.root}>
            <div className={styles.header}>
              <MediumProfile propsUser={{ nickname: "김싸피", email: "ssafy@test.com" }} />
              <CloseButton className={styles.button} color="#cecece" onClick={onClose} />
            </div>
            <div className={styles.profile}>
              <SmallProfile></SmallProfile>
              <div className={styles.message}>
                hello
              </div>
            </div>
            {/* Input */}
            <div className={styles.input_position}>
              <div className={styles.input}>
                <div className={styles.search_icon}>
                  <NearMeIcon />
                </div>
                <InputBase
                  className={styles.input_root}
                  placeholder="메시지를 입력하세요"
                  inputProps={{ "aria-label": "search" }}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      console.log(event.target.value)
                    }
                  }}
                />


              </div>
            </div>
          </div>
        )
      }
    </div>

  );
}