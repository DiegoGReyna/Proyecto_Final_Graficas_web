<?php 
    session_start();

    include('db.php');

    date_default_timezone_set('America/El_Salvador');

    $email = $_POST['InpEmail'];
    $pass = $_POST['InpPassword'];

    $id;
    try{
        $connection = new DB();
        $conn = $connection->connect();

        $sql = "SELECT * FROM user";
        $stm = $conn->prepare($sql);


        $stm->execute();

        $result = $stm->fetchAll(\PDO::FETCH_ASSOC);


            foreach($result as $row)
            {
                if($row['email'] == $email)
                {
                    if($row['password'] == $pass)
                    {
                        $id = $row['id'];
                        $_SESSION["userId"]=$id;
                        //setcookie('userID', $id);
                        if(isset($_SESSION['error'])){
                            unset($_SESSION['error']);
                        }
                        header('Location: ../MainMenu.php');
                        //echo "Registro encontrado ". $_SESSION['userId'];
                    } else{
                        //echo "Registro no encontrado";
                       
                        $_SESSION['error'] = "Contraseña errónea"; 
                        header('Location: ../index.php');

                        
                    } 
                }else{
                    if(isset($_SESSION['error'])){
                        unset($_SESSION['error']);
                    }
                    $_SESSION['error'] = "El correo no existe";
                    header('Location: ../index.php');
                }
            }

       

        $conn = $connection->disconnect();

    }
    catch(PDOException $ex){
        $conn = $connection->disconnect();
        echo $ex;
    }
    $conn = $connection->disconnect();

?>