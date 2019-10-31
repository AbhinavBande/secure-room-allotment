function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var d = ("0" + today.getDate()).slice(-2);
    var mn = ("0" + (today.getMonth() + 1)).slice(-2);
    var y = today.getFullYear();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('put-time').innerHTML =
        h + ":" + m + ":" + s;
    document.getElementById('put-date').innerHTML =
        d + "-" + mn + "-" + y;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function logout() {
    window.location = "/";
}

function notConfirm() {
    window.location = "/user";
}
