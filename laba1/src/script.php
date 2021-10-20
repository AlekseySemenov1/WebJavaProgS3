<?php

session_start();
ServerValidator();

function ServerValidator()
{
    $startTime = microtime(true);
    $localTime = localtime(time());
    $xVal = array();
    $rVal = array();
    $yVal = '';
    $resultTable = '';
    foreach ($_POST as $key => $value) {
        if ($key[0] === 'x' && ($value >= -4 && $value <= 4)) {
            $xVal[] = $value;
        }
        if ($key[0] === 'r' && ($value >= 1 && $value <= 3)) {
            $rVal[] = $value;
        }
        if ($key[0] === 'y' && ($value >= -3 && $value <= 5)) {
            $yVal = $value;
        }
    }
    if ($yVal === '' || count($xVal) === 0 || count($rVal) === 0)
        return "Not data";
    $k = 0;
    for ($i = 0; $i < count($xVal); $i++) {
        for ($j = 0; $j < count($rVal); $j++) {
            $endTime = microtime(true);
            $resultTable .= ResultRow($xVal[$i], $yVal, $rVal[$j], $localTime, ($endTime - $startTime), chechker($xVal[$i], $yVal, $rVal[$j]));
            $k++;
        }
    }
    if (isset($_COOKIE["UserCookies"]))
        $resultTable .= $_COOKIE["UserCookies"];
    setcookie("UserCookies", $resultTable);
    $resultPage = HeadPage();
    $resultPage .= StartBodyPage();
    $resultPage .= $resultTable;
    $resultPage .= EndBodyPage();
    print_r($resultPage);
}

function chechker($xVal, $yVal, $rVal)
{
    if ($xVal >= 0 && $yVal <= 0) {
        if ($xVal <= $rVal && $yVal >= -$rVal) {
            return "Попал";
        }
        return "Не попал";
    } else if ($xVal < 0 && $yVal > 0) {
        return "Не попал";
    } else if ($xVal >= 0 && $yVal >= 0) {
        if ($xVal <= $rVal / 2) {
            return "Попал";
        }
        return "Не попал";
    } else {
        if ($xVal * $xVal + $yVal * $yVal <= $rVal * $rVal) {
            return "Попал";
        }
        return  "Не попал";
    }
}

function ResultRow($xVal, $yVal, $rVal, $localTime, $executeTime, $k)
{
    return "<tr><td>$xVal</td><td>$yVal</td><td>$rVal</td><td>$localTime[2]:$localTime[1]:$localTime[0]</td><td>$executeTime</td><td>$k</td></tr>";
}

function HeadPage(){
    return '<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="Styles.css">
</head>';
}

function StartBodyPage(){
    return '<body>
<table class="answerTable">
    <tr>
        <th colspan="6">
    AnswerTable
        </th>
    </tr>
    <tr>
        <td>X:</td>
        <td>Y:</td>
        <td>R:</td>
        <td>LocalTime</td>
        <td>ExecutionTime</td>
        <td>Result</td>
    </tr>';
}

function EndBodyPage(){
    return '</table>
</body>
</html>';
}