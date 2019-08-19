const ws = new WebSocket('ws://localhost:3000');
var link = document.querySelector('#link');
var sendmsgbtn = document.querySelector('#sendmsgbtn');
var stopmsgbtn = document.querySelector('#stopmsgbtn');
var infobtn = document.querySelector('#infobtn');
var display = document.querySelector('#display');

ws.open = () => setStatus('ONLINE');
ws.close = () => setStatus('DISCONECTED');
ws.onmessage = response => writeInfo(response.data);



function getInfo() {
    // ws.send('startSendingMessages');
}

function startSendingMessages() {
    ws.send('startSendingMessages');
}

function stopSendingMessages() {
    ws.send('stopSendingMessages');
}

function setStatus(value) {
    writeInfo(value);
}

function writeInfo(value) {
    display.innerHTML = value;
}

sendmsgbtn.addEventListener('click', startSendingMessages);
stopmsgbtn.addEventListener('click', stopSendingMessages);
infobtn.addEventListener('click', getInfo);