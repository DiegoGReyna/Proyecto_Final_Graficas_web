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

    <title>Create an acount</title>
</head>


<body>
        <!--ventana cargando-->
        <div id="contenedor_carga">
            <div id="carga"></div>
        <h2 id="cargando">Cargando...</h2> 
        </div>

    <div class="Title">
        <h1>Crear cuenta</h1>
    </div>
    <div class="Container_CreateAcount">

        <form id="formCreateAccount" method="POST" action="database/signIn.php" onsubmit="return validation()">
            <label for="InpEmail">Correo</label>
            <input class="InputTxt" type="email" name="InpEmail" id="InpEmail" placeholder="ejemplo@hotmail.com">

            <label for="InpUser">Nombre de usuario</label>
            <input class="InputTxt" type="text" name="InpUser" id="InpUser" placeholder="Usuario18">

            <label for="InpPassword">Contraseña</label>
            <input class="InputTxt" type="password" name="InpPassword" id="InpPassword" placeholder="*****">
            <label for="InpConfirmPassword">Confirmar contraseña</label>
            <input class="InputTxt" type="password" name="" id="InpConfirmPassword" placeholder="*****">
            <div class="TwoButtons">
                <input class="ButtonSubmit" type="submit" id="btnSubmit" value="Crear una cuenta">
                <!-- <input class="NormalButton" type="button" value="Back to Log in"> -->
                <input type="button" class="NormalLink" onclick="window.location.href = 'index.php';" value="Entrar">
            </div>
            <label id="errorLabel" style="color: rgb(252, 81, 81); margin-top: 10px; display: none;">¡Llene los datos correctamente!</label>
            <label id="errorLabel2" style="color: rgb(252, 81, 81); margin-top: 10px; display: none;">¡Las contraseñas no coinciden!</label>
        </form>


    </div>

    <!--SCRIPTS-->
    <script type="text/javascript" src="js/jquery-3.6.1.min.js"></script>
    <script type="text/javascript" src="js/createAccount.js"></script>
    <script type="text/javascript" src="model/user.js"></script>
    <!--SCRIPTS ventana cargando-->
    <script> 
        var loader = document.getElementById('contenedor_carga');
        window.addEventListener("load",function(){
            loader.style.display = "none";
        })
    </script> 
</body>

</html>