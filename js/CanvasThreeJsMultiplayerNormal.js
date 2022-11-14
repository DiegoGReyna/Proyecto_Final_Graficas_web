import * as THREE from "./threeJS/three.module.js"
// import { OrbitControls } from "../jsm/controls/OrbitControls.js"
import { OrbitControls } from "./threeJS/OrbitControls.js";
import{ GLTFLoader } from "../jsm/loaders/GLTFLoader.js";
import { Player } from "../model/Player.js";
import { Obstacles } from "../model/Obstacles.js";
import { Collision } from "../model/Collision.js";
import { Barrel } from "../model/Barrel.js";
import { Terrain } from "../model/Terrain.js";
import { Item } from "../model/Item.js";
import { Game } from "../model/Game.js";

//Variables
var tiempoDelta;
var speedMovementMap = 5;
var scene;
var renderer;
var camera;
var clock;

var speedMovementMap2 = 5;
var scene2;
var renderer2;
var camera2;

//var isPlay = true, 
var anclaje_ = true, isPlayingRn = false;

//OBJETOS
var player = new Player(0,0,0,false, false, 0);
var player2 = new Player(0,0,0,false, false, 0);

var obst, obst2, barr, barr2, ite, ite2;
var collisions = new Collision();
var collisions2 = new Collision();
var speed = new Terrain(5);
var speed2 = new Terrain(5);
var factoryGame = new Game();
///Animaciones
var mixer;
var mixer2;
var  action;
var  action2;

var mixer2;
var mixer22;
var  action2;
var  action22;
///Modelos
var boat;
var water;
var Map;
var keys = {};
var boat2;
var water2;
var Map2;
var keys2 = {};

var isLosing=true;
var isLoaded=[false,false,false,false];
var isLoaded2=[false,false,false,false];

