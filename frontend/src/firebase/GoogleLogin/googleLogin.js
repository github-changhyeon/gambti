import firebase from firebase;
// Signs-in Friendly Chat.

function signIn() {
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}
  
// Signs-out of Friendly Chat.
function signOut() {
    // Sign out of Firebase.
    firebase.auth().signOut();
  }