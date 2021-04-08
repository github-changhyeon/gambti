import React, { useEffect, useContext } from 'react';
import styles from './NotiList.module.css';
import { UserContext } from 'src/Context/UserContext';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import fire from 'src/fire';
import { useHistory, generatePath } from "react-router";
import routerInfo from "src/constants/routerInfo";
import firebase from 'firebase';
import Moment from 'react-moment';
import MoodBadIcon from '@material-ui/icons/MoodBad';




export default function NotiList() {
  const history = useHistory();

  const user = useContext(UserContext);
  const [notiList, setNotiList] = React.useState([]);
  const notiRef = React.useRef();
  notiRef.current = notiList;

  useEffect(() => {
    setNotiList([]);
    return ReadNoti(user.uid);
  }, [])

  const docs = fire.db.collection('users').doc(user.uid).collection('notifications').where('type', '==', 'friend').where('isRead', '==', false);


  // 노티 읽어줌
  const ReadNoti = (userId) => {
    // .where('type', '==', 'friend');
    return docs.onSnapshot((snapshot) => {
      const changes = snapshot.docChanges().map((change) => {
        console.log('change.type', change.type)
        return change.doc.data();
      });
      setNotiList([...notiRef.current, ...changes]);
    })

  }

  // 클릭시 프로필 페이지로
  const gotoFriend = (senderUid) => {
    history.push({
      pathname: generatePath(routerInfo.PAGE_URLS.PROFILE, {
        uid: senderUid,
      }),
    });
  }

  // firestore timeStamp 변환
  function toDate(timestamp) {
    if (!timestamp) return null;
    const seconds = timestamp.seconds;
    const nanoseconds = timestamp.nanoseconds;
    return new firebase.firestore.Timestamp(seconds, nanoseconds).toDate();
  }
  console.log(notiList.length)


  return (
    <div className={styles.root}>
      {
        notiList.length === 0 ?
          <div className={styles.no_noti}>
            <div >
              <MoodBadIcon className={styles.sad_icon} />
            </div>
            <div style={{ marginTop: '1rem' }}>
              새로운 알람이 없습니다.
            </div>
          </div> :
          <div>
            {
              notiList.map((noti) => {
                const time = toDate(noti.timeStamp);

                return (

                  <div className={styles.shopping_cart_items} onClick={() => { gotoFriend(noti.senderUid) }}>
                    {/* <Moment className={styles.cart_date} format="MM월 DD일, YYYY">{time}</Moment> */}
                    <div className={styles.cart_item}>
                      <div className={styles.cart_item_header}> {noti.message}</div>
                      <Moment className={styles.cart_item_date} format="MM.DD HH:mm">{time}</Moment>
                    </div >
                  </div >
                );
              })
            }
          </div>
      }
    </div >
  );
}