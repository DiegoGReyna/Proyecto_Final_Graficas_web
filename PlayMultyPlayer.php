<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <script type="text/javascript" src="js/jquery-3.6.1.min.js"></script>
    <script type="text/javascript" src="js/threeJS/three.min.js"></script>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/stylePlayMultyplayer.css">
    <link rel="stylesheet" href="css/pauseStyle.css">
    <title>Document</title>
    <script type="module" src="js/CanvasThreeJsPlayer1.js"></script>
</head>

<body>

    <div class="ContainerMultiplayerRenders">
        
        <button id= "btnPause" class="BtnPause" >
            <img src="img/Pause.svg" alt="" width="40px" height="40px">
        </button>

        <div class="ContainerPlayer1" id="scene-sectionPlayer1">
            <label class="labelCanvasPlayer" for="">Jugador 1</label>
                <div class="ContainerWidget" style="position: absolute" top="470px" left="12px">
                <!-- icons pantalla -->
                <table>
                    <tr>
                        <th style="padding-left: 30px; padding-right:10px"> <img src="img/imgscore.png" width="100px" height="30px"></th>
                        <th style="padding-left: 10px;"><img src="img/barril.png" width="70px" height="50px"></th>
                        <th style="padding-left: 10px;"><img src="img/ancla.png" width="70px" height="50px"></th>
                    </tr>
                    <tr>
                        <td style="padding-left: 30px; padding-right:10px "><label id="pScore" >0</label></td>
                        <td><label style="padding-left: 10px" id="barrelCount">0</label>\25</td>
                        <td><label style="color:red; padding-left: 10px" >Strikes:</label></td>
                        <td><label style="color:red; padding-left: 10px" id="anclaCount">0</label></td>
                    </tr>
                </table>
                </div>
        </div>
        <div class="ContainerPlayer2" id="scene-sectionPlayer2">
            <label class="labelCanvasPlayer" for="">Jugador 2</label>
            <div class="ContainerWidget2" style="position: absolute" top="470px" left="12px">
             <!-- icons pantalla -->
            <table>
                <tr>
                    <th style="padding-left: 30px; padding-right:10px"> <img src="img/imgscore.png" width="100px" height="30px"></th>
                    <th style="padding-left: 10px;"><img src="img/barril.png" width="70px" height="50px"></th>
                    <th style="padding-left: 10px;"><img src="img/ancla.png" width="70px" height="50px"></th>
                </tr>
                <tr>
                    <td style="padding-left: 30px; padding-right:10px "><label id="pScore" >0</label></td>
                    <td><label style="padding-left: 10px" id="barrelCount">0</label>\25</td>
                    <td><label style="color:red; padding-left: 10px" >Strikes:</label></td>
                    <td><label style="color:red; padding-left: 10px" id="anclaCount">0</label></td>
                </tr>
            </table>
            </div>
        </div>

    </div>

    <audio id="musicGame" loop>
        <source src="sound/music.mp3" type="audio/mpeg">
    </audio>

    <div id="myModal" class="modal">
        
    <div class="container">
        <div id="bodyModalTableSetting" class="bodyModalTableSetting">
            <table class="tableSettings">
                <thead>
                    <tr>
                    <td class="tdStyle">PAUSA</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td class="tdStyle">
                        <input type="button" id="botonContinuar" class="btn1" value="Reunudar">
                    </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                    <td class="tdStyle">
                        <input type="button" onclick="ajustes()" class="btn2" value="Configuracion">
                    </td>

                    </tr>
                </tbody>
                <tbody>
                    <tr>
                    <td class="tdStyle">
                        <input type="button" onclick="window.location.href = 'MainMenu.php';" class="btn3" value="Salir">
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id= "bodyModalAjuste" class="volumen" style="display:none;">
            <div class="Container_TitleSettings">
                <label>Volumen</label>
                <div class="Container_Settigs">
                    <div class="Box_Volume">
                        <div class="BoxInputVolume">
                            <input class="range" type="range" name="InpVolume" id="InpVolume" min="0" max="100"
                                onchange="rangeSlide(this.value)" onmousemove="rangeSlide(this.value)">
                            <span class="VolumeLevel" id="rangeVolume">90</span>
                        </div>
                        <script type="text/javascript">
                            function rangeSlide(value) {
                                document.getElementById('rangeVolume').innerHTML = value;

                            }
                        </script>

                    </div>
                </div>
                <div class="">
                <input class="ButtonSubmit" type="button" onclick="updateVolume()" value="Confirmar ajuste">
                <!-- <input class="NormalButton" type="button" value="Create an account"> -->
                <input type="button" class="NormalLink" onclick="document.getElementById('bodyModalAjuste').style.display ='none';document.getElementById('bodyModalTableSetting').style.display ='block';"
                    value="Cancelar">
                </div>
            </div>
           
        </div>
    </div>
    <!--SCRIPTS ventana cargando-->
    <script type="text/javascript">
        document.addEventListener("DOMContentLoaded", () => {
            let val = localStorage.getItem("audio");
            if(val > 0){
                document.getElementById('musicGame').volume = (val/100);
                document.getElementById("musicGame").loop = true;
                document.getElementById('musicGame').play();

                document.getElementById('InpVolume').value = val;
                document.getElementById('rangeVolume').innerHTML = val;

            }
        });

        function updateVolume(){
            let val = document.getElementById('InpVolume').value;
            localStorage.setItem("audio", val);
            document.getElementById('bodyModalAjuste').style.display ='none';
            document.getElementById('bodyModalTableSetting').style.display ='block';
            document.getElementById('musicGame').volume = (val/100);
            document.getElementById("musicGame").loop = true;
            document.getElementById('musicGame').play();
       }

        function ajustes(){
            document.getElementById("bodyModalTableSetting").style.display = "none";
            document.getElementById("bodyModalAjuste").style.display = "block";

        }
    </script>

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

    <script type="module" src="js/CanvasThreeJsMultiplayerNormal.js"></script>
</body>

</html>