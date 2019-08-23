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
    console.log(isSend);
}