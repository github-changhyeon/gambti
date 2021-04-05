import React, { useEffect } from 'react';
import styles from './Nav.module.css';
import AvatarComp from 'src/components/AvatarComp/AvatarComp';
import SearchIcon from '@material-ui/icons/Search';
import { generatePath, useHistory } from 'react-router';
import ChatDrawer from '../Drawer/ChatDrawer';
import fire from 'src/fire.js';
import routerInfo from "src/constants/routerInfo";


export default function Nav() {
  const history = useHistory();

  const [atextvalue, setAtextvalue] = React.useState('메세지');
  const [isShownChat, setIsShownChat] = React.useState(false);
  const [isShownName, setIsShownName] = React.useState(false);
  const [isShownSearch, setIsShownSearch] = React.useState(false);
  const [joinGameList, setJoinGameList] = React.useState([]);
  const [showChat, setShowChat] = React.useState(false);
  // console.log(isShownChat);
  const joinGameRef = React.useRef();
  joinGameRef.current = joinGameList;

  const handleShowChatChange = () => {
    // console.log(showChat);
    setShowChat(!showChat);
  }
  useEffect(() => {
    return readJoinGame();
  }, []);

  const readJoinGame = () => {
    // message collection 변화값이 있는지 감시
    return fire.db.collection('users').doc(fire.auth.currentUser.uid).collection('joinGames').orderBy('timestamp')
      .onSnapshot((snapshot) => {
        // changes에 변화된 값만 넣어서 return
        const changes = snapshot.docChanges().map((change) => {
          return change.doc.data();
        });

        // 이거했을때 messageList=[]여서 값이 쌓여서 안보임
        // setMessageList([...messageList, ...changes]);

        // 기존의 messageList+ changes를 SetMessage에 넣어줌
        // ref는 항상 최신 값을 참조해서 메시지가 다보임
        setJoinGameList([...joinGameRef.current, ...changes]);

      })
  }

  const handleGameDetail = (gameId) => {
    console.log('ham', gameId)
    history.push({
      pathname: generatePath(routerInfo.PAGE_URLS.DETAIL, {
        gameId: gameId,
      }),
    });
  }


  return (
    <div className={styles.root}>
      <nav className={styles.container}>
        <div className={styles.section}>
          {/* 채팅 아이콘 */}
          <div
            className={styles.item}
            onMouseEnter={() => setIsShownChat(true)}
            onMouseLeave={() => setIsShownChat(false)}
            onClick={handleShowChatChange}
          >
            <AvatarComp size="medium" imgPath="/images/nav/chat.png"></AvatarComp>
            {isShownChat && <div className={styles.textarea}>Chat and Friends List</div>}
          </div>
         
          <hr className={styles.divider} />
          {/* Joined 게임 아이콘 */}
          <div>
            {joinGameList.map((joinGame, i) =>
            {
              
              return (
                
                <div key={i}
                className={styles.item}

                  onClick={() => {
                    handleGameDetail(joinGame.gameId)
                    }}
                >
                <AvatarComp size="medium"
                  imgPath={joinGame.imgPath}
                  >
                {atextvalue}
              </AvatarComp>
              {isShownName && <div className={styles.textarea}>Game Name</div>}
            </div>
              );
            }
              )}
          </div>
          
          {/* test */}
     
          {/* 검색 아이콘 */}
          <div
            className={styles.item}
            onMouseEnter={() => setIsShownSearch(true)}
            onMouseLeave={() => setIsShownSearch(false)}
          >
            <div className={styles.search}>
              <SearchIcon className={styles.searchIcon} />
              {isShownSearch && <div className={styles.textarea}>Search Game or User</div>}
            </div>
          </div>
        </div>
      </nav>
      {/* Drawer */}
      {
        showChat &&
        <div className={styles.chat}>
          <ChatDrawer showChat={showChat} />
        </div>}

    </div>
  );
}
