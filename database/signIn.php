<?php 
    include('db.php');

    date_default_timezone_set('America/Monterrey');

    $email = $_POST['InpEmail'];
    $user = $_POST['InpUser'];
    $pass = $_POST['InpPassword'];
    $hoy = date('Y-m-d H:i:s');

    try{
        $connection = new DB();
        $conn = $connection->connect();

        $sql = 'INSERT INTO user(username,email,password,createdAt)VALUES(?,?,?,?)';
        $stm = $conn->prepare($sql);

        $stm->bindParam(1, $user, PDO::PARAM_STR);
        $stm->bindParam(2, $email, PDO::PARAM_STR);
        $stm->bindParam(3, $pass, PDO::PARAM_STR);
        $stm->bindParam(4, $hoy, PDO::PARAM_STR);

        $stm->execute();
        echo "Registro exitoso";
        $conn = $connection->disconnect();

        header('Location: ../index.php');

    }
    catch(PDOException $ex){
        $conn = $connection->disconnect();
        echo $ex;
    }
    $conn = $connection->disconnect();


?>