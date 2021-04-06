<?php
include('config.php');
$files = scandir('../../audio');

foreach($files as $f) {
    if ($f != '.' && $f != '..') {
        echo "Current value of \$files: $f. </br>";
        $query = "INSERT INTO full_list (ftitle, queued) VALUES ('$f', '0')";
        $result = mysqli_query($conn, $query);
       
    }
}

?>