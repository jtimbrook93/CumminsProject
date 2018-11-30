<?php

class Comment
{
  public $id;
  public $customerId;
  public $comment;


  public function __construct($row){
    $this->id = isset($row['id']) ? intval($row['id']) : null;
    $this->customerId = ($row['customerId']);
    $this->comment = $row['comment'];
  }


  public static function getAllComments(){
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

  $sql = 'SELECT * FROM comments';



    $statement = $db->prepare($sql);

    // 3. Run the query
    $success = $statement->execute([


    ]);
    // 4. Handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {

      // 4.a. For each row, make a new work php object
      $commentItem =  new Comment($row);
      array_push($arr, $commentItem);
    }

    // 4.b. return the array of work objects
    return $arr;

  }

  public function create(){
  $db = new PDO(DB_SERVER, DB_USER, DB_PW);

$sql = 'INSERT INTO comments (id, customerId, comment)
      VALUES (?,?,?)';



$statement = $db->prepare($sql);

// 3. Run the query
$success = $statement->execute([
  $this->id,
  $this->customerId,
  $this->comment
]);
  $this->id = $db->lastInsertId();
}
  }
