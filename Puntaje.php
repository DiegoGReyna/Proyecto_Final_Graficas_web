<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ventana Puntaje</title>
<link rel="stylesheet" href="css/stylePuntaje.css" type="text/css">

</head>
<body>
      <!--ventana cargando-->
      <div id="contenedor_carga">
        <div id="carga"></div>
        <h2 id="cargando">Cargando...</h2> 
      </div>

    <div class="container" >
      <table class="table table-hover table-dark table-fixed">
        <thead>
          <tr>           
            <th></th>
            <th></th>
            <th>NIVEL: DIA</th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Puntaje</th>
            <th scope="col">Tiempo</th>
            <th scope="col">Fecha</th>
          </tr>
        </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>2000</td>
                <td>30:05</td>
                <td>22/09/22</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Tessa</td>
                <td>1800</td>
                <td>50:20</td>
                <td>20/09/22</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Oscar</td>
                <td>3000</td>
                <td>30:12</td>
                <td>18/09/22</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Edna</td>
                <td>5000</td>
                <td>27:12</td>
                <td>20/09/22</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>Edna</td>
                <td>5000</td>
                <td>27:12</td>
                <td>20/09/22</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>Edna</td>
                <td>5000</td>
                <td>27:12</td>
                <td>20/09/22</td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>Tessa</td>
                <td>1800</td>
                <td>50:20</td>
                <td>20/09/22</td>
              </tr>
              
            </tbody>
      </table>

      <table class="table table-hover table-dark table-fixed">
        <thead>
          <tr>
            <tr>           
              <th></th>
              <th></th>
              <th>NIVEL: NOCHE</th>
              <th></th>
              <th></th>
            </tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Puntaje</th>
            <th scope="col">Tiempo</th>
            <th scope="col">Fecha</th>
          </tr>
        </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>jacob</td>
              <td>2000</td>
              <td>30:05</td>
              <td>20/09/22</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Martha</td>
              <td>1800</td>
              <td>50:20</td>
              <td>20/09/22</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Oscar</td>
              <td>3000</td>
              <td>30:12</td>
              <td>18/09/22</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Edna</td>
              <td>5000</td>
              <td>27:12</td>
              <td>22/09/22</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Edna</td>
              <td>5000</td>
              <td>27:12</td>
              <td>22/09/22</td>
            </tr>
            <tr>
              <th scope="row">6</th>
              <td>Edna</td>
              <td>5000</td>
              <td>27:12</td>
              <td>22/09/22</td>
            </tr>
          </tbody>
      </table>
      
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