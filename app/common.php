<?php

// change the working directory to this file.
chdir(__DIR__);
set_include_path (__DIR__);


if ($_SERVER['REQUEST_METHOD'] == 'POST'
&& stripos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
  $_POST = json_decode(file_get_contents('php://input'), true);
}

require 'environment.php';
//MODELS

require 'models/Repairs.php';
require 'models/Orders.php';
require 'models/MyProducts.php';
require 'models/Dashboard.php';
require 'models/Comment.php';
require 'models/SerialNumber.php';
require 'models/Sales.php';
require 'models/Invoice.php';
require 'models/Customer.php';
require 'models/Team.php';
require 'models/Work.php';
require 'models/WorkHoursReport.php';
require 'models/Task.php';
require 'models/Project.php';
