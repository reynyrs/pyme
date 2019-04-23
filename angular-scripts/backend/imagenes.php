<?php
if (!isset($_SESSION)) {
    session_start();
}
if (!function_exists("Conectar")) {
    include "database.php";
    $link = Conectar();
}   
    $all = filter_var($_REQUEST['all'], FILTER_VALIDATE_BOOLEAN);
    if ($all == true) {
        $query = "SELECT * FROM images order by idimg";
        $result = mysqli_query($link,$query);
    } else {
        $query = "SELECT * FROM images order by idimg limit 8";
        $result = mysqli_query($link,$query);
    }
    $result = mysqli_query($link,$query);
    if (mysqli_num_rows($result)) {
        $contador = 0;
        while($reg = mysqli_fetch_array($result)){
            $id = $reg['idimg'];
            $desc = $reg['descr'];
            $foto = $reg['imagen'];
            $tipodoc = $reg['tipodoc'];
            if ($foto == null) {
                $imagen = 'http://placehold.it/200x150';
            } else {
                $imagen = 'http://ijwroofing.com/files/'.$foto;
            }
    
            $data[] = array(
                'index' => $contador,
                'id' => $id,
                'desc' => $desc,
                'imagen' => $imagen,
                'tipodoc' => $tipodoc
            );
            $contador++;
        } 
        echo json_encode($data, JSON_PRETTY_PRINT); 
    }else {
        $data[] = null;
        echo json_encode($data, JSON_PRETTY_PRINT); 
    }

?>