window.onload = function() {

    function KeyPress(e) {
        var evtobj = window.event ? event : e
        if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
            // var followersSpan = document.querySelectorAll('._315-i');
            // titleSpan = document.querySelectorAll('._19vo_')[0].childNodes;
            // console.dir(titleSpan)
            // groupName = `Телефонные номера группы в WhatsApp ${titleSpan[0].innerHTML}`;
            // var followersString = followersSpan[0].innerHTML;
            // var followersString = followersString.replace(/[^,0-9]/gim, '');
            // var followers = followersString.split(',');
            // console.log(followers);
            // for (let i = 0; i < followers.length; i++) {
            //     if (followers[i] !== '') {
            //         phones.add(followers[i])
            //         console.log(phones)
            //     }
            // }

            // console.log(phones);
            // saveFile(followersString, `${groupName}.txt`, 'text/plain')
            alert('ok')
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
            }, 0);
        }
    }

    document.onkeydown = KeyPress;
}