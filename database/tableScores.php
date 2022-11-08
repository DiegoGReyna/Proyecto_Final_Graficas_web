<?php 
    include('db.php');
    session_start();
    date_default_timezone_set('America/Monterrey');

    $score = $_POST['score'];
    $hoy = date('Y-m-d H:i:s');
    $id = $_SESSION['userId'];

    try{
        $connection = new DB();
        $conn = $connection->connect();

        $sql = 'UPDATE user SET score=?, scoreDate=? WHERE id = ?';
        $stm = $conn->prepare($sql);

        $stm->bindParam(1, $score, PDO::PARAM_INT);
        $stm->bindParam(2, $hoy, PDO::PARAM_STR);
        $stm->bindParam(3, $id, PDO::PARAM_INT);

        if($stm->execute())
        {
            echo "Edicion exitosa";
            unset($_SESSION['userId']); 
            $conn = $connection->disconnect();
    
            header('Location: ../MainMenu.php.');
        }

    }
    catch(PDOException $ex){
        $conn = $connection->disconnect();
        echo $ex;
    }
    $conn = $connection->disconnect();


?>