<?php

session_start();
ServerValidator();

function ServerValidator()
{
    $startTime = microtime(true);
    $localTime = localtime(time()+3*3600);
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
        if ($key[0] === 'c'){
            $file = fopen("data.txt", "w+");
            fwrite($file, '');
            fclose($file);
        }

    }
    if ($yVal === '' || count($xVal) === 0 || count($rVal) === 0) {
        echo "Not data";
        return;
    }
    $k = 0;
    for ($i = 0; $i < count($xVal); $i++) {
        for ($j = 0; $j < count($rVal); $j++) {
            $endTime = microtime(true);
            $resultTable .= ResultRow($xVal[$i], $yVal, $rVal[$j], $localTime, number_format($endTime - $startTime, 6, "."), chechker($xVal[$i], $yVal, $rVal[$j]));
            $k++;
        }
    }
    $file = fopen("data.txt", "r");
    $resultTable .= fread($file, 100000);
    fclose($file);
    $file = fopen("data.txt", "w+");
    fwrite($file, $resultTable);
    fclose($file);
    $resultPage = startPage();
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
    return "<tr><td>$xVal</td><td>$yVal</td><td>$rVal</td><td>$localTime[2]:$localTime[1]:$localTime[0]</td><td>$executeTime мк</td><td>$k</td></tr>";
}

function startPage(){
    return '<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="AnswerPageStyle.css">
</head>
<body>
<script src="script.js"></script>
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
    return '<tr>
<td colspan="6" align="right">
<input type="button" value="back" onclick="history.back()">
</td>
</tr>
</table>
</body>
</html>';
}