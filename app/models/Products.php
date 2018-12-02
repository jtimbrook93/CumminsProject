<?php

class Products

{
  public $serialNumber;
  public $productName;
  public $productType;
  public $productApplication;
  public $digitalProduct;
  public $horsepower;
  public $torque;
  public $classification;
  public $size;



  public function __construct($data) {
   // creating a new object instance using 'id' as integer

    $this->serialNumber = ($data['serialNumber']);
    $this->productName = ($data['productName']);
    $this->productType = ($data['productType']);
    $this->productApplication = ($data['productApplication']);
    $this->digitalProduct = ($data['digitalProduct']);
    $this->horsepower = ($data['horsepower']);
    $this->torque = ($data['torque']);
    $this->classification = ($data['classification']);
    $this->size = ($data['size']);
  }

  public static function fetchAll() {

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
      $productsItem =  new Products($row);
      array_push($arr, $productsItem);

    }

    // 4.b. return the array of work objects
    return $arr;
  }

  }
