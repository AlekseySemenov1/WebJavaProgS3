<%@ page import="java.util.LinkedList" %>
<%@ page import="Servlets.Point" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="ClientPageStyle.css">
</head>
<body>
<header>
    <div id="header">
        <div id="LabTitle">
            <span>Лабораторная работа №2</span>
        </div>
        <ul id="linkRow">
            <li class="headerElement">
                <a href="https://se.ifmo.ru/courses/web#labs">SE.IFMO.RU</a>
            </li>
            <li class="headerElement">
                <a href="https://github.com/AlekseySemenov1/WebSemestr3">Ссылка на github</a>
            </li>
            <li class="headerElement">
                <a href="https://docs.google.com/spreadsheets/d/148tsdbIgCsHCHWiAtN3T1RA5vrvwnLc4LWTqHinwGYM/edit#gid=1659727672">Google
                    Журнал</a>
            </li>
            <li class="headerElement">
                <a>Об авторе</a>
                <ul class="info">
                    <li>Семенов Алексей Олегович</li>
                    <li>Группа: P3214</li>
                    <li>Вариант: 19249</li>
                </ul>
            </li>
        </ul>
    </div>
</header>
<div id="mainBlock">
    <div id="PictureBlock">
        <svg id="Picture">
            <line x1="20" y1="200" x2="380" y2="200" stroke="black"></line>
            <line x1="200" y1="20" x2="200" y2="380" stroke="black"></line>
            <polygon points="380,200 365,190 365,210 380,200" stroke="black"></polygon>
            <polygon points="200,20 190,35 210,35 200,20" stroke="black"></polygon>
            <line x1="265" y1="195" x2="265" y2="205" stroke="black"></line>
            <line x1="330" y1="195" x2="330" y2="205" stroke="black"></line>
            <line x1="135" y1="195" x2="135" y2="205" stroke="black"></line>
            <line x1="70" y1="195" x2="70" y2="205" stroke="black"></line>
            <line x1="195" y1="265" x2="205" y2="265" stroke="black"></line>
            <line x1="195" y1="330" x2="205" y2="330" stroke="black"></line>
            <line x1="195" y1="135" x2="205" y2="135" stroke="black"></line>
            <line x1="195" y1="70" x2="205" y2="70" stroke="black"></line>
            <circle r="5" cx="200" cy="200"></circle>
            <circle id="point" r="5" cx="200" cy="200" visibility="hidden"></circle>
            <text x="253" y="190" font-weight="bolder">R/2</text>
            <text x="123" y="190" font-weight="bolder">R/2</text>
            <text x="210" y="140" font-weight="bolder">R/2</text>
            <text x="210" y="270" font-weight="bolder">R/2</text>
            <text x="325" y="190" font-weight="bolder">R</text>
            <text x="65" y="190" font-weight="bolder">R</text>
            <text x="210" y="75" font-weight="bolder">R</text>
            <text x="210" y="335" font-weight="bolder">R</text>
            <polygon points="70,200 200,135 200,200 70,200" fill="blue" fill-opacity="0.4"></polygon>
            <polygon points="200, 200 200,330 265,330 265,200 200,200" fill="blue" fill-opacity="0.4"></polygon>
            <path d="M200,200 L200,70 A130,130 0 0,1 330,200 L200,200" fill="blue" fill-opacity="0.4"></path>
            <%!
                LinkedList<Point> list;
            %>
            <%
                if (request.getSession().getAttribute("pointList") != null) {
                    list = (LinkedList<Point>) request.getSession().getAttribute("pointList");
                    for (int i = 0; i < list.size(); i++) {
                        Point p = list.get(i);
                        float r = p.getR();
                        if (p.isResult())
                            out.println("<circle id=\"point\" r=\"5\" cx=" + (p.getX() / r * 130 + 200) + " cy=" + ((-p.getY()) / r * 130 + 200) + " fill=\"green\" class=\"ShotPoint\" ></circle>");
                        else
                            out.println("<circle id=\"point\" r=\"5\" cx=" + (p.getX() / r * 130 + 200) + " cy=" + ((-p.getY()) / r * 130 + 200) + " fill=\"red\" class=\"ShotPoint\"></circle>");
                    }
                }
            %>
        </svg>
    </div>
    <div id="FormBlock">
        <form method="post" action="${pageContext.request.contextPath}/controller" id="requestForm">
            <div id="XBlock" class="CoordinateBlocks">
                <div class="alert">
                    <label id="XMessage" style="visibility: hidden;" class="textLabel">something</label>
                </div>
                <div class="CoordinateLabel">
                    <label class="textLabel">Coordinate X</label>
                </div>
                <div class="CoordinateInput">
                    <input type="text" name="x" id="XCoordinate" maxlength="10" value="2" oninput="XInput()">
                </div>
            </div>
            <div id="YBlock" class="CoordinateBlocks">
                <div class="alert">
                    <label id="YMessage" class="textLabel" style="visibility: hidden">something</label>
                </div>
                <div class="CoordinateLabel">
                    <label class="textLabel">Coordinate Y</label>
                </div>
                <div>
                    <select name="y" form="requestForm" id="YCoordinateSelector">
                        <option value="-4">-4</option>
                        <option value="-3">-3</option>
                        <option value="-2">-2</option>
                        <option value="-1">-1</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
            </div>
            <div id="RBlock" class="CoordinateBlocks">
                <div class="alert">
                    <label id="RMessage" class="textLabel" style="visibility: hidden">something</label>
                </div>
                <div class="CoordinateLabel">
                    <label class="textLabel">R</label>
                </div>
                <div>
                    <select name="r" form="requestForm" id="RCoordinateSelector">
                        <option value="1">1</option>
                        <option value="1.5">1,5</option>
                        <option value="2">2</option>
                        <option value="2.5">2,5</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>
            <div id="ButtonBlock">
                <div class="FormButtons">
                    <input type="submit" id="Submit">
                </div>
                <div class="FormButtons">
                    <input type="reset" id="Reset" onclick="myReset()">
                </div>
                <div class="FormButtons">
                    <input type="button" value="Очистить таблицу" id="ClearTable" onclick="clearResult()">
                </div>
            </div>
        </form>
    </div>
</div>
<%
    if (request.getSession().getAttribute("pointList") != null) {
        list = (LinkedList<Point>) request.getSession().getAttribute("pointList");
        out.println("<table id=\"answerTable\"><tr> <th colSpan=\"4\"> AnswerTable </th></tr><tr><td>X:</td><td>Y:</td><td>R:</td><td>Result</td> </tr>");
        for (int i = 0; i < list.size(); i++) {
            Point p = list.get(i);
            float x = p.getX();
            float y = p.getY();
            float r = p.getR();
            if (p.isResult()) {
                out.println("<tr class='answerRow'><td>" + x + "</td><td>" + y + "</td><td>" + r + "</td><td class='result'>Great</td></tr>");
            } else{
                out.println("<tr class='answerRow'><td>" + x + "</td><td>" + y + "</td><td>" + r + "</td><td class='result'>Miss</td></tr>");
            }
        }
        out.println("<table>");

    }
%>
<script src="jquery-3.6.0.min.js"></script>
<script src="script.js"></script>
</body>
</html>