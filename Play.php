<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <script type="text/javascript" src="js/jquery-3.6.1.min.js"></script>
    <script type="text/javascript" src="js/threeJS/three.min.js"></script>

    <!-- <script type="text/javascript" src="js/threeJS/three.module.js"></script> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="css/stylePlay.css"> -->
    <link rel="stylesheet" href="css/StylePlays.css">
    <title>Document</title>
    <script type="module" src="js/CanvasThreeJS.js"></script>

<body>
    <!--ventana cargando-->
    <div id="contenedor_carga">
        <div id="carga"></div>
        <h2 id="cargando">Cargando...</h2>
    </div>

    <div class="ContainerPlayGame" id="scene-section" style="position: relative">
        <button class="BtnPause">
            <img src="img/Pause.svg" alt="" width="40px" height="40px">
        </button>
    </div>
    <div class="ContainerWidget" style="position: absolute" top="470px" left="12px">
        <!-- icons pantalla -->
        <table>
            <tr>
                <!--<th><img src="img/esfera_Naranja2.png" width="65px" height="50px"></th>-->
                <!--<th><img src="img/esfera_Roja2.png" width="65px" height="50px"></th>-->
                <!--<th><img src="img/piramide2.png" width="65px" height="50px"></th>-->
                <th style="padding-left: 30px; padding-right:10px"> <img src="img/imgscore.png" width="100px" height="30px"></th>

                <th style="padding-left: 10px;"><img src="img/barril.png" width="70px" height="50px"></th>
                <th style="padding-left: 10px;"><img src="img/ancla.png" width="70px" height="50px"></th>

            </tr>
            <tr>
                <!--<td><label id="yellowSphereCount">0</label></td>-->
                <!--<td><label id="redSphereCount">0</label></td>-->
                <!--<td><label id="piramideCount">0</label></td>-->
                <td style="padding-left: 30px; padding-right:10px"><label id="pScore">0</label></td>
                <td><label style="padding-left: 10px" id="barrelCount">0</label>\25</td>
                <td><label style="padding-left: 10px" id="anclaCount">0</label></td>
            </tr>
        </table>
    </div>
 
    <audio id="musicGame" loop>
        <source src="sound/music.mp3" type="audio/mpeg">
    </audio>


    <!--SCRIPTS ventana cargando-->
    <script type="text/javascript">
        document.addEventListener("DOMContentLoaded", () => {
            let val = localStorage.getItem("audio");
            if(val > 0){
                document.getElementById('musicGame').volume = (val/100);
                document.getElementById("musicGame").loop = true;
                document.getElementById('musicGame').play();
            }
        });
    </script>
    <script>
        var loader = document.getElementById('contenedor_carga');
        window.addEventListener("load", function() {
            loader.style.display = "none";
        })
    </script>
</body>

</html>