function RadiusChange() {
    let r = document.querySelector('input[name="requestForm:RInput"]:checked').value;
    setFigure(r / 0.5);
}

function setFigure(r) {
    let triangle = document.getElementById("triangle");
    triangle.setAttribute("points", "270,270 270," + (270 - 35 / 2 * r) + " " + (270 + 35 * r) + ",270 270,270");
    triangle.setAttribute("fill", "blue");
    triangle.setAttribute("fill-opacity", "0.4");

    let rectangle = document.getElementById("rectangle");
    rectangle.setAttribute("points", "270,270 270," + (270 + 35 * r) + " " + (270 + 35 / 2 * r) + "," + (270 + 35 * r) + " " + (270 + 35 / 2 * r) + ",270 270,270");
    rectangle.setAttribute("fill", "blue");
    rectangle.setAttribute("fill-opacity", "0.4");

    let curve = document.getElementById("curve");
    curve.setAttribute("d", "M" + (270 - 35 / 2 * r) + ",270 L270,270 L270," + (270 - 35 / 2 * r) + " A" + (35 / 2 * r) + "," + (35 / 2 * r) + " 0,0,0 " + (270 - 35 / 2 * r) + ",270");
    curve.setAttribute("fill", "blue");
    curve.setAttribute("fill-opacity", "0.4");
}

function clearFigure() {
    let triangle = document.getElementById("triangle");
    triangle.setAttribute("points", "");
    let rectangle = document.getElementById("rectangle");
    rectangle.setAttribute("points", "");
    let curve = document.getElementById("curve");
    curve.setAttribute("d", "");
}