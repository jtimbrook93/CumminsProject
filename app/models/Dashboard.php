<?php

class Dashboard
{
  public $customerId;
  public $productName;
  public $purchaseId;
  public $serialNumber;
  public $dateCollected;
  public $airMassFlowRate;
  public $fuelMassFlowRate;
  public $drag;
  public $thrust;
  public $fuelBurned;
  public $fuelEfficiency;
  public $noxLevels;
  public $momentumChangeAMF;
  public $momentumChangeFMF;
  public $energyBalance;
  public $propulsiveEfficiency;
  public $thermalEfficiency;


    public function __construct($data) {

     // creating a new object instance using 'id' as integer

      $this->customerId = intval($data['customerId']);
      $this->productName = ($data['productName']);
      $this->purchaseId = intval($data['purchaseId']);
      $this->serialNumber = ($data['serialNumber']);
      $this->dateCollected = ($data['dateCollected']);
      $this->airMassFlowRate = intval($data['airMassFlowRate']);
      $this->fuelMassFlowRate = intval($data['fuelMassFlowRate']);
      $this->drag = intval($data['drag']);
      $this->thrust = intval($data['thrust']);
      $this->fuelBurned = intval($data['fuelBurned']);
      $this->fuelEfficiency = intval($data['fuelEfficiency']);
      $this->noxLevels = intval($data['noxLevels']);
      $this->momentumChangeAMF = intval($data['momentumChangeAMF']);
      $this->momentumChangeFMF = intval($data['momentumChangeFMF']);
      $this->energyBalance = intval($data['energyBalance']);
      $this->propulsiveEfficiency = intval($data['propulsiveEfficiency']);
      $this->thermalEfficiency = intval($data['thermalEfficiency']);


    }
    public function getData(int $customerId, $productName, $serialNumber) {

      // 1. Connect to the database
      $db = new PDO(DB_SERVER, DB_USER, DB_PW);

      // 2. Prepare the query
      $sql = 'SELECT * from myProducts where customerId = ? and productName = ? and serialNumber = ? order by dateCollected asc';

      $statement = $db->prepare($sql);

      // 3. Run the query
      $success = $statement->execute([$customerId, $productName, $serialNumber]);

      // 4. Handle the results
      $arr = [];
      while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

        // 4.a. For each row, make a new work php object
        $engineItem =  new Dashboard($row);
        array_push($arr, $engineItem);

      }

      // 4.b. return the array of work objects
      return $arr;
    }

    }
