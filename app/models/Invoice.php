<?php

class Invoice

{
  public $invoiceNumber;
  public $createdDate;
  public $orderStatus;
  public $customerName;
  public $dueDate;
  public $serviceLine;
  public $invoiceAmount;





  public function __construct($data) {
   // creating a new object instance using 'id' as integer

    $this->invoiceNumber = intval($data['invoiceNumber']);
    $this->createdDate = date($data['createdDate']);
    $this->orderStatus = ($data['orderStatus']);
    $this->customerName = ($data['customerName']);
    $this->dueDate = date($data['dueDate']);
    $this->serviceLine = ($data['serviceLine']);
    $this->invoiceAmount = floatval($data['invoiceAmount']);

  }

  public function fetchAll() {

    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM invoice';
    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute(

    );

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

      // 4.a. For each row, make a new work php object
      $invoiceItem =  new Invoice($row);
      array_push($arr, $invoiceItem);

    }

    // 4.b. return the array of work objects
    return $arr;
  }

  public function fetchInvoiceByCustomer($customerName) {

    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM invoice where customerName = ?';
    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute([$customerName]);

    // 4. Handle the results
    $arr2 = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

      // 4.a. For each row, make a new work php object
      $invoiceByCustomerArrItem =  new Invoice($row);
      array_push($arr2, $invoiceByCustomerArrItem);

    }

    // 4.b. return the array of work objects
    return $arr2;
  }

  }
