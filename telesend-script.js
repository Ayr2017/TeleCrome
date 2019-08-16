var textDiv;
var sendMsgBtn;
console.log(window.location.href)


function sendMessage(msg = " Пустое сообщение") {
    textDiv = document.querySelectorAll('.composer_rich_textarea')[0];
    sendMsgBtn = document.querySelectorAll('[type="submit"]')[0];
    textDiv.innerHTML = msg;
    textDiv.focus();
    setTimeout(() => sendEvent(sendMsgBtn), 1000)
}

function sendEvent(elem) {
    let event = new Event('mousedown');
    elem.dispatchEvent(event);
}

function checkURL(url) {
    if (window.location.href == `https://web.telegram.org/#/im?p=${url}`) return true;
    else return false;
}

function sendMessageToAll() {
    let addresses = new Set();
    addresses.add('@neeviktor');
    addresses.add('@igorkalmykov');
    for (let address of addresses) {
        if (checkURL(address))

            sendMessage(msg = " Пустое сообщение")
    }



    window.addEventListener("message", receiveMessage, false);

}