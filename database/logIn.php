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

        echo $email. " ". $pass;
        $stm->execute();

        $result = $stm->fetchAll(\PDO::FETCH_ASSOC);
    
        
            foreach($result as $row)
            {
                //echo " OAA: ".$row['email']."  ".$row['password'];

                if($row['email'] == $email && $row['password'] == $pass)
                {
                    $id = $row['id'];
                    $_SESSION["userId"]=$id;
                    if(isset($_SESSION['error'])){
                        unset($_SESSION['error']);
                    }
                    //echo " NO ERROR";
                    header('Location: ../MainMenu.php');
                    die(); 
                }else{
                    if(isset($_SESSION['error'])){
                        unset($_SESSION['error']);
                    }
                    //echo "  ERROR";

                    $_SESSION['error'] = "Ingresa datos válidos";
                    header('Location: ../index.php');
                    die(); 
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