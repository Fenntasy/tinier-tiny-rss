<?php
$values = json_decode(file_get_contents('php://input'), true);
$data_string = json_encode($values);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'http://rss.billey.me/api/');
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_REFERER, $_SERVER['REQUEST_URI']);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data_string))
);
$result = curl_exec($ch);
curl_close($ch);
echo $result;