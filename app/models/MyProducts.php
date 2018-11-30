<?php

class MyProducts
{
  public $customerId;
  public $serialNumber;
  public $productName;
  public $purchaseId;


  public function __construct($data) {
   // creating a new object instance using 'id' as integer

    $this->customerId = intval($data['customerId']);
    $this->serialNumebr = intval($data['serialNumber']);
    $this->productName = ($data['productName']);
    $this->purchaseId = intval($data['purchaseId']);


  }
  public function getAllProducts() {

    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    //TODO: change this query
    $sql = 'SELECT customerId, serialNumber, productName, purchaseId
            FROM myProducts;';
    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute();

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

      // 4.a. For each row, make a new work php object
      $myProductItem =  new MyProduct($row);
      array_push($arr, $myProductItem);

    }

    // 4.b. return the array of work objects
    return $arr;
  }

  }
