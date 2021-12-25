let xStatus = 1;

function XInput() {
    let textField = document.getElementById("XCoordinate");
    let XMes = document.getElementById('XMessage');
    let x = textField.value;
    if (x === "") {
        XMes.innerText = "Пропущено значение x";
        XMes.style.visibility = 'visible';
        hideSubmitButton();
        xStatus = 0;
        return false;
    } else if (x <= 5 && x >= -5) {
        xStatus = 1;
        XMes.style.visibility = "hidden";
        showSubmitButton();
        return true;
    } else if (x === "-") {
        XMes.style.visibility = "hidden";
        return true;
    } else {
        XMes.innerText = "Недопустимое значение x";
        XMes.style.visibility = "visible";
        xStatus = 0;
        hideSubmitButton();
        return false;
    }
}

function hideSubmitButton() {
    let but = document.getElementById("Submit");
    but.disabled = true;
}

function showSubmitButton() {
    let but = document.getElementById("Submit");
    but.disabled = false;
}

$('#requestForm').submit(function (event) {
    let formData = $('#requestForm').serialize() + "&c=0";
    event.preventDefault();
    let x = document.getElementById('XCoordinate').value;
    let y = document.getElementById('YCoordinateSelector').value;
    let r = document.getElementById('RCoordinateSelector').value;
    SendRec(x, y, r, formData);
});

function clearResult(){
    clearTable();
    deletePoints();
    $.ajax({
        url: 'controller',
        method: 'POST',
        dataType: 'text',
        data: "c=1",
        success: function (data) {
        },
        error: function(){
            alert("Сервер не отвечает");
        }
    });
}

function clearTable() {
    $("#answerTable").remove();
}

function deletePoints(){
    $('.ShotPoint').remove();
}

function createTable() {
    let table = '<table id="answerTable"><tr> <th colSpan="4"> AnswerTable </th></tr><tr><td>X:</td><td>Y:</td><td>R:</td><td>Result</td> </tr></table>';
    $('body').append(table);
}

function myReset() {
    showSubmitButton();
    let YMes = document.getElementById('YMessage');
    let XMes = document.getElementById('XMessage');
    let RMes = document.getElementById('RMessage');
    YMes.style.visibility = "hidden";
    XMes.style.visibility = "hidden";
    RMes.style.visibility = "hidden";
}

$('#Picture').click(function (event) {
    let r = document.getElementById('RCoordinateSelector').value;
    let x = (event.offsetX - 200) / 130 * r;
    let y = (-event.offsetY + 200) / 130 * r;
    let formData = "x=" + x.toFixed(2) + "&y=" + y.toFixed(2) + "&r=" + r + "&c=0";
    SendRec(x, y, r, formData);
});


function SendRec(x, y, r, formData) {
    let newPoint = createNewPoint(x,y,r);
    $.ajax({
        url: 'controller',
        method: 'POST',
        dataType: 'text',
        data: formData,
        success: function (data) {
            clearTable();
            createTable();
            $('#answerTable').append(data);
            let a = data.indexOf("Great");
            let b = data.indexOf("Miss");
            if (a > b && b!==-1) {
                newPoint.setAttribute('fill', 'red');
            } else if ( a < b && a!==-1) {
                newPoint.setAttribute('fill', 'green');
            } else if(a > b){
                newPoint.setAttribute('fill', 'green');
            } else {
                newPoint.setAttribute('fill', 'red');
            }
            document.getElementById("Picture").append(newPoint);
        },
        error: function(){
            alert("Сервер не отвечает");
        }
    });
}

function createNewPoint(x,y,r){
    let newPoint = document.getElementById("point").cloneNode();
    newPoint.setAttribute('visibility', 'visible');
    newPoint.setAttribute('class', 'ShotPoint');
    newPoint.setAttribute('r', 5);
    newPoint.setAttribute('cx', x / r * 130 + 200);
    newPoint.setAttribute('cy', -y / r * 130 + 200);
    return newPoint;
}
