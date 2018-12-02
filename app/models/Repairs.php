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
    $this->reparisID = isset($row['repairID'])   ? intval($row['repaireID']) : null;


    $this->serialNumber = $row['serialNumbe'];
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
    $repairItem =  new Repair ($row);
  array_push($arr, $repairItem);
  }

  // 4.b. return the array of work objects
  return $arr;

}

// public function create() {
//   $db = new PDO(DB_SERVER, DB_USER, DB_PW);
//
// $sql = 'INSERT INTO SITE (siteId, clientId, siteName, siteDescription, primaryContact, capacity, addrLine1, addrLine2, addrCity, addrState, addrZip, addrCountry)
//         VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
//
//
//
//   $statement = $db->prepare($sql);
//
//   // 3. Run the query
//   $success = $statement->execute([
//     $this->clientId,
//     $this->siteName,
//     $this->siteDescription,
//     $this->primaryContact,
//     $this->capacity,
//     $this->addrLine1,
//     $this->addrLine2,
//     $this->addrCity,
//     $this->addrState,
//     $this->addrZip,
//     $this->addrCountry
//   ]);
//       $this->id = $db->lastInsertId();
// }
//
//   public static function getWorkByTaskId(int $taskId) {
//
//     // 1. Connect to the database
//     $db = new PDO(DB_SERVER, DB_USER, DB_PW);
//
//     // 2. Prepare the query
//     $sql = 'SELECT * FROM Work WHERE task_id = ?';
//
//     $statement = $db->prepare($sql);
//
//     // 3. Run the query
//     $success = $statement->execute(
//         [$taskId]
//     );
//
//     // 4. Handle the results
//     $arr = [];
//     while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
//
//       // 4.a. For each row, make a new work php object
//       $workItem =  new Work($row);
//       array_push($arr, $workItem);
//     }
//
//     // 4.b. return the array of work objects
//     return $arr;
//   }
}
