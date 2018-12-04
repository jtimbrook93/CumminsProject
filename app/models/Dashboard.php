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
    public function getData() {

      // 1. Connect to the database
      $db = new PDO(DB_SERVER, DB_USER, DB_PW);

      // 2. Prepare the query
      $sql = 'SELECT serialNumber, dateCollected, airMassFlowRate, fuelMassFlowRate,
       drag, thrust, fuelBurned, fuelEfficiency, noxLevels, momentumChangeAMF,
       momentumChangeFMF, energyBalance, propulsiveEfficiency, thermalEfficiency
       from myProducts';

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
