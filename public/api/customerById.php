<?php

require '../../app/common.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' ) {
  require 'dataPost.php';
  exit;
}

$Id = intval($_GET['Id'] ?? 0);
// 1. Go to the database and get all work associated with the $taskId

$customerArr2 = Customer::fetchAll($Id);

// 2. Convert to JSON

$json = json_encode($customerArr2,  JSON_PRETTY_PRINT);

// 3. Print
header ('Content-type: application/json;charset=utf-8');

echo json_encode($customerArr2);
