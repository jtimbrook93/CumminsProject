<?php

class Repairs

{

  public $repairID;
  public $serialNumber;
  public $customerId;
  public $dateProcessed;  //'YYYY-MM-DD'
  public $dateStart;   //'YYYY-MM-DD', needs to be calculated
  public $estimatedFinish;
  public $processStep;
  public $contactName;
  public $employeeId;


  public function __construct($row) {
    $this->repairID = isset($row['repairID'])   ? intval($row['repairID']) : null;


    $this->serialNumber = $row['serialNumber'];
    $this->customerId = ($row['customerId']);
    $this->dateProcessed = date($row['dateProcessed']);
    $this->dateStart = date($row['dateStart']);
    $this->estimatedFinish = date($row['estimatedFinish']);
    $this->processStep = ($row['processStep']);
    $this->contactName = ($row['contactName']);
    $this->employeeId = ($row['employeeId']);


  }
  public static function getAllRepairs(){
  $db = new PDO(DB_SERVER, DB_USER, DB_PW);

$sql = 'SELECT * FROM repairs';



  $statement = $db->prepare($sql);

  // 3. Run the query
  $success = $statement->execute([


  ]);
  // 4. Handle the results
  $arr = [];
  while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

    // 4.a. For each row, make a new work php object
    $repairItem =  new Repairs($row);
  array_push($arr, $repairItem);
  }

  // 4.b. return the array of work objects
  return $arr;

}
public static function getRepairsByCustomer(int $customerId){
$db = new PDO(DB_SERVER, DB_USER, DB_PW);

$sql = 'SELECT * FROM repairs where customerId = ?';



$statement = $db->prepare($sql);

// 3. Run the query
$success = $statement->execute([$customerId


]);
// 4. Handle the results
$arr2 = [];
while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

  // 4.a. For each row, make a new work php object
  $repairItem2 =  new Repairs($row);
array_push($arr2, $repairItem2);
}

// 4.b. return the array of work objects
return $arr2;

}

}
