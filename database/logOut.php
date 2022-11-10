<?php
    session_start();
    if (isset($_SESSION['userId'])) {
        unset($_SESSION['userId']); 
        header('Location: ../index.php');
        
        if(isset($_SESSION['error'])) {
            unset($_SESSION['error']); 
        }
    } else {
        echo "No hay sesion";
        return false;
    }
?>