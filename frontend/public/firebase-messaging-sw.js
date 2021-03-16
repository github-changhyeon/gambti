//FCM 서비스 워커
importScripts('https://www.gstatic.com/firebasejs/5.9.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.2/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: "1002867083304"
});

const messaging = firebase.messaging();
  
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: 'favicon.ico'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
  

