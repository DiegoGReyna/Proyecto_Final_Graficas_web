<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Ventana Pause</title>
  <link rel="stylesheet" href="css/stylePause.css">
</head>

<body>

  <!--ventana cargando-->
  <div id="contenedor_carga">
    <div id="carga"></div>
    <h2 id="cargando">Cargando...</h2>
  </div>

  <div class="container">
    <table>

      <thead>
        <tr>
          <td>PAUSA</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="button" onclick="history.back();" class="btn1" value="Continuar">
          </td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td>
            <input type="button" onclick="window.location.href = 'Settings.php';" class="btn2" value="Configuracion">
          </td>

        </tr>
      </tbody>
      <tbody>
        <tr>
          <td>
            <input type="button" onclick="window.location.href = 'MainMenu.php';" class="btn3" value="Salir">
          </td>
        </tr>
      </tbody>
    </table>

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