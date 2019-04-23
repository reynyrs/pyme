<?php
if(!isset($_SESSION)){
    session_start();

    $data['cerrar'] = "Hasta pronto ". $_SESSION['loginFurni'];
    echo json_encode($data);

    unset($_SESSION['loginFurni']);
}

?>