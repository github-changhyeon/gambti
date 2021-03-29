import fire from 'src/fire';

//유저 리스트 불러오기(친구로 바꾸는게?)
async function getUserList() {
    var docs = [];
    await fire.db.collection("users").get().then((list) => {
        list.forEach((doc) => {
            docs.push(doc.data());
        });
    }).catch((error) => {
        console.log("리스트 불러오기 실패 : ", error);
    });
    return docs;
}


// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
    return fire.auth().currentUser.photoURL || '/images/joystick.png';
}

// Returns the signed-in user's display name.
function getUserName() {
    return fire.auth().currentUser.displayName;
}

export {getUserList};