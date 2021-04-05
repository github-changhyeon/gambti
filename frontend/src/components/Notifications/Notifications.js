import React, { useEffect, useContext } from 'react';
import styles from './Notifications.module.css';
import { UserContext } from 'src/Context/UserContext';
import Box from '@material-ui/core/Box';
import NotiList from './NotiList';
import ButtonComp from 'src/components/ButtonComp/ButtonComp';

export default function Notifications({ isNoti }) {

  const [isNotiState, setIsNotiState] = React.useState('')

  useEffect(() => {
    setIsNotiState(isNoti);
  }, [isNoti])

  return (
    <div >
      {
        isNotiState && (
          <div >
            <Box className={styles.paper}>
              <div className={styles.title}>
                Notifications
              </div>
              <div className={styles.noti}>
                <NotiList />
              </div>
              <div className={styles.button}>
                <ButtonComp textvalue="Close" size="noti" color="#ccff00" onClick={() => setIsNotiState(false)} />
              </div>
            </Box>
          </div>
        )
      }
    </div >
  );
}



// var noti = document.getElementById('notification');
// var bell = document.getElementById('bell');
// var header = document.getElementById("header");
// var header = document.getElementById("wizard");



// function myFunction() {
//     document.getElementById("notification").style.visibility = "visible";
//     document.getElementById("header").style.opacity = .3;
//     document.getElementById("wizard").style.opacity = .3;
// }

// function closeMe() {
//     noti.style.visibility = "hidden";
//     header.style.opacity = 1;
//     wizard.style.opacity = 1;
// }

// (function () {
//   var notificationsWrapper = document.getElementById('notifications-wrapper'),
//       notificationButton = document.getElementById('notification-trigger');

//   notificationButton.addEventListener('click', generateNotification);

//   // Close Notififcation
//   function closeNotification(notification) {
//     var itemCount = notificationsWrapper.childElementCount,
//         currentItemId = notification.getAttribute('id').split('-')[1],
//         nextItem = document.getElementById('item-' + parseInt(currentItemId + 1, 10)),
//         removalHeight = notification.offsetHeight;

//   notification.setAttribute('data-state', 'fadeout');
//     notification.addEventListener('animationend', function() {   

//       notification.setAttribute('data-state', 'slideup');  
//       this.addEventListener('animationend', function() {
//         this.remove();
//       });
//     });
//   }

//   // Generate Notification
//   function generateNotification() {
//     $cart.style.visibility = "hidden";
//       $line.style.borderBottom = "3px solid white";
//     var listItemFragment = document.createDocumentFragment(),
//         listItem = document.createElement('li'),
//         closeButton = document.createElement('a'),
//         closeButtonX = document.createElement('span'),
//         closeButtonText = document.createElement('span'),
//         title = document.createElement('h5'),
//         message = document.createElement('p'),
//         notificationCount = 0;

//     closeButton.setAttribute('class', 'close');
//     closeButtonX.setAttribute('aria-hidden', true);
//     closeButtonX.textContent = 'X';
//     closeButtonText.setAttribute('class', 'screen-reader-text');
//     closeButtonText.textContent = 'close notification';

//     title.textContent = 'This is a Test Notification';
//     message.textContent = '10/09/2018 :: 3:13pm';

//     listItem.setAttribute('id', 'item-'+ notificationsWrapper.childElementCount);
//     listItem.setAttribute('class', 'notification--item');
//     listItem.setAttribute('role', 'alert');

//     closeButton.appendChild(closeButtonX);
//     closeButton.appendChild(closeButtonText);
//     listItem.appendChild(closeButton);
//     listItem.appendChild(title);
//     listItem.appendChild(message);

//     // Append to doc frag(s)
//     listItemFragment.appendChild(listItem);
//     notificationsWrapper.appendChild(listItemFragment);

//     //$(".notification--item").delay(7000).fadeOut(500);


//     //setTimeout(function() { closeNotification(this, this.parentNode); }, 8000);
//     // Add Events
//     closeButton.addEventListener('click', function() {
//       closeNotification.call(this, this.parentNode);
//     });


//   }
// })();


// // Bell animation from yours truly -- Landon
// const $button = document.getElementById('notification-trigger');
// const $bell = document.getElementById('notification');
// const $cart = document.getElementById('cart');
// const $line = document.getElementById('line');

// $button.addEventListener("click", function(event){
//   const count = Number($bell.getAttribute('data-count')) || 2;

//   $bell.setAttribute('data-count', count + 1);
//   $bell.classList.add('show-count');
//   $bell.classList.add('notify');
// });

// $bell.addEventListener("animationend", function(event){
//   $bell.classList.remove('notify');
// });

// setTimeout(function() {
//    const count = Number($bell.getAttribute('data-count')) || 2;

//   $bell.classList.add('show-count');
//   $bell.classList.add('notify');
// }, 1000);


// window.onload = function() {
//    const count = Number($bell.getAttribute('data-count')) || 1;
//   $bell.setAttribute('data-count', count + 1);
//   $bell.classList.add('show-count');
//  // $cart.style.visibility = "hidden";
// };


// //Notification Tray
// (function(){

//   $("#notification").on("click", function() {
//     if($('.shopping-cart').is(':visible')){
//       $(".shopping-cart").fadeToggle( "fast");
//       $cart.style.visibility = "hidden";
//       $line.style.borderBottom = "3px solid white";
//     }
//     else if($('.shopping-cart').is(':hidden')){
//       $(".shopping-cart").fadeToggle( "fast");
//       $cart.style.visibility = "visible";
//       $line.style.borderBottom = "3px solid #729ef9";
//     }



//   });



// })();


// (function(){

//   $("#close").on("click", function() {
//     if($('.shopping-cart').is(':visible')){
//       $(".shopping-cart").fadeToggle( "fast");
//       $cart.style.visibility = "hidden";
//       $line.style.borderBottom = "3px solid white";
//     }
//     else if($('.shopping-cart').is(':hidden')){
//       $(".shopping-cart").fadeToggle( "fast");
//       $cart.style.visibility = "visible";
//       $line.style.borderBottom = "3px solid lightGreen";
//     }

//   });


// })();