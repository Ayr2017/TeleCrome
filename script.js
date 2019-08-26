const ws = new WebSocket('ws://localhost:3000');

ws.open = () => setStatus('ONLINE');
ws.close = () => setStatus('DISCONECTED');
ws.onmessage = response => messageProcessor(response.data);

function messageProcessor(msg) {
    console.log(msg)
    if (msg == 'startSendingMessages') {
        localStorage.setItem('isSend', true);
    } else if (msg == 'stopSendingMessages') {
        localStorage.setItem('isSend', false);
    } else if (msg[0] == '[') {
        localStorage.setItem('addressMap', msg);
    }
}
sendMessages();

function sendMessages() {
    var isSend = localStorage.getItem('isSend');
    var addressMap = localStorage.getItem('addressMap');
    var addressArray = JSON.parse(addressMap);
    console.log(isSend);
    console.log(addressArray.pop());
    console.log(addressArray);
    console.log(new Map(addressArray));
    var x = new Map(addressArray);
    console.log(JSON.stringify([...x]));
    localStorage.setItem('addressMap', JSON.stringify([...x]));
}

function writeToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}