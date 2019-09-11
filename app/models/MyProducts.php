<?php

class MyProducts
{

  public $productName;



  public function __construct($data) {
   // creating a new object instance using 'id' as integer


    $this->productName = ($data['productName']);



  }
  public function getAllProducts(int $customerId) {

    // 1. Connect to the database
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    // 2. Prepare the query
    //TODO: change this query
    $sql = 'SELECT DISTINCT(productName) AS productName
       from myProducts where customerId = ?';

    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute([$customerId]);

    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

      // 4.a. For each row, make a new work php object
      $myProductItem =  new MyProducts($row);
      array_push($arr, $myProductItem);

    }

    // 4.b. return the array of work objects
    return $arr;
  }

  }
