$('#Picture').click(function (event) {
    if (document.querySelector('input[name="requestForm:RInput"]:checked') !== null) {
        let r = document.querySelector('input[name="requestForm:RInput"]:checked').value;
        let x = (event.offsetX - 270) / 70;
        let y = (-event.offsetY + 270) / 70;
        setX(x.toFixed(2));
        setY(y.toFixed(2));
    }
    document.getElementById("requestForm:Submit").click();
});


function createNewPoint(x, y) {
    let newPoint = document.getElementById("point").cloneNode();
    newPoint.setAttribute('visibility', 'visible');
    newPoint.setAttribute('class', 'ShotPoint');
    newPoint.setAttribute('r', 5);
    newPoint.setAttribute('cx', x * 70 + 270);
    newPoint.setAttribute('cy', -y * 70 + 270);
    return newPoint;
}

function deletePoints() {
    $('.ShotPoint').remove();
}

function setX(x) {
    document.querySelector('input[name="requestForm:XInput"]').value = x;
}

function setY(y) {
    document.querySelector('input[name="requestForm:YInput"]').value = y;
}


function points() {
    let tableRows = document.getElementById("AnswerTable").rows;
    let picture = document.getElementById("Picture");
    let point;
    deletePoints();
    if (tableRows.length > 1) {
        for (let i = 1; i < tableRows.length; i++) {
            let td = tableRows[i].cells;
            if (td[0].innerText !== "") {
                point = createNewPoint(td[0].innerText, td[1].innerText, td[2].innerText);
                if (td[3].innerText === "true") {
                    point.setAttribute("fill", "green");
                } else {
                    point.setAttribute("fill", "red");
                }
                picture.append(point);
            }
        }
    }
}

$('#Picture').ready(function () {
    points();
    let r = document.querySelector('input[name="requestForm:RInput"]:checked');
    setFigure(r.value / 0.5);
})