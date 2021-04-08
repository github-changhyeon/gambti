import axios from 'axios';
import fire from 'src/fire';
//친구 리스트 불러오기
async function getFriends() {
    var docs = [];
    await fire.db.collection("users").get().then((list) => {
        list.forEach((doc) => {
            docs.push(doc.data());
        });
    }).catch((error) => {
        console.log("리스트 불러오기 실패 : ", error);
    });
    // console.log(docs);
    return docs;
}
//내가 포함된 채팅방 받아오기
async function getChatRooms() {
    var docs = [];
    const uid = getUserUid();
    await fire.db.collection("users").doc(uid).get().then((list) => {
        docs = list.data().rooms;
    }).catch((error) => {
        console.log("리스트 불러오기 실패 : ", error);
    });
    return docs;
}
//1:1채팅방 만들기
// friendDisplayName : 유저 이름(displayName), friendUid : 유저 고유번호(uid)
async function makeOneOnOneChatRoom(friendUid) {
    if (friendUid == undefined || friendUid == null) return;
    const myUid = fire.auth.currentUser.uid;
    console.log('방만들자', friendUid);
    getChatRoomId(friendUid);
}

// Saves a new message to your Cloud Firestore database.
function sendMessage(roomsId, messageText) {
    console.log(roomsId, messageText);
    var timestamp = + new Date();
    return fire.db.collection('rooms').doc(roomsId).collection('messages').add({
        name: getUserName(),
        text: messageText,
        profilePicUrl: getProfilePicUrl(),
        timestamp: timestamp
    }).catch(function (error) {
        console.error('Error writing new message to database', error);
    });
}

//선택한 유저에 대한 채팅방 id 받기
function getChatRoomId(fUid) {
    //axios
    console.log('채틷id받자', fUid);
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
            friendUid: fUid,
        },
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios(options).then(response => console.log(response))
}
//목록 가지고 오기 OK
async function getRooms(myUid) {
    var rooms = [];
    await fire.db.collection('users').doc(myUid).get().then((list) => {
        rooms = list.data().rooms;
        console.log("방 목록 : " + rooms);
    })
    return rooms;
}
//단체 채팅방 만들기
async function makeGroupChatRoom(numberOfPeople) {

}

function readMessage(chatRoomId) {

    var docs = [];
    fire.db.collection('rooms').doc(chatRoomId).collection('messages').orderBy('timestamp')
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                var message = change.doc.data();
                console.log('message가자', message);
                docs.push(message);
            })
            console.log('docs', docs)
        })
    return docs;

}

function getProfilePicUrl() {
    return fire.auth.currentUser.photoURL || '/images/joystick.png';
}

function getUserName() {
    return fire.auth.currentUser.displayName;
}
function getUserUid() {
    return fire.auth.currentUser.uid;
}


export { getFriends, getChatRooms, makeOneOnOneChatRoom, makeGroupChatRoom, sendMessage, readMessage };