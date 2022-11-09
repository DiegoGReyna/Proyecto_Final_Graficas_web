<!DOCTYPE html>
<html>

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nivel</title>
    <link rel="stylesheet" href="css/styleNivel.css" type="text/css">

</head>

<body>

    <!--ventana cargando-->
    <div id="contenedor_carga">
        <div id="carga"></div>
        <h2 id="cargando">Cargando...</h2>
    </div>



    <div class="body__page">
        <h2 id="titulo">Escoge un nivel</h2>

        <div class="container__card">

            <div class="card" onclick="window.location.href = 'ModoJuego.php';">
                <div class="face front">
                    <img src="img/dia.png" alt="">
                    <h3>DIA</h3>
                </div>
                <div class="face back">
                    <h3>DIFICULTAD: FACIL</h3>
                    <p>Cielo despejado con una velocidad promedio. </p>
                </div>
            </div>

            <div class="card" onclick="window.location.href = 'ModoJuegoNoche.php';">
                <div class="face front">
                    <img src="img/noche.png" alt="">
                    <h3>NOCHE</h3>
                </div>
                <div class="face back">
                    <h3>DIFICULTAD: DIFICIL</h3>
                    <p>Cielo oscuro con una velocidad más rápida. </p>
                </div>
            </div>
        </div>

    </div>

    <!--SCRIPTS ventana cargando-->
    <script>
        var loader = document.getElementById('contenedor_carga');
        window.addEventListener("load", function() {
            loader.style.display = "none";
        })
    </script>


</body>

</html>