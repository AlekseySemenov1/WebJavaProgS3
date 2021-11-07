let X = 1;
let Y = 1;
let R = 1;

function XInput() {
    let checkbox = document.getElementsByClassName("Xcheckbox");
    let XMes = document.getElementById("XMessage");
    let s = 0;
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            s++;
        }
    }
    if (s === 0) {
        XMes.innerText = "Не выбрано ни одного значения X";
        XMes.style.visibility = "visible";
        hideSubmitButton();
        X = 0;
        return false;
    }
    X = 1;
    XMes.style.visibility = "hidden";
    if (Y === 1 && R === 1)
        showSubmitButton();
    return true;
}

function RInput() {
    let checkbox = document.getElementsByClassName("Rcheckbox");
    let RMes = document.getElementById("RMessage");
    let s = 0;
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
            s++;
        }
    }
    if (s === 0) {
        RMes.innerText = "Не выбрано ни одного значения R";
        RMes.style.visibility = 'visible';
        hideSubmitButton();
        R = 0;
        return false;
    }
    R = 1;
    RMes.style.visibility = "hidden";
    if (X === 1 && Y === 1)
        showSubmitButton();
    return true;
}

function YInput() {
    let textField = document.getElementById("Ycoordinate");
    let YMes = document.getElementById('YMessage');
    let y = textField.value;
    if (y === "") {
        YMes.innerText = "Пропущено значение y";
        YMes.style.visibility = 'visible';
        hideSubmitButton();
        Y = 0;
        return false;
    } else if (y === "00"){
        textField.value = "0";
        Y = 1;
        YMes.style.visibility = "hidden";
        if (R === 1 && X === 1) {
            showSubmitButton();
            return true;
        }
    } else if (y <= 5 && y >= -3) {
        Y = 1;
        YMes.style.visibility = "hidden";
        if (R === 1 && X === 1) {
            showSubmitButton();
            return true;
        }
    } else if (y === "-") {
        YMes.style.visibility = "hidden";
        return true;
    } else {
        YMes.textContent = "Недопустимое значение y";
        YMes.style.visibility = "visible";
        textField.value = "";
        Y = 0;
        hideSubmitButton();
        return false;
    }
}

function hideSubmitButton() {
    let but = document.getElementById("Submit");
    but.style.visibility = "hidden";
}

function showSubmitButton() {
    let but = document.getElementById("Submit");
    but.style.visibility = "visible";
}

function myReset(){
    showSubmitButton();
    let YMes = document.getElementById('YMessage');
    let XMes = document.getElementById('XMessage');
    let RMes = document.getElementById('RMessage');
    YMes.style.visibility = "hidden";
    XMes.style.visibility = "hidden";
    RMes.style.visibility = "hidden";
}

