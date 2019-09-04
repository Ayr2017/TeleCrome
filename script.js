const ws = new WebSocket('ws://localhost:3000');
var addressArray;
var messageForSending = JSON.parse(localStorage.getItem('message'));
messageForSending = messageForSending.msgtext;
if (!messageForSending) console.error('Please, send text message into field');

ws.open = () => setStatus('ONLINE');
ws.close = () => setStatus('DISCONECTED');
ws.onmessage = response => messageProcessor(response.data);


function messageProcessor(msg) {
    console.log(msg)
    if (msg == 'startSendingMessages') {
        localStorage.setItem('isSend', true);
        specialMethod();
    } else if (msg == 'stopSendingMessages') {
        localStorage.setItem('isSend', false);
    } else if (msg[0] == '[') {
        localStorage.setItem('addressMap', msg);
    } else if (msg[0] == '{') {
        localStorage.setItem('message', msg);
    }
}



window.addEventListener('hashchange', specialMethod)
window.addEventListener('load', specialMethod)
window.addEventListener('load', function(e) { console.log('load') })
window.addEventListener('hashchange', function(e) { console.log('load') })

function specialMethod() {

    const promise = new Promise((resolve, reject) => {
        var isSend = localStorage.getItem('isSend');
        isSend == false ? isSend = false : isSend = true;
        var addressMap = localStorage.getItem('addressMap');
        addressArray = JSON.parse(addressMap);
        console.log(isSend)
        console.log(typeof isSend)
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
                console.log(f + ' <= f');
                document.location.href = `https://web.telegram.org/#/im?p=${postfix}`;
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
                }, 10);

            })
        })
        .then(data => {
            return new Promise((resolve, reject) => {
                console.log('Promise 12');
                messageForSending = JSON.parse(localStorage.getItem('message'));
                messageForSending = messageForSending.msgtext;
                sendMsgBtn = document.querySelectorAll('[type="submit"]')[0];
                console.log(messageForSending);
                if (messageForSending) {
                    textDiv.innerHTML = messageForSending;
                    textDiv.focus();
                    resolve(sendMsgBtn);
                }
            })
        })
        .then(elem => {
            return new Promise((resolve, reject) => {
                console.log('Promise 13 ');
                let event = new Event('mousedown');
                if (elem.dispatchEvent(event)) {
                    setTimeout(() => {
                        resolve();
                    }, 10);
                }
            })
        })
        .then(elem => {
            return new Promise((resolve, reject) => {
                addressArray.pop();
                localStorage.setItem('addressMap', JSON.stringify(addressArray));
                if (addressArray.length > 0) {
                    ws.send(`Осталось ${addressArray.length} элементов.`);
                    location.replace('https://web.telegram.org/#/im?p=' + addressArray[addressArray.length - 1][1]);
                    // document.location.href = 'https://web.telegram.org/#/im?p=' + addressArray[addressArray.length - 1][1];
                } else {
                    ws.send('Передача сообщений завершена!');
                }
            })
        })
}