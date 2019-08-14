var sendLink = document.querySelector('#sendlink');
sendLink.addEventListener('click', sendTo);

function sendTo() {
    var link = document.querySelector('#link');
    var linkValue = link.value;
    console.log(linkValue);
    console.dir(document);

}