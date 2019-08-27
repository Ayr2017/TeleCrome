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
// sendMessages();
checkPageURL()

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

function checkPageURL() { // Проверка. Подходит ли данная страница для отправки сообщений
    var url = window.location.href;
    // var regex = RegExp('.*telegram\.org/#/im?p=.*');
    // var regex = RegExp('@AltoCarContactBot$');
    var addressMap = localStorage.getItem('addressMap');
    // var addressArray = JSON.parse(addressMap);
    // console.log(addressArray);
    // if (addressArray.length <= 0) return false;
    // var r = addressArray[addressArray.length - 1];
    // console.log(r); 
    console.log(addressMap);
    // var flag = regex.test(url);
    // if (flag) console.log(`FLAG true`);
    // else console.log('FLAG false');
    // console.log(url)

}