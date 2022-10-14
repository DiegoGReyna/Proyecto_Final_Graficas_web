<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/stylePlay.css">
    <title>Document</title>
</head>

<body>
    <!--ventana cargando-->
    <div id="contenedor_carga">
        <div id="carga"></div>
     <h2 id="cargando">Cargando...</h2> 
    </div>

    <div class="ContainerPlayGame">
        <button class="BtnPause" onclick="window.location.href = 'Pause.php';"><img src="img/Pause.svg" alt="" width="40px" height="40px"></button>
        <canvas class="CanvasPlayGame">

        </canvas>

    </div>
    <!--SCRIPTS ventana cargando-->
    <script> 
        var loader = document.getElementById('contenedor_carga');
        window.addEventListener("load",function(){
            loader.style.display = "none";
        })
    </script> 
</body>

</html>