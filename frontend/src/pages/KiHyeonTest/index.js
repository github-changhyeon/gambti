import React, { useContext } from 'react';
import {getFriends, getChatRooms, makeOneOnOneChatRoom, makeGroupChatRoom, sendMessage, readMessage} from 'src/firebase/chat/chat';
import { useState, useEffect} from 'react';
export default function KiHyeonTest() {
    
    const [message, setMessage] = React.useState('');
    const handleMessageChange = (event) => {
        setMessage(event.currentTarget.value);
    };
    const [roomId, setRoomId] = React.useState('');

    const [friendList, setFriendList] = useState(new Array());
    useEffect(() => {
        getFriends().then((list) => {
            setFriendList(list);
        });
    }, [getFriends]);

    const [messageList, setMessageList] = useState(new Array());
    useEffect(() => {
        readMessage().then((list) => {
            setMessageList(list);
        });
    }, [setMessageList]);

    const[roomList, setRoomList] = useState(new Array());
    useEffect(() => {
        getChatRooms().then((list) => {
            setRoomList(list);
        });

    }, [setRoomList]);

    // 1:1 채팅 방
    const makeOOOchatRoom = (fuid) => {
        console.log("1:1 챗방 : " + fuid);
        makeOneOnOneChatRoom(fuid);
    }

    // 그룹 채팅 방
    const mkaeGChatRoom = (num) => {
        console.log(num + '명 그룹 챗방');
        makeGroupChatRoom(num);
    }
    //메세지 보내기
    const send = () => {
        sendMessage('7828988b-4f84-43cb-8d40-5be712c53ffa', 'ggggggg');
    }
    //메세지 읽기
    //TODO : 민주 화이팅!
    const read = (chatRoomId) => {
        console.log(chatRoomId);
        setRoomId(chatRoomId);
        readMessage('7828988b-4f84-43cb-8d40-5be712c53ffa');
    }

    
    
    return (  
        <div>
             <div style={{margin: '40px'}}>
                <h1>유저 목록</h1>
                <div style={{width: '500px' }}>
                    {friendList.map((user, i) =>
                        <div key={i} >
                        {user.email} 
                        <button onClick={()=>makeOOOchatRoom(user.uid)}>1:1 대화 하기</button>
                        </div>
                    )}
                </div>
            </div>
            <div style={{margin: '40px'}}>
            <h1>채팅 방 만들기</h1>
                <div style={{width: '500px' }}>
                    <input placeholder='무조건 4명임..ㅎ 수 입력'></input>
                    <button onClick={()=>makeGroupChatRoom(4)}>만들기</button>
                </div>
            </div>

            <div style={{ margin: '40px' }}>
                <h1>내가 포함된 채팅방 목록(클릭하면 방 바뀜)</h1>
                <div style={{ border: '1px solid grey', width: '500px' }}>
                    {roomList.map((room, i) =>
                        <div key={i} >
                        {room} 
                            <button onClick={() => read({room})}>←클릭</button>
                        </div>
                    )}
                  
                </div>
            </div>
            <div style={{ margin: '40px' }}>
                <h1>선택한 채팅방</h1>
                <div style={{ border: '1px solid grey', height: '100px', width:'500px' }}>
                {messageList.map((message, i) =>
                        <div key={i} >
                        {message.test} 
                        </div>
                    )}
                </div>
                <input
                    style={{ width: '450px' }} id="message" type="text" onChange={handleMessageChange} />
                <button onClick={() => {send()}}>전송</button>
            </div>
        </div>
        
    );
}
