const ws = new WebSocket('ws://localhost:3000');
var link = document.querySelector('#link');
var sendmsgbtn = document.querySelector('#sendmsgbtn');
var stopmsgbtn = document.querySelector('#stopmsgbtn');
var infobtn = document.querySelector('#infobtn');
var display = document.querySelector('#display');
var fileUpload = document.querySelector('#file-upload');
var sendfile = document.querySelector('#sendfile');
var isSend;
var addressCollectionAsText;
var addressCollectionAsMap = new Map();


ws.open = () => setStatus('ONLINE');
ws.close = () => setStatus('DISCONECTED');
ws.onmessage = response => {
    writeInfo(response.data);
    if (response.data == 'startSendingMessages') {
        localStorage.setItem('isSend', true);
        sendmsgbtn.classList.add('active');
    } else if (response.data == 'stopSendingMessages') {
        localStorage.setItem('isSend', false);
        sendmsgbtn.classList.remove('active');
    }
};



function getInfo() {
    ws.send('i');
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

function checkLocalStorageSendFlag() {
    isSend = localStorage.getItem('isSend');
    switch (isSend) {
        case 'true':
            sendmsgbtn.classList.add('active');
            break;
        case 'false':
            sendmsgbtn.classList.remove('active');
            break;
    }
}

sendmsgbtn.addEventListener('click', startSendingMessages);
stopmsgbtn.addEventListener('click', stopSendingMessages);
infobtn.addEventListener('click', getInfo);
sendfile.addEventListener('click', sendFileToServer);
checkLocalStorageSendFlag();


fileUpload.addEventListener('change', function() {
    readText(this);
});
var reader = new FileReader();

function readText(that) {
    if (that.files && that.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var output = e.target.result;
            output = output.trim();
            addressCollectionAsText = output;
            output = output.split(",");
            for (let val of output) {
                let v = val.split('@');
                addressCollectionAsMap.set(v[0].trim(), '@' + v[1].trim())
            }

        };
        reader.readAsText(that.files[0]);
    }
}

function sendFileToServer() {
    addressCollectionAsMap = JSON.stringify([...addressCollectionAsMap]);
    ws.send(addressCollectionAsMap);
}