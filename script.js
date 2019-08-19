// setInterval(() => { testWebSocket(); }, 1000); {

//     var wsUri = "wss://echo.websocket.org/";
//     var output;

//     function init() {
//         output = document.getElementById("output");
//         testWebSocket();
//     }

//     function testWebSocket() {
//         websocket = new WebSocket(wsUri);
//         websocket.onopen = function(evt) { onOpen(evt) };
//         websocket.onclose = function(evt) { onClose(evt) };
//         websocket.onmessage = function(evt) { onMessage(evt) };
//         websocket.onerror = function(evt) { onError(evt) };
//     }

//     function onOpen(evt) {
//         writeToScreen("CONNECTED");
//         doSend("WebSocket rocks");
//     }

//     function onClose(evt) {
//         writeToScreen("DISCONNECTED");
//     }

//     function onMessage(evt) {
//         writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data + '</span>');
//         websocket.close();
//     }

//     function onError(evt) {
//         writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
//     }

//     function doSend(message) {
//         writeToScreen("SENT: " + message);
//         websocket.send(message);
//     }

//     function writeToScreen(message) {
//         console.log(message)
//     }

//     window.addEventListener("load", init, false);


// }

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
    }
}


function writeInfo(value) {
    console.log(value);
}