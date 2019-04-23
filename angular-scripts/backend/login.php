<?php
if (!isset($_SESSION)) {
    session_start();
}
if (!function_exists("Conectar")) {
    include "database.php";
    $link = Conectar();
}

$user = $_REQUEST['login'];
$password = $_REQUEST['pass'];
$query = "SELECT * FROM users WHERE Iduser = '$user';";
$resultado = mysqli_query($link, $query);
$registro = mysqli_fetch_array($resultado);
if ($registro) {
    $_SESSION[$user] = $_REQUEST['login'];
    $user1= $user . "1";
    $_SESSION["$user1"] = $registro['password'];

    if (isset($_SESSION[$_REQUEST['login']])) {
        $login = $_SESSION[$_REQUEST['login']];
    }

    if ($user == $login and $password ==  $_SESSION["$user1"]) {
        $_SESSION['loginFurni'] = $user;
        $_SESSION['authFurni'] = true;

        $Json['success'] = "Bienvenido $user";
        echo json_encode($Json);
    } else {
        $Json['error'] = "Credenciales inválidas";
        echo json_encode($Json);
    }
} else {
    $Json['error'] = "Usuario no registrado";
    echo json_encode($Json);
}

mysqli_close($link);

?>
