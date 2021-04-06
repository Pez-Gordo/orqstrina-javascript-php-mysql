<?php

include('config.php');


//echo '<pre>';
//var_dump($files);
//echo '</pre>';

$query = "DROP TABLE full_list";
$result = mysqli_query($conn, $query);

$query = "DROP TABLE queue_list";
$result = mysqli_query($conn, $query);




$query = "CREATE TABLE IF NOT EXISTS `full_list` (`id` int(11) NOT NULL AUTO_INCREMENT, `ftitle` varchar(50) DEFAULT NULL, `queued` tinyint(1) DEFAULT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8";
$result = mysqli_query($conn, $query);

$query = "CREATE TABLE IF NOT EXISTS `queue_list` (`id` int(11) NOT NULL AUTO_INCREMENT, `qtitle` varchar(50) DEFAULT NULL, `full_list_id` int(11) DEFAULT NULL, `played` tinyint(1) DEFAULT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8";
$result = mysqli_query($conn, $query);





//exit(json_encode($files));

?>