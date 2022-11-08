<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/stylevictory.css">
    <title>Ventana WINNER</title>
    <script type="text/javascript" src="js/facebook.js"> </script>
    <script type="text/javascript">
    function share(){
        var score = localStorage.getItem("score");
        shareScore(score)
    }
    </script>

</head>
<body>
     <!--ventana cargando-->
     <div id="contenedor_carga">
        <div id="carga"></div>
        <h2 id="cargando">Cargando...</h2>
    </div>

    <section class="modal">
        <div class="modal-container">
            <h2 class="title" >WINNER</h2>
            
            <div class="paragraph">
                <h3>Puntaje</h3>
                <h3 >2000</h3>
            </div>
            <div class="btns">
                <button class="open-view" onclick="window.location.href = 'MainMenu.php';" >Continuar</button>
                <button onclick="share();" class="open-guide">Compartir</button>
            </div>
    </section>
    <!--SCRIPTS ventana cargando-->    
    <script>
        var loader = document.getElementById('contenedor_carga');
        window.addEventListener("load", function() {
            loader.style.display = "none";
        })
    </script>    
</body>
</html>