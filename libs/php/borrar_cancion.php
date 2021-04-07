<?php
include('config.php');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);



if(isset($_POST['qtitle'])) {
    $qtitle = $_POST['qtitle'];
    $query = "DELETE FROM queue_list where qtitle = '$qtitle'";
    $result = mysqli_query($conn, $query);
    
}


    