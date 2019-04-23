<?php 
if(!isset($_SESSION)){
    session_start();
}

if (!function_exists("Conectar")) {
    include "database.php";
    $link = Conectar();
}

function Eliminar($link,$id){
	$query = "SELECT imagen FROM images WHERE idimg = $id";
    $result = mysqli_query($link, $query);
    $reg = mysqli_fetch_array($result);
    $imagen = $reg["imagen"];
    unlink($imagen);
    
	$query = "DELETE FROM images WHERE idimg = $id";
	$result = mysqli_query($link, $query);
	return $result;
}

$id = $_REQUEST['idimagen'];
$elim = Eliminar($link,$id);
if($elim) {
	$data['success'] = "Successfully removed";
	echo json_encode($data);
}else{
	$data['error'] = "An error has occurred";
	echo json_encode($data);
}

mysqli_close($link);

?>