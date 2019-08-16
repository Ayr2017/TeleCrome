var sendmsgbtn = document.querySelector('#sendmsgbtn');
sendmsgbtn.addEventListener('click', setFlagInLocalStorage);

function setFlagInLocalStorage() {

    chrome.storage.local.set({ "phasersTo": "awesome" }, function() {
        //  Data's been saved boys and girls, go on home
        console.log('Saved.')
    });

}