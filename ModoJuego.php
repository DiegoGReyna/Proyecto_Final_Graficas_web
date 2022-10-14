<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modo de Juego</title>
    <link rel="stylesheet" href="css/styleMJ.css">


</head>

<body>
    <!--ventana cargando-->
    <div id="contenedor_carga">
        <div id="carga"></div>
        <h2 id="cargando">Cargando...</h2>
    </div>


    <div class="body__page">
        <h2>Modo de juego</h2>
        <div class="container__card">

            <div class="card c1">
                <div class="icon">
                    <img src="img/jugador1.jpg" alt="" onclick="window.location.href = 'Play.php';">
                </div>
                <div class="info__description">
                    <p>Single player</p>
                    <p>Objetivo: Recolectar los barriles y llegar a la meta.</p>
                    <p>Evita chocar contra un obstáculo que puede hacer que pierdas tus puntos o el juego.</p>
                </div>
            </div>

            <div class="card c2">
                <div class="icon">
                    <img src="img/jugador2.jpg" alt="" onclick="window.location.href = 'PlayMultyPlayer.php';">
                </div>
                <div class="info__description">
                    <p>Multiplayer</p>
                    <p>Objetivo: Recolectar mas barriles que el otro jugador.</p>
                    <p>Evita chocar contra un obstáculo que puede hacer que pierdas tus puntos o la partida .</p>
                </div>
            </div>
        </div>

    </div>

    <!--SCRIPTS ventana cargando-->
    <script>
        var loader = document.getElementById('contenedor_carga');
        window.addEventListener("load", function () {
            loader.style.display = "none";
        })
    </script>

</body>

</html>