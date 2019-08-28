// import { clearInterval } from "timers";

const ws = new WebSocket('ws://localhost:3000');
var addressArray;

ws.open = () => setStatus('ONLINE');
ws.close = () => setStatus('DISCONECTED');
ws.onmessage = response => messageProcessor(response.data);

function messageProcessor(msg) {
    console.log(msg)
    if (msg == 'startSendingMessages') {
        localStorage.setItem('isSend', true);
        sendMessages();
    } else if (msg == 'stopSendingMessages') {
        localStorage.setItem('isSend', false);
    } else if (msg[0] == '[') {
        localStorage.setItem('addressMap', msg);
    }
}
// sendMessages();

function sendMessages() {
    var isSend = localStorage.getItem('isSend');
    var addressMap = localStorage.getItem('addressMap');
    addressArray = JSON.parse(addressMap);
    console.info(1)
    if (isSend && addressArray.length > 0) {
        console.info(2)
        var postfix = addressArray[addressArray.length - 1][1];
        console.info(3)
        if (checkPageURL(postfix)) {
            console.info(4)
            sendMessage('Не просто сообщение _');
            console.info(5)
            return;
        } else {
            window.location.href = `https://web.telegram.org/#/im?p=${postfix}`;
        }
    }

}

function checkPageURL(postfix) { // Проверка. Подходит ли данная страница для отправки сообщений
    var localUrl = window.location.href;
    var regex = RegExp(`${postfix}`);
    return regex.test(localUrl);
}

function setAddressMap() {
    console.log(addressArray);
    addressArray.pop();
    localStorage.setItem('addressMap', JSON.stringify(addressArray));
    if (addressArray.length > 0) {
        console.log('End setAddressMap.');
        location.reload(true);
    }
}

const promise = new Promise((resolve, reject) => {
    var isSend = localStorage.getItem('isSend');
    var addressMap = localStorage.getItem('addressMap');
    addressArray = JSON.parse(addressMap);
    if (isSend && addressArray.length > 0) {
        var postfix = addressArray[addressArray.length - 1][1];
        var localUrl = window.location.href;
        var regex = RegExp(`${postfix}`);
        var f = regex.test(localUrl);
        if (f) {
            console.log(f + ' <= f')
            resolve();
            console.info(5)
            return;
        } else {
            window.location.href = `https://web.telegram.org/#/im?p=${postfix}`;
        }
    }

})
promise.then(data => {
        return new Promise((resolve, reject) => {
            console.log('Promise 1');
            let interval = setInterval(() => {
                textDiv = document.querySelectorAll('.composer_rich_textarea')[0];
                if (textDiv != undefined) {
                    clearInterval(interval);
                    resolve();
                }
            }, 5000);

        })
    })
    .then(data => {
        return new Promise((resolve, reject) => {
            console.log('Promise 12');
            sendMsgBtn = document.querySelectorAll('[type="submit"]')[0];
            textDiv.innerHTML = 'msg';
            textDiv.focus();
            resolve(sendMsgBtn);
        })
    })
    .then(elem => {
        return new Promise((resolve, reject) => {
            console.log('Promise 13 ' + elem);
            let event = new Event('mousedown');
            if (elem.dispatchEvent(event)) {
                setTimeout(() => {
                    console.log(elem);
                    resolve();
                }, 5000);
            }
        })
    })
    .then(elem => {
        return new Promise((resolve, reject) => {
            console.log('https://web.telegram.org/#/im?p=' + addressArray[addressArray.length - 1][1]);
            addressArray.pop();
            localStorage.setItem('addressMap', JSON.stringify(addressArray));
            if (addressArray.length > 0) {
                console.log('End setAddressMap.');
                // location.reload(true);
                // document.location.href = 'https://web.telegram.org/#/im?p=' + addressArray[addressArray.length - 1][1];
                document.location.assign('https://web.telegram.org/#/im?p=u140794344_10084542481547959278');
            }
        })
    })