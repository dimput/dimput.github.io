<?php 
/**
*   Membuat API MONSTER
*/

// CONNECTION DATABASE

$servename = 'localhost';
$username = 'root';
$password = '';
$db = 'api_b2';

// craete connection
$conn = new mysqli($servename,$username,$password,$db);

// check connection
if($conn->connect_error){
    die("Connection failed : " . $conn->connect_error);
}

// check get data
$id = isset($_GET['id'])? $_GET['id']: null;
$name = isset($_GET['name'])? $_GET['name']: null;
$gender = isset($_GET['gender'])? $_GET['gender']: null;

if($id!=null){
    $sql = "SELECT id, name, gender FROM monster WHERE id=".$id;
    $result = $conn->query($sql);
}
else if($name!=null){
    $sql = "SELECT id, name, gender FROM monster WHERE name=".$name;
    $result = $conn->query($sql);
}
else if($gender!=null){
    $sql = "SELECT id, name, gender FROM monster WHERE gender=".$gender;
    $result = $conn->query($sql);
}
else {
    $sql = "SELECT id, name, gender FROM monster";
    $result = $conn->query($sql);
}

$res = [];
while($data = $result->fetch_assoc()){
    array_push($res, [
        'id'    => $data['id'],
        'name'    => $data['name'],
        'gender'    => $data['gender'],
    ]);
}

$data = $result->fetch_all();

header("content-type:application/json");
echo json_encode($res);

?>