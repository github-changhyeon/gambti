import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCNng46CAdkVhYoTqtm4Dexb2AlTVCAIUA",
  authDomain: "gambti-9002f.firebaseapp.com",
  databaseURL: "https://gambti-9002f-default-rtdb.firebaseio.com",
  projectId: "gambti-9002f",
  storageBucket: "gambti-9002f.appspot.com",
  messagingSenderId: "1002867083304",
  appId: "1:1002867083304:web:ece770caa3777db8100d1d",
  measurementId: "G-NDB0JQ2WVF"
};
// Initialize Firebase
if (!firebase.apps.length) {
  var fire = firebase.initializeApp(firebaseConfig);
  // firebase.initializeApp(firebaseConfig);
  // firebase.analytics();
}
export default fire;