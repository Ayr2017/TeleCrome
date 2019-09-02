var textDiv;
var sendMsgBtn;


// function sendMessage(msg = " Пустое сообщение") {
//     console.log('sendMessage');
//     textDiv = document.querySelectorAll('.composer_rich_textarea')[0];
//     if (textDiv == undefined) {
//         setTimeout(() => {
//             sendMessage(msg);
//         }, 5000);
//     }

//     sendMsgBtn = document.querySelectorAll('[type="submit"]')[0];
//     textDiv.innerHTML = msg;
//     textDiv.focus();
//     sendEvent(sendMsgBtn);
// }

// function sendEvent(elem) {
//     let event = new Event('mousedown');
//     elem.dispatchEvent(event);
//     setTimeout(() => {
//         setAddressMap();
//     }, 1000);

// }