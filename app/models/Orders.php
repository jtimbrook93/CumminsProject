<?php

class Orders

{
  public $serialNumber;
  public $customerId;
  public $productName;
  public $productType;
  public $productApplication;
  public $digitalProduct;
  public $horsepower;
  public $torque;
  public $classification;
  public $size;
  public $orderStatus;



  public function __construct($data) {
   // creating a new object instance using 'id' as integer

    $this->serialNumber = ($data['serialNumber']);
    $this->customerId = intval($data['customerId']);
    $this->productName = ($data['productName']);
    $this->productType = ($data['productType']);
    $this->productApplication = ($data['productApplication']);
    $this->digitalProduct = ($data['digitalProduct']);
    $this->horsepower = ($data['horsepower']);
    $this->torque = ($data['torque']);
    $this->classification = ($data['classification']);
    $this->size = ($data['size']);
    $this->orderStatus = ($data['orderStatus']);
  }

  public function fetchAll() {

    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    $sql = 'SELECT * FROM products';
    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute(

    );

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

      // 4.a. For each row, make a new work php object
      $productsItem =  new Orders($row);
      array_push($arr, $productsItem);

    }

    // 4.b. return the array of work objects
    return $arr;
  }

public function getOrdersByCustomer(int $customerId) {

  // 1. Connect to the database
  $db = new PDO(DB_SERVER, DB_USER, DB_PW);

  // 2. Prepare the query
  $sql = 'SELECT * FROM products where customerId = ?';
  $statement = $db->prepare($sql);

  // 3. Run the query
  $success = $statement->execute([$customerId]);

  // 4. Handle the results
  $arr2 = [];
  while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

    // 4.a. For each row, make a new work php object
    $productsItem2 =  new Orders($row);
    array_push($arr2, $productsItem2);

  }

  // 4.b. return the array of work objects
  return $arr2;
}
  }
