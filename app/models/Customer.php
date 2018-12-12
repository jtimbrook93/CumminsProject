<?php

class Customer

{
  public $Id;
  public $customerName;
  public $customerSince;
  public $primaryContactName;
  public $primaryContactNumber;


  public function __construct($data) {
   // creating a new object instance using 'id' as integer

    $this->Id = intval($data['Id']);
    $this->customerName = ($data['customerName']);
    $this->customerSince = date($data['customerSince']);
    $this->primaryContactName = ($data['primaryContactName']);
    $this->primaryContactNumber = intval($data['primaryContactNumber']);

  }

  public function fetchAll(int $Id) {

    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM customers where Id = ?';
    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute([$Id]);

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

      // 4.a. For each row, make a new work php object
      $customerItem =  new Customer($row);
      array_push($arr, $customerItem);

    }

    // 4.b. return the array of work objects
    return $arr;
  }
  public function fetchCustomers() {

    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM customers';
    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute();

    // 4. Handle the results
    $arr2 = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

      // 4.a. For each row, make a new work php object
      $customerItem2 =  new Customer($row);
      array_push($arr2, $customerItem2);

    }

    // 4.b. return the array of work objects
    return $arr2;
  }

  }
