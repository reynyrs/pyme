<?php
if (!isset($_SESSION)) {
    session_start();
}
if (!function_exists("Conectar")) {
    include "database.php";
    $link = Conectar();
}

function image($link,$desc,$id){
    $query = "UPDATE images SET descr = '$desc' WHERE idimg = $id";
    $resultado = mysqli_query($link, $query);
    return $resultado;
}

$id = $_REQUEST['idimg'];
$desc = $_REQUEST['desc'];


$upload = image($link,$desc,$id);
if($upload){
    $data["success"] = "Upload successful";
    echo json_encode($data);
}else{
    $data["error"] = "Error";
    echo json_encode($data);
}


mysqli_close($link);

?>