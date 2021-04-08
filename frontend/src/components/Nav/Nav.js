import React, { useEffect, useContext } from 'react';
import styles from './Nav.module.css';
import AvatarComp from 'src/components/AvatarComp/AvatarComp';
import SearchIcon from '@material-ui/icons/Search';
import { generatePath, useHistory } from 'react-router';
import ChatDrawer from '../Drawer/ChatDrawer';
import fire from 'src/fire.js';
import routerInfo from 'src/constants/routerInfo';
import { ChatContext } from 'src/Context/ChatContext';

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
  const chatStore = useContext(ChatContext);

  joinGameRef.current = joinGameList;

  const handleShowChatChange = () => {
    // console.log(showChat);
    // setShowChat(!showChat);
    chatStore.dispatch({
      type: 'clickMatchBtn',
      drawer: !showChat,
      chat: false,
      roomId: null,
    });
  };
  useEffect(() => {
    setJoinGameList([]);
    return readJoinGame();
  }, []);

  useEffect(() => {
    if (chatStore.state.isDrawerOpen) {
      setShowChat(true);
    } else {
      setShowChat(false);
    }
  }, [chatStore.state.isDrawerOpen]);

  const readJoinGame = () => {
    // message collection 변화값이 있는지 감시
    fire.db
      .collection('users')
      .doc(fire.auth.currentUser.uid)
      .collection('joinGames')
      .orderBy('timestamp')
      .onSnapshot((snapshot) => {
        // changes에 변화된 값만 넣어서 return
        let isRemoved = false;
        const changes = snapshot.docChanges().map((change) => {
          if (change.type === 'removed') {
            console.log(change.doc.id);
            // alert(joinGameList.length)
            // joinGameList.forEach((item, i) => { console.log("아이디", item.gameId) });
            isRemoved = true;
            console.log('줄이기 전에 배열', joinGameList);
            console.log('줄이기 전에 배열', joinGameRef.current);
            console.log(
              '다르면 새로 배열 만들어라',
              joinGameRef.current.filter((item, i) => item.gameId != change.doc.id)
            );
            return joinGameRef.current.filter((item, i) => item.gameId != change.doc.id);
          }
          if (change.type === 'added') {
            return change.doc.data();
          }
        });

        // 이거했을때 messageList=[]여서 값이 쌓여서 안보임
        // setMessageList([...messageList, ...changes]);

        // 기존의 messageList+ changes를 SetMessage에 넣어줌
        // ref는 항상 최신 값을 참조해서 메시지가 다보임

        if (isRemoved) {
          console.log('배열', changes);
          setJoinGameList(...changes);
        } else {
          setJoinGameList([...joinGameRef.current, ...changes]);
        }
      });
  };

  const handleGameDetail = (gameId) => {
    console.log('ham', gameId);
    history.push({
      pathname: generatePath(routerInfo.PAGE_URLS.DETAIL, {
        gameId: gameId,
      }),
    });
  };

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
            {joinGameList.map((joinGame, i) => {
              return (
                <div
                  key={i}
                  className={styles.item}
                  onClick={() => {
                    handleGameDetail(joinGame.gameId);
                  }}
                >
                  <AvatarComp size="medium" imgPath={joinGame.imgPath}>
                    {atextvalue}
                  </AvatarComp>
                  {isShownName && <div className={styles.textarea}>Game Name</div>}
                </div>
              );
            })}
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
      {showChat && (
        <div className={styles.chat}>
          <ChatDrawer showChat={showChat} />
        </div>
      )}
    </div>
  );
}
