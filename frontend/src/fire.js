import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCNng46CAdkVhYoTqtm4Dexb2AlTVCAIUA",
  authDomain: "gambti-9002f.firebaseapp.com",
  databaseURL: "https://gambti-9002f-default-rtdb.firebaseio.com",
  projectId: "gambti-9002f",
  storageBucket: "gambti-9002f.appspot.com",
  messagingSenderId: "1002867083304",
  appId: "1:1002867083304:web:ece770caa3777db8100d1d",
  measurementId: "G-NDB0JQ2WVF",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  var permission = Notification.permission;
  if (permission != "denied") {
    registServiceWorker();
  }
}
function registServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        const message = firebase.messaging();
        message
          .requestPermission()
          .then(function () {
            return message.getToken();
          })
          .then(async function (token) {
            //여기서 FCM 토큰을 확인할 수 있다.
          });
      });
    const token = firebase.messaging().getToken();
  }
}
const messaging = firebase.messaging();
const analytics = firebase.analytics();
const db = firebase.firestore();
const auth = firebase.auth();
const performance = firebase.performance();

export default { analytics, db, auth, performance, messaging };
