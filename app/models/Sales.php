<?php

class Sales

{
  public $businessSegment;
  public $percentOfRevenue;
  public $quarter1Revenue;
  public $quarter2Revenue;
  public $quarter3Revenue;
  public $quarter4Revenue;
  public $profitMargin;



  public function __construct($data) {
   // creating a new object instance using 'id' as integer

    $this->businessSegment = ($data['businessSegment']);
    $this->percentOfRevenue = ($data['percentOfRevenue']);
    $this->quarter1Revenue = intval($data['quarter1Revenue']);
    $this->quarter2Revenue = intval($data['quarter2Revenue']);
    $this->quarter3Revenue = intval($data['quarter3Revenue']);
    $this->quarter4Revenue = intval($data['quarter4Revenue']);
    $this->profitMargin = ($data['profitMargin']);

  }

  public function fetchAll($businessSegment) {

    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM sales where businessSegment = ?';
    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute([$businessSegment]);

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

      // 4.a. For each row, make a new work php object
      $salesItem =  new Sales($row);
      array_push($arr, $salesItem);

    }

    // 4.b. return the array of work objects
    return $arr;
  }
  public function fetchDEEZ() {

    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM sales';
    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute();

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

      // 4.a. For each row, make a new work php object
      $salesItem =  new Sales($row);
      array_push($arr, $salesItem);

    }

    // 4.b. return the array of work objects
    return $arr;
  }
  }
