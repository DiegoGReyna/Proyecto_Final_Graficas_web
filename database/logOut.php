<?php
    session_start();
    if (isset($_SESSION['userId'])) {
        unset($_SESSION['userId']); 
        header('Location: ../index.php');
        
    } else {
        echo "No hay sesion";
        return false;
    }
?>