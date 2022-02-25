function getTime() {
    let timeBlock = document.getElementById("time");
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    if (m < 10)
        m = "0" + m;
    if (h < 10)
        h = "0" + h;
    if (s < 10)
        s = "0" + s;
    timeBlock.innerHTML = h + ':' + m + ':' + s;
}

function getDate() {
    let dateBlock = document.getElementById("date");
    let now = new Date();
    dateBlock.innerHTML = now.toDateString();
}

function getTD() {
    getTime();
    getDate();
    setTimeout(function () {
        getTD();
    }, 9000);
}

$(document).ready(function () {
    getTD();
})