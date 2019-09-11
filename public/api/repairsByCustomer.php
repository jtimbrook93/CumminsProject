<?php
require '../../app/common.php';


if ($_SERVER['REQUEST_METHOD'] == 'POST' ) {
  require 'dataPost.php';
  exit;
}
$customerId = intval($_GET['customerId'] ?? 0);
//fetch all the work for that task id
// go to the database and get stuff
$repairsArr = Repairs::getRepairsByCustomer($customerId);

$json = json_encode($repairsArr, JSON_PRETTY_PRINT);
// convert to json and print
header ('Content-type: application/json;charset=utf-8');
echo json_encode($repairsArr);
