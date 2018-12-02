<?php

class Dashboard
{
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

      $this->serialNumber = ($data['serialNumber']);
      $this->dateCollected = ($data['dateCollected']);
      $this->airMassFlowRate = ($data['airMassFlowRate']);
      $this->fuelMassFlowRate = ($data['fuelMassFlowRate']);
      $this->drag = ($data['drag']);
      $this->thrust = ($data['thrust']);
      $this->fuelBurned = ($data['fuelBurned']);
      $this->fuelEfficiency = ($data['fuelEfficiency']);
      $this->noxLevels = ($data['noxLevels']);
      $this->momentumChangeAMF = ($data['momentumChangeAMF']);
      $this->momentumChangeFMF = ($data['momentumChangeFMF']);
      $this->energyBalance = ($data['energyBalance']);
      $this->propulsiveEfficiency = ($data['propulsiveEfficiency']);
      $this->thermalEfficiency = ($data['thermalEfficiency']);


    }
    public function getData() {

      // 1. Connect to the database
      $db = new PDO(DB_SERVER, DB_USER, DB_PW);

      // 2. Prepare the query
      $sql = 'SELECT serialNumber, dateCollected, airMassFlowRate, fuelMassFlowRate,
       drag, thrust, fuelBurned, fuelEfficiency, noxLevels, momentumChangeAMF,
       momentumChangeFMF, energyBalance, propulsiveEfficiency, thermalEfficiency;
       from myProducts;';

      $statement = $db->prepare($sql);

      // 3. Run the query
      $success = $statement->execute();

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
