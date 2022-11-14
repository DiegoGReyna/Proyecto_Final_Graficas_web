<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <script type="text/javascript" src="js/jquery-3.6.1.min.js"></script>
    <script type="text/javascript" src="js/threeJS/three.min.js"></script>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/stylePlayMultyplayer.css">
    <title>Document</title>

</head>

<body>

    <div class="ContainerMultiplayerRenders">

        <button class="BtnPause" onclick="window.location.href = 'Pause.html';"><img src="img/Pause.svg" alt="" width="40px" height="40px"></button>

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

    <script type="module" src="js/CanvasThreeJsPlayer1.js"></script>
    <script type="module" src="js/CanvasThreeJsPlayer2.js"></script>
</body>

</html>