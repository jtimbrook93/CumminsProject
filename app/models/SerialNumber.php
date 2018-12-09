<?php

class SerialNumber
{

  public $serialNumber;



  public function __construct($data) {
   // creating a new object instance using 'id' as integer


    $this->serialNumber = ($data['serialNumber']);



  }
  public function getSerialNumber(int $customerId, $productName) {

    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    //TODO: change this query
    $sql = 'SELECT DISTINCT(serialNumber) as serialNumber
       from myProducts where customerId = ? and productName = ?';

    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute([$customerId, $productName]);

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

      // 4.a. For each row, make a new work php object
      $serialNumberItem =  new SerialNumber($row);
      array_push($arr, $serialNumberItem);

    }

    // 4.b. return the array of work objects
    return $arr;
  }

  }