$(document).ready(function () {
    
    var box = document.querySelector('.ContainerPlayer1');
    var width = box.offsetWidth;
    var height = box.offsetHeight;
    // var width = window.innerWidth / 2;
    // var height = window.innerHeight / 2;

    var box2 = document.querySelector('.ContainerPlayer2');
    var width2 = box2.offsetWidth;
    var height2 = box2.offsetHeight;

    clock = new THREE.Clock;
    
    //*** JUGADOR UNO ***/

    // in icializamos el renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0.2, 0.3, 0.6));
    renderer.setSize(width, height);
    //inicializamos la camara
    camera = new THREE.PerspectiveCamera(
        60,
        width / height,
        0.1,
        1000
    );
    //inicializamos la esceba
    scene = new THREE.Scene();
    // para dibujar se necesita
    //1.- Geometria:es un objeto que almecena la informacion de los vertices, indices y demas
    //2.-Material: es un objeto que alamcena la info del material como colores, texturas , iliminacion , etx
    //3.-Mesh:es un objeto que contiene la geometria y el material

    var axesHelpert = new THREE.AxesHelper(10);
    scene.add(axesHelpert);
    const GridHelper= new THREE.GridHelper(10);
    GridHelper.position.y=0.5
    scene.add(GridHelper);
    var orbit =new OrbitControls(camera,renderer.domElement);
    camera.position.set(0, 12, 20);

    orbit.update();

   
    //*** JUGADOR DOS ***/

    // in icializamos el renderer
    renderer2 = new THREE.WebGLRenderer();
    renderer2.setClearColor(new THREE.Color(0.2, 0.3, 0.6));
    renderer2.setSize(width2, height2);
    //inicializamos la camara
    camera2 = new THREE.PerspectiveCamera(
        60,
        width / height,
        0.1,
        1000
    );
    //inicializamos la esceba
    scene2 = new THREE.Scene();
    // para dibujar se necesita
    //1.- Geometria:es un objeto que almecena la informacion de los vertices, indices y demas
    //2.-Material: es un objeto que alamcena la info del material como colores, texturas , iliminacion , etx
    //3.-Mesh:es un objeto que contiene la geometria y el material

    var axesHelpert2 = new THREE.AxesHelper(10);
    scene2.add(axesHelpert2);
    const GridHelper2= new THREE.GridHelper(10);
    GridHelper2.position.y=0.5
    scene2.add(GridHelper2);
    var orbit2 =new OrbitControls(camera2,renderer2.domElement);
    camera2.position.set(0, 12, 20);

    orbit2.update();

    //*** JUGADOR UNO ***/
    
    const BoatModelLoader=new GLTFLoader();
    BoatModelLoader.load('modelos/boat/Animated_Boat_1.glb',(model)=>{
        boat= model.scene;
        isLoaded[1]=true;
        boat.position.set(0,0,5);
        boat.name = "BoatModel"
        scene.add(boat);
        mixer= new THREE.AnimationMixer(boat);
       
        const clips=model.animations;
        const clip = THREE.AnimationClip.findByName(clips,'Moving_1');
        const clip2 = THREE.AnimationClip.findByName(clips,'Action');
        action = mixer.clipAction(clip);
        action2 = mixer.clipAction(clip2);
        action2.setLoop( THREE.LoopOnce );
        action.play();


    })
 
    const WaterModelLoader=new GLTFLoader();
    WaterModelLoader.load('modelos/water/water_1.0.glb',(model)=>{
        water=model.scene;
        water.name="water";
        isLoaded[2]=true;
        water.position.set(0,0.5,0);
       scene.add(water)

    })
       
    const ModelLoader=new GLTFLoader();
    ModelLoader.load('modelos/city/Map.glb',(model)=>{

        Map=model.scene;
        Map.name="map";
        isLoaded[0]=true;
        scene.add(Map);

    })
   
    
    //luz ambiental
    var ambient = new THREE.AmbientLight(
        "#FFFFFF",
        1
    );
    scene.add(ambient);
    //luz direccional
    var directional = new THREE.DirectionalLight(
        new THREE.Color(1, 0.6, 0.1),
        1

    );
    directional.position.set(0, 12, 10);
    scene.add(directional);
    // le indicamos a Threejs
    // donde queremos el canvas

    obst = new Obstacles(scene);
    barr = new Barrel(scene);
    ite = new Item(scene);
    //Obstaculos
    obst.spawnObstacles();
    //Barriles
    barr.spawnBarrels();
    //Items
    ite.spawnItems();
    
    //*** JUGADOR DOS ***/

    const BoatModelLoader2=new GLTFLoader();
    BoatModelLoader2.load('modelos/boat/Animated_Boat_1.glb',(model)=>{
        boat2= model.scene;
        isLoaded2[1]=true;
        boat2.position.set(0,0,5);
        boat2.name = "BoatModel2"
        scene2.add(boat2);
        mixer2= new THREE.AnimationMixer(boat2);
       
        const clips2=model.animations;
        const clip2 = THREE.AnimationClip.findByName(clips2,'Moving_1');
        const clip22 = THREE.AnimationClip.findByName(clips2,'Action');
        action = mixer.clipAction(clip2);
        action22 = mixer.clipAction(clip22);
        action22.setLoop( THREE.LoopOnce );
        action.play();


    })
 
    const WaterModelLoader2=new GLTFLoader();
    WaterModelLoader2.load('modelos/water/water_1.0.glb',(model)=>{
        water2=model.scene;
        water2.name="water";
        isLoaded2[2]=true;
        water2.position.set(0,0.5,0);
       scene2.add(water2)

    })
       
    const ModelLoader2=new GLTFLoader();
    ModelLoader2.load('modelos/city/Map.glb',(model)=>{

        Map2=model.scene;
        Map2.name="map";
        isLoaded2[0]=true;
        scene2.add(Map2);

    })
   
    
    //luz ambiental
    var ambient2 = new THREE.AmbientLight(
        "#FFFFFF",
        1
    );
    scene2.add(ambient2);
    //luz direccional
    var directional2 = new THREE.DirectionalLight(
        new THREE.Color(1, 0.6, 0.1),
        1

    );
    directional2.position.set(0, 12, 10);
    scene2.add(directional2);
    // le indicamos a Threejs
    // donde queremos el canvas

    obst2 = new Obstacles(scene);
    barr2 = new Barrel(scene);
    ite2 = new Item(scene);
    //Obstaculos
    obst2.spawnObstacles();
    //Barriles
    barr2.spawnBarrels();
    //Items
    ite2.spawnItems();

    $("#scene-sectionPlayer1").append(renderer.domElement);
    $("#scene-sectionPlayer2").append(renderer2.domElement);

    document.addEventListener('keydown', onKeyDown);
	document.addEventListener('keyup', onKeyUp);
    document.getElementById("btnPause").addEventListener("click", myFunction);
    document.getElementById("botonContinuar").addEventListener("click", myFunction2);

    function myFunction() {
        factoryGame.isPaused = true;
        document.getElementById("myModal").style.display = "block";
    }
    
    function myFunction2() {
        factoryGame.isPaused = false;
        document.getElementById("myModal").style.display = "none";
        render();

    }
    
    render();

    

});

