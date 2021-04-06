<?php
include('config.php');

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
else
    exit('0'); 


?>