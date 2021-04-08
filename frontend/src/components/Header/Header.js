import React, { useContext, useEffect } from "react";
import styles from "./Header.module.css";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AvatarComp from "src/components/AvatarComp/AvatarComp";
import { useHistory, generatePath } from "react-router";
import routerInfo from "src/constants/routerInfo";
import Button from "@material-ui/core/Button";
import fire from "src/fire";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FaceIcon from "@material-ui/icons/Face";
import { UserContext } from "src/Context/UserContext";
import { event } from "jquery";
import Box from "@material-ui/core/Box";
import ButtonComp from "src/components/ButtonComp/ButtonComp";
import firebase from "firebase";
import Moment from "react-moment";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import Badge from "@material-ui/core/Badge";
import Typography from "@material-ui/core/Typography";


export default function Header({ isLogin }) {
  const history = useHistory();
  const user = useContext(UserContext);
  const [isShownNoti, setIsShownNoti] = React.useState(false);
  const [isNoti, setIsNoti] = React.useState(false);
  const [notiCount, setNotiCount] = React.useState(0);
  const [searchWord, setSearchWord] = React.useState("");

  // 로그아웃
  const logout = (event) => {
    fire.auth
      .signOut()
      .then(() => {
        history.push("/");
        window.localStorage.clear();
        alert("로그아웃 되었습니다 !!");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const goProfile = (event) => {
    history.push({
      pathname: generatePath(routerInfo.PAGE_URLS.PROFILE, {
        uid: user.uid,
      }),
    });
  };

  const inputChangeFunc = (event) => {
    setSearchWord(event.target.value);
  };

  //Noti
  const [notiList, setNotiList] = React.useState([]);
  const notiRef = React.useRef();
  notiRef.current = notiList;

  useEffect(() => {
    setNotiList([]);
    return ReadNoti(user.uid);
  }, []);

  const docs = fire.db
    .collection("users")
    .doc(user.uid)
    .collection("notifications")
    .where("isRead", "==", false);

  // 노티 읽어줌
  const ReadNoti = (userId) => {
    // .where('type', '==', 'friend');
    docs.onSnapshot((snapshot) => {
      let isRemoved = false;
      const changes = snapshot.docChanges().map((change) => {
        if (change.type === "removed") {
          isRemoved = true;
          return notiRef.current.filter((item, i) => item.id != change.doc.id);
        }
        return change.doc;
      });

      // TODO: modified된 값 리스트에서 지워줘야함
      if (isRemoved) {
        setNotiList(...changes);
      } else {
        setNotiList([...notiRef.current, ...changes]);
      }
    });
  };

  // 클릭시 프로필 페이지로
  const gotoFriend = (noti) => {
    history.push({
      pathname: generatePath(routerInfo.PAGE_URLS.PROFILE, {
        uid: noti.data().senderUid,
      }),
    });
    setIsNoti(false);
    fire.db
      .collection("users")
      .doc(user.uid)
      .collection("notifications")
      .doc(noti.id)
      .update({
        isRead: true,
      });
  };

  // firestore timeStamp 변환
  function toDate(timestamp) {
    if (!timestamp) return null;
    const seconds = timestamp.seconds;
    const nanoseconds = timestamp.nanoseconds;
    return new firebase.firestore.Timestamp(seconds, nanoseconds).toDate();
  }

  // close 하면 삭제
  const handleClearNoti = () => {
    setIsNoti(false);
    notiList.map((noti) => {
      fire.db
        .collection("users")
        .doc(user.uid)
        .collection("notifications")
        .doc(noti.id)
        .delete();
    });
    return setNotiList([]);
  };



  return (
    <div className={styles.header}>
      <div className={styles.header_left}>
        <div
          className={styles.header_logo}
          onClick={() => {
            history.push(routerInfo.PAGE_URLS.HOME);
          }}
        >
          <img
            className={styles.header_logo_icon}
            src="/images/gambti/gambti_icon.png"
            alt="icon"
          />
          <img
            className={styles.header_logo_text}
            src="/images/gambti/gambti_logo.png"
            alt="logo"
          />
        </div>
      </div>
      <div className={styles.header_center}>
        <div className={styles.search_icon}>
          <SearchIcon />
        </div>
        <InputBase
          className={styles.input_root}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={searchWord}
          onChange={(event) => {
            inputChangeFunc(event);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              let temp = searchWord;
              if (
                (temp.trim() === undefined ||
                  temp.trim() === null ||
                  temp.trim()) === ""
              ) {
                alert("검색어를 입력해주세요");
                return;
              }
              setSearchWord(""); // 검색 후 searchWord 초기화
              history.push({
                pathname: generatePath(routerInfo.PAGE_URLS.SEARCH, {}),
                search: `?word=${temp}`,
              });
            }
          }}
        />
      </div>

      <div className={styles.header_right}>
        {/* 로그아웃 상태 */}
        {!isLogin && (
          <>
            {/* 로그인 버튼 */}
            <div
              className={styles.header_right_item}
              style={{ height: "54px", width: "65px" }}
              onClick={() => {
                history.push(routerInfo.PAGE_URLS.LOGIN);
              }}
            >
              <div className={styles.header_right_account_button}>Login</div>
            </div>
            {/* 회원가입 버튼 */}
            <div
              className={styles.header_right_item}
              style={{ height: "54px", width: "65px" }}
              onClick={() => {
                history.push(routerInfo.PAGE_URLS.CHECK_GAMBTI);
              }}
            >
              <div className={styles.header_right_account_button}>Sign Up</div>
            </div>
          </>
        )}
        {/* 로그인 상태 */}
        {isLogin && (
          <>
            {/* 알림 버튼 */}
            <div
              className={styles.header_right_item}
              onMouseEnter={() => setIsShownNoti(true)}
              onMouseLeave={() => setIsShownNoti(false)}
              onClick={() => {
                setNotiCount(0);
                setIsNoti(!isNoti);
              }}
            >
              <Badge badgeContent={notiList.length} color="primary">
                <NotificationsIcon
                  className={styles.header_right_icon}
                  style={{ color: "#d1d1d1" }}
                />
              </Badge>

              {isShownNoti && !isNoti && (
                <div className={styles.textarea}>Notifications</div>
              )}
            </div>
            {isNoti && (
              <div className={styles.noti}>
                <Box className={styles.paper}>
                  <Typography className={styles.title}>Notifications</Typography>
                  <div className={styles.noti_list}>
                    {/* <NotiList /> */}
                    <div className={styles.root}>
                      {notiList.length === 0 ? (
                        <div className={styles.no_noti}>
                          <div className={styles.eyes}>
                            <div className={styles.eye}></div>
                            <div className={styles.eye}></div>
                          </div>
                          <div className={styles.sad}></div>
                          <div
                            style={{ fontFamily: "DungGeunMo", zIndex: "500" }}
                          >
                            새로운 알람이 없습니다.
                          </div>
                        </div>
                      ) : (
                        <div>
                          {notiList.map((noti, i) => {
                            const time = toDate(noti.data().timeStamp);

                            return (
                              <div
                                key={i}
                                className={styles.shopping_cart_items}
                                onClick={() => {
                                  gotoFriend(noti);
                                }}
                              >
                                {/* <Moment className={styles.cart_date} format="MM월 DD일, YYYY">{time}</Moment> */}
                                <div className={styles.cart_item}>
                                  <div className={styles.cart_item_header}>
                                    <Typography noWrap={true} className={styles.nick}>
                                      {noti.data().message}
                                    </Typography>
                                  </div>
                                  <Moment
                                    className={styles.cart_item_date}
                                    format="MM.DD HH:mm"
                                  >
                                    {time}
                                  </Moment>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.button}>
                    <ButtonComp
                      textvalue="Clear"
                      size="noti"
                      color="#ccff00"
                      onClick={handleClearNoti}
                    />
                  </div>
                </Box>
              </div>
            )}
            {/* 프로필 버튼 */}
            <div className={styles.header_right_item}>
              <div className={styles.dropdown}>
                <AvatarComp
                  className={styles.dropbtn}
                  size="xsmall"
                  // textvalue={user.nickname}
                  // textvalue={user.nickname.substring(0, 1)}
                  imgPath={user.imgPath}
                ></AvatarComp>
                <div className={styles.dropdown_content}>
                  <div className={styles.dropdown_menu} onClick={goProfile}>
                    <p>
                      <FaceIcon />
                    </p>
                    <p>Profile</p>
                  </div>
                  <div onClick={logout} className={styles.dropdown_menu}>
                    <p>
                      <ExitToAppIcon />
                    </p>
                    <p>Logout</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