function onKeyDown(event) {

    keys[String.fromCharCode(event.keyCode)] = true;
}
function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}

function render() {
    if(player.lose == false){
        if(factoryGame.isPaused == false){
        
            requestAnimationFrame(render);
        
            if(isLoaded[0]===true && isLoaded[1]===true && isLoaded[2]===true ){
                tiempoDelta = clock.getDelta();
               
                if (mixer){
                    mixer.update(tiempoDelta);
                }  
                var ModelMap=scene.getObjectByName("map");
                var ModelWater=scene.getObjectByName("water");
                ModelMap.position.z+=speed.speedMovementMap *tiempoDelta;
                ModelMap.add(ModelWater);
    
                //Anclaje de obstaculos al mapa
                if(scene.getObjectByName("Roca_Decierto_grande_9") !== undefined &&
                scene.getObjectByName("Barril_4") !== undefined &&
                scene.getObjectByName("yellowTriangle4") !== undefined &&
                scene.getObjectByName("Glacier_9") !== undefined &&
                scene.getObjectByName("RocaLevel1_9") !== undefined
                ){
    
                    if(factoryGame.anclaje_ == true){
                        obst.anchorObstacles(Map);
                        barr.anchorBarrels(Map);
                        ite.anchorItems(Map);
                        factoryGame.anclaje_ = false;
                    }
                    if(factoryGame.isPlayingRn == false)
                        factoryGame.isPlayingRn = true;
                }

                if(factoryGame.isPlayingRn == true){
                    //Colision lados
                    collisions.bounderiesCollision(player, boat);
                    //Colision final
                    collisions.finalMapCollision(player, Map);
                    //Colision barries
                    barr.barrelCollision(player, boat);
                    //Colision obstaculos
                    if(!player.inmunidad){

                        obst.obstaclesCollisions(boat, player, speed)
                        
                        if(player.strikeCounter > 2)
                        {
                          
                            action.stop();
                            action2.play();
                            mixer.update(tiempoDelta);

                            setTimeout(() => {
                                
                                boat.position.y=-4;
                              }, 2800)

                            setTimeout(() => {
                                
                                player.lose = true;
                              }, 5000)
                              
                            
                    
                          
                              
                            
                          
                        }
    
                    }
    
                    //Colision items
                    ite.itemsCollision(boat,player, speed)

            
                    if (player.inmunidad == true) {
                        player.inmunidadCounter += tiempoDelta;
                        switch(speedMovementMap){
                            case 5:
                                if (player.inmunidadCounter >= 3.5) {
                                    player.inmunidad = false;
                                    player.inmunidadCounter = 0;
                                } 
                            break;
                            case 4: 
                                if (player.inmunidadCounter >= 4.5) {
                                    player.inmunidad = false;
                                    player.inmunidadCounter = 0;
                                }
                            break;
                            case 3: 
                                if (player.inmunidadCounter >= 5.5) {
                                    player.inmunidad = false;
                                    player.inmunidadCounter = 0;
                                }
                            break;
                        }
                        
                    }
                }
    
                document.getElementById('pScore').innerHTML = player.score.toString();
                
                
                    if (keys["A"]) {
                        
                        boat.position.x-=5 *tiempoDelta;
                    
                    } else if (keys["D"]) {
                        
                        boat.position.x +=5*tiempoDelta;
                    }else if (keys["P"]) {
                        factoryGame.isPaused = true;
                        document.getElementById("myModal").style.display = "block";
                    }
               

            
        
               
                renderer.render(scene, camera);
            }
        }
    }else{
        
          
        factoryGame.isPaused = true;
        localStorage.setItem("score", player.score)
        window.location.href = "Loser.php";
      

  
   
   

    }

    if(player.win == true){
        factoryGame.isPaused = true;
        localStorage.setItem("score", player.score)
        window.location.href = "Victory.php";
    }

}
