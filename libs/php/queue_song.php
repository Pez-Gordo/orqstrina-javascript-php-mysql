<?php
include('config.php');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (isset($_POST['songTitle'])) {
    $qtitle = $_POST['songTitle'];
    
    $query = "SELECT * FROM queue_list where qtitle = '$qtitle'";
    $result = mysqli_query($conn, $query);

    if ($result->num_rows > 0) {
        echo '<script type="text/javascript">';
        echo ' alert("Song already queued")';  
        echo '</script>';
        exit();
    } else {   
        $query = "INSERT INTO queue_list (qtitle) VALUES ('$qtitle')";
        $result = mysqli_query($conn, $query);
        exit("inserted");
    }
} else {
    exit("error");
}
?>