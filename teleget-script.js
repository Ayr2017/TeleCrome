window.onload = function() {
        let telegrammLink = 'https://web.telegram.org/#/im?p=@steroid_one_en';
        var loginCollection = new Set();
        var loginMap = new Map();
        let members;
        let loginWrapper;
        let userName;
        let userPhone;
        let chatName;
        let timeStart;
        let timeEnd;

        function KeyPress(e) {
            var evtobj = window.event ? event : e
            if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
                chatName = document.querySelectorAll('.tg_head_peer_title')[0].innerHTML;
                timeStart = new Date().getTime();
                openMembersList();
            }

        }

        function saveFile(data, filename, type) {
            var file = new Blob([data], { type: type });
            if (window.navigator.msSaveOrOpenBlob) // IE10+
                window.navigator.msSaveOrOpenBlob(file, filename);
            else { // Others
                var a = document.createElement("a"),
                    url = URL.createObjectURL(file);
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 10);
            }
        }

        function openMembersList() {
            let membersList = document.querySelectorAll('.tg_head_peer_info');
            if (membersList.length < 1) {
                setTimeout(function() {
                    openMembersList();
                }, 500)
            } else {
                console.dir(membersList[0].parentNode);
                membersList[0].parentNode.click();
                getMemberLink();
            }

        }

        function getMemberLink() {
            members = document.querySelectorAll('a.md_modal_list_peer_name');
            if (members.length > 0) {

                if (members.length > loginCollection.size) {
                    members[parseInt(loginCollection.size)].click();
                    getMemberLogin();
                } else {
                    loginMap = formatLoginMap(loginMap);
                    timeEnd = new Date().getTime();
                    fullTime = timeEnd - timeStart;
                    // saveFile(Array.from(loginCollection).join(' '), `Logins from telegram chat ${chatName}.txt`, 'text/plain');
                    let data = `{ ${Array.from(loginMap, ([key, value]) => `\n "${key}":"${value}" `)}\n}`
                    saveFile(data , `Logins with names from telegram chat ${chatName}, Full time-${fullTime/1000}sec.txt`, 'text/plain');
                    return;
            };
        } else {
            setTimeout(function() {
                getMemberLink();
            }, 100)
        }

    }

    function getMemberLogin() {
        loginWrapper = document.querySelectorAll('.md_modal_section_param_value');
        console.warn('IN getMemberLogin!!');

        userName = document.querySelectorAll('[my-peer-link="user.id"]')[0];
        console.log(userName)

        userPhone = document.querySelectorAll('[ng-bind="user.phone | phoneNumber"]')[0];
        let login_ = document.querySelectorAll('[ng-bind="\'@\' + user.username"]')[0] || userPhone;

        if ( /* loginWrapper.length > 2 */ login_ && userName != undefined) {
            console.warn('IN IF!!');
            // let userPhone = document.querySelectorAll('[ng-bind="user.phone | phoneNumber"]')[0];
            // let login_ = document.querySelectorAll('[ng-bind="\'@\' + user.username"]')[0] || userPhone;

            login = login_.innerHTML;
            login = login.replace(/[\-\s]/g, '');
            if (document.querySelectorAll('[ng-bind="\'@\' + user.username"]').length > 0) console.log('TEST LOGIN' + login);
            else console.log('No login');

            loginCollection.add(login);
            loginMap.set(userName.innerHTML, login);
            console.dir(loginCollection)
            console.dir(loginMap)
            closeContactInfo();

        } else if (!login_ && userName == undefined) {
            setTimeout(function() {
                getMemberLogin();
            }, 100)
        } else {
            console.warn('ELSE !!');
            let d = new Date();
            loginCollection.add(`RAND${d.getTime()}`);
            closeContactInfo();
        }

    }

    function closeContactInfo() {
        let closeButton = document.querySelectorAll('.md_modal_action_close')[1];
        closeButton.click();
        console.log('Contact info was closed');
        setTimeout(function() {
            getMemberLink();
        }, 100)
    }

    function formatLoginMap(map) {
        let newMap = new Map();
        for (let [key, val] of map) {
            newMap.set(key.replace(/<span(.*)>/g, ''), val);
        }
        return newMap;
    }



    // openMembersList()
    document.onkeydown = KeyPress;
}