<?php
include('config.php');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);



$query = "SELECT qtitle FROM queue_list";
$result = mysqli_query($conn, $query);

if ($result->num_rows > 0) {
    $rawData = array();
    $i = 0;
    while($data = $result->fetch_array()) {
        $rawData[$i] = $data;
        $i++;    
    }
    exit(json_encode($rawData));
}
else {
    exit('0'); 
}

    


?>