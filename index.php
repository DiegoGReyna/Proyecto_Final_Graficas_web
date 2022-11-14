<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Pacifico&display=swap" rel="stylesheet">


    <title>Home</title>


</head>


<body>
    <!--ventana cargando-->
    <div id="contenedor_carga">
        <div id="carga"></div>
     <h2 id="cargando">Cargando...</h2> 
    </div>

    <div class="Title">
        <h1>Welcome to Swit Boat!</h1>
    </div>
    <div class="Container_Login">

        <form action="database/logIn.php" method="POST" onsubmit="return validate()">
            <label for="InpUser">Correo</label>
            <input class="InputTxt" type="email" name="InpEmail" id="InpEmail" placeholder="ejemplo@hotmail.com">
            <label for="InpPassword">Contraseña</label>
            <input class="InputTxt" type="password" name="InpPassword" id="InpPassword" placeholder="*****">
            <div class="TwoButtons">
                <input class="ButtonSubmit" type="submit" id="btnSubmit" value="Log in">
                <!-- <input class="NormalButton" type="button" value="Create an account"> -->
                <input type="button" class="NormalLink" onclick="window.location.href = 'CreateAccount.php';" value="Crear cuenta">

            </div>
            <label id="errorLabel" style="color: rgb(252, 81, 81); margin-top: 10px; display: none;">¡Llene los datos correctamente!</label>
            <?php 
                session_start();
                if(isset($_SESSION['error']))
                {
            ?>
                <label id="errorLabel2" style="color: rgb(252, 81, 81); margin-top: 10px; display: block;"><?php echo $_SESSION['error']?></label>
            <?php
                }else{

                }
            ?>

        </form>


    </div>

    <!--SCRIPTS-->
    <script type="text/javascript" src="js/jquery-3.6.1.min.js"></script>
    <script type="text/javascript" src="js/logIn.js"></script>

    <!--SCRIPTS ventana cargando-->
    <script>  
        var loader = document.getElementById('contenedor_carga');
        window.addEventListener("load",function(){
            loader.style.display = "none";
        })
    </script> 
</body>

</html>