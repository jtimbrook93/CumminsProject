<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' ) {
  require 'dataPost.php';
  exit;
}

$customerId = intval($_GET['customerId'] ?? 0);
$productName = ($_GET['productName'] ?? 0);
// 1. Go to the database and get all work associated with the $taskId
$serialNumberArr = SerialNumber::getSerialNumber($customerId, $productName);

// 2. Convert to JSON
$json = json_encode($serialNumberArr,  JSON_PRETTY_PRINT);

// 3. Print
header ('Content-type: application/json;charset=utf-8');
echo json_encode($serialNumberArr);
