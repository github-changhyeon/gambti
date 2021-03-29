import React, { useContext } from 'react';
import {getUserList} from 'src/firebase/chat/chat';
import { useState, useEffect} from 'react';
export default function KiHyeonTest() {

    const [userList, setUserList] = useState(new Array());
    useEffect(() => {
        getUserList().then((list) => {
            setUserList(list);
        });
    },[getUserList]);
    return (  
        <div>
            <h1>기현의 test page</h1>
            {userList.map((user, i) =>
                <div key={i} >{user.email}</div>
            )}
        </div>
    );
}
