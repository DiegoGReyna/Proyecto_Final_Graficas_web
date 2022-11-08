<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/styleMainMenu.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Pacifico&display=swap" rel="stylesheet">
    <title>Main menu</title>
    <script type="text/javascript">
        document.addEventListener("DOMContentLoaded", () => {
            var score = localStorage.getItem("score");
            if(score > 0){
                localStorage.removeItem("score");
            }
        });
    </script>
</head>

<body>
    <!--ventana cargando-->
    <div id="contenedor_carga">
        <div id="carga"></div>
     <h2 id="cargando">Cargando...</h2> 
    </div>

    <div class="ContainerMainMenu">
        <!-- <div>
            <h1>aaaaaa</h1>
        </div> -->
        <div class="ContainerButtonsAnIconMainMenu">
            <div class="ContainerOneColummn">
                <!-- <button class="BtnPlay">Play</button>
                <button class="BtnClasic">Score board</button>
                <button class="BtnClasic">Settings</button>
                <button class="BtnExit">Exit</button> -->
                <a class="BtnPlay" href="Nivel.php">Jugar</a>
                <a class="BtnClasic" href="Puntaje.php">Puntuaciones</a>
                <a class="BtnClasic" href="Settings.php">Ajustes</a>
                echo '<a class="BtnExit" href="database/logOut.php" id="btnExit">Salir</a>';

            </div>
            <div class="titleMainMenu">
                <h1>Swift Boat</h1>
            </div>
        </div>

    </div>
    <!--SCRIPTS-->
    <script type="text/javascript" src="js/jquery-3.6.1.min.js"></script>
    <script type="text/javascript" src="js/exit.js"></script>
    
     <!--SCRIPTS ventana cargando-->
     <script>  
        var loader = document.getElementById('contenedor_carga');
        window.addEventListener("load",function(){
            loader.style.display = "none";
        })
    </script> 

</body>

</html>