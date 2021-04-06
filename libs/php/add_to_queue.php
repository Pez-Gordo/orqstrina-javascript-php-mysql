<?php
include('config.php');

if (isset($_POST['qtitle'])) {
    $qtitle = $_POST['qtitle'];
    
    $query = "INSERT INTO queue_list (qtitle) VALUES ('$qtitle')";
    $result = mysqli_query($conn, $query);
}

?>