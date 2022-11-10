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
    <title>Ajustes</title>
</head>

<body>
    <!--ventana cargando-->
    <div id="contenedor_carga">
        <div id="carga"></div>
        <h2 id="cargando">Cargando...</h2>
    </div>

    <div class="Title">
        <h1>Ajustes</h1>
    </div>
    <div class="Container_Settigs">

        <form class="Box_Settings" action="">
            <div class="TwoBoxes">
                <div class="Container_TitleSettings">
                    <label for="">Controles</label>
                    <div class="Container_Settigs">

                        <div id="" class="ContainerImagenControles">
                            <div class="BoxImageControles">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="Container_TitleSettings">
                    <label>Volumen</label>
                    <div class="Container_Settigs">

                        <div class="Box_Volume">
                            <div class="BoxInputVolume">

                                <input class="range" type="range" name="" id="InpVolume" min="0" max="100" value="90"
                                    onchange="rangeSlide(this.value)" onmousemove="rangeSlide(this.value)">
                                <span class="VolumeLevel" id="rangeVolume">90</span>
                            </div>
                            <script type="text/javascript">
                                function rangeSlide(value) {
                                    document.getElementById('rangeVolume').innerHTML = value;
                                    localStorage.setItem("audio", value);

                                }
                            </script>

                        </div>
                    </div>
                </div>

            </div>
            <div class="TwoButtons">
                <input class="ButtonSubmit" type="submit" value="Confirmar ajuste">
                <!-- <input class="NormalButton" type="button" value="Create an account"> -->
                <input type="button" class="NormalLink" onclick="window.location.href = 'MainMenu.html';"
                    value="Cancelar">

            </div>
        </form>

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