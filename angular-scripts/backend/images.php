<?php
if (!isset($_SESSION)) {
    session_start();
}
if (!function_exists("Conectar")) {
    include "database.php";
    $link = Conectar();
}

function image($link,$desc,$ubicacion,$tipo){
        $query = "INSERT into images values (default, '$desc','$ubicacion','$tipo')";
        $resultado = mysqli_query($link, $query);
        return $resultado;
}

$desc = $_POST['desc'];
$tamano = $_FILES["file"]["size"]; 
$tipo = $_FILES["file"]["type"];
$nombre = $_FILES["file"]["name"];
$prefijo = substr(md5(uniqid(rand())),0,6);
$permitidos = array("image/jpg", "image/jpeg", "image/png");
$limitekb = 512 * 1024;

if (in_array($tipo, $permitidos)) {
    if ($tamano <= $limitekb) {
        if ($tipo == "image/jpg" or $tipo == "image/png" or $tipo == "image/jpeg") {
            $extension = str_replace("image/", ".", $_FILES["file"]["type"]); 
        }elseif ($tipo == "application/pdf") {
            $extension = str_replace("application/", ".", $_FILES["file"]["type"]); 
        }
        $destino = "../../files/".$prefijo.$extension;
        $ubicacion = $prefijo.$extension;
        if (move_uploaded_file($_FILES["file"]["tmp_name"],$destino)) {
            $upload = image($link,$desc,$ubicacion,$tipo);
            if($upload){
                $data["success"] = "Upload successful";
                echo json_encode($data);
            }else{
                unlink($destino);
                $data["error"] = "Error";
                echo json_encode($data);
            }
        }else {
            $data["error"] = "Error to upload the image";
            echo json_encode($data);
        }
    } else{
    $data["error"] = "Error, exceeded size, only allowed ".round($limitekb)." KB).";
    echo json_encode($data);
  }
} else{
  $data["error"] = "Error, enter an image.";
  echo json_encode($data);
}

mysqli_close($link);

?>