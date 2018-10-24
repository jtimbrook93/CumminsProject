<?php

class Turbine
{
  public $turbineId;
  public $turbineName;
  public $siteId;
  public $siteName;

    public function __construct($data) {

     // creating a new object instance using 'id' as integer

      $this->turbineId = intval($data['turbineId']);
      $this->turbineName = ($data['turbineName']);
      $this->siteId = intval($data['siteId']);
      $this->siteName = ($data['siteName']);


    }
    public function getTurbines() {

      // 1. Connect to the database
      $db = new PDO(DB_SERVER, DB_USER, DB_PW);

      // 2. Prepare the query
      $sql = 'SELECT turbineId, turbineName, siteId, siteName
              FROM Site, Turbine';

      $statement = $db->prepare($sql);

      // 3. Run the query
      $success = $statement->execute();

      // 4. Handle the results
      $arr = [];
      while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

        // 4.a. For each row, make a new work php object
        $turbineItem =  new Turbine($row);
        array_push($arr, $turbineItem);

      }

      // 4.b. return the array of work objects
      return $arr;
    }

    }
