<?php
ini_set('display_errors', 1);

ini_set('display_startup_errors', 1);

error_reporting(E_ALL);


$nombre = $_FILES['audio']['name'];
$guardado = $_FILES['audio']['tmp_name'];

if(!file_exists('../../audio')) {
    mkdir('../../audio', 0777, true);
    if(file_exists('../../audio')) {
        if(move_uploaded_file($guardado, '../../audio/'.$nombre)) {
            echo "File uploaded";
        } else {
            echo "Upload failed";
        }
    }
} else {
    if(move_uploaded_file($guardado, '../../audio/'.$nombre)) {
        echo "File uploaded";
    } else {
        echo "Upload failed";
    }
}
?>

    <form action="../../index.html" method="post" enctype="multipart/form-data">
        
        <br><br>
        <button>Back</button>
    </form>
