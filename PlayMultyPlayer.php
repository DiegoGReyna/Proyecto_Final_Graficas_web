<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/stylePlayMultyplayer.css">
    <title>Document</title>
</head>

<body>

    <div class="ContainerMultiplayerRenders">

        <button class="BtnPause" onclick="window.location.href = 'Pause.php';"><img src="img/Pause.svg" alt=""
                width="40px" height="40px"></button>
        <div class="ContainerPlayer1">
            <label class="labelCanvasPlayer" for="">Jugador 1</label>
            <canvas class="CanvasPlayGame">
            </canvas>
        </div>

        <div class="ContainerPlayer2">
            <label class="labelCanvasPlayer" for="">Jugador 2</label>
            <canvas class="CanvasPlayGame">
            </canvas>
        </div>
    </div>
</body>

</html>