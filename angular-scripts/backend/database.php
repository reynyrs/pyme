<?php
function Conectar()
{   
    $pass = 'OyP2fWq.D$cm';
    $link = mysqli_connect("192.186.238.135", "infornet_roofing", "$pass", "infornet_roofing");

    if (!$link) {
        echo "ERROR ";
        echo "No se pudo conectar a la base de datos";
        exit();
    }
        return $link;
}

?>