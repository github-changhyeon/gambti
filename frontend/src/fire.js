import firebase from 'firebase'

const firebaseConfig = {
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
  firebase.initializeApp(firebaseConfig);
}
const analytics = firebase.analytics();
const db = firebase.firestore();
const auth = firebase.auth();

export default { analytics, db, auth };