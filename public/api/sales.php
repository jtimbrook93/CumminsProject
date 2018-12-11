<?php

require '../../app/common.php';

//fetch all the work for that task id
if ($_SERVER['REQUEST_METHOD'] == 'POST' ) {
  require 'dataPost.php';
  exit;
}
// go to the database and get stuff
  $this->businessSegment = ($data['businessSegment']);

$salesArr = Sales::fetchAll($businessSegment);

// convert to json and print
$json = json_encode($salesArr, JSON_PRETTY_PRINT);

header ('Content-type: application/json;charset=utf-8');
echo json_encode($salesArr);
