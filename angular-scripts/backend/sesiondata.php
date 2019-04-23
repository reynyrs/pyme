<?php
session_start();
if (isset($_SESSION['loginFurni']) && !empty($_SESSION['loginFurni'])) {
    $user = $_SESSION['loginFurni'];
    
        $data [] = array(
            'user' => $user,
            'auth' => true
        );
        echo json_encode($data);
} else {
    $data[] = array(
        'auth' => false
    );
    echo json_encode($data, JSON_PRETTY_PRINT);
}


?>