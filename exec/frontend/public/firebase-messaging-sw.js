//FCM 서비스 워커
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.0/firebase-messaging.js');

firebase.initializeApp({
    projectId: "gambti-9002f",
    apiKey: "AIzaSyCNng46CAdkVhYoTqtm4Dexb2AlTVCAIUA",
    appId: "1:1002867083304:web:ece770caa3777db8100d1d",
    messagingSenderId: "1002867083304"
});

const messaging = firebase.messaging();