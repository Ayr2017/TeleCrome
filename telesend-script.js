var textDiv;
var sendMsgBtn;

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

}

(function() {
    var visited = window.location.href;
    var time = +new Date();
    chrome.storage.sync.set({ 'visitedPages': { pageUrl: visited, time: time } }, function() {
        console.log("Just visited", visited)
    });
})();