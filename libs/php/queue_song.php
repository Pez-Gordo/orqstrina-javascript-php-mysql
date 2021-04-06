<?php
include('config.php');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (isset($_POST['songTitle'])) {
    $qtitle = $_POST['songTitle'];
    
    $query = "INSERT INTO queue_list (qtitle) VALUES ('$qtitle')";
    $result = mysqli_query($conn, $query);
    exit("inserted");
} else {
    exit("error");
}
?>