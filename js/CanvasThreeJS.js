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
//var isPlay = true, 
var anclaje_ = true, isPlayingRn = false;
//luz focal
var spotLight
//OBJETOS
var player = new Player(0,0,0,false, false, 0);
var obst, barr, ite;
var collisions = new Collision();
var speed = new Terrain(5);
var factoryGame = new Game();
///Animaciones
var mixer;
var mixer2;
var  action;
var  action2;
///Modelos
var boat;
var water;
var Map;
var keys = {};

var isLosing=true;
var isLoaded=[false,false,false,false];
$(document).ready(function () {
  
    var box = document.querySelector('.ContainerPlayGame');
    var width = box.offsetWidth;
    var height = box.offsetHeight;
    // var width = window.innerWidth / 2;
    // var height = window.innerHeight / 2;
    clock = new THREE.Clock;
    
    // in icializamos el renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0.2, 0.3, 0.6));
    renderer.setSize(width, height);
    //inicializamos la camara
    camera = new THREE.PerspectiveCamera(
        60,
        width / height,
        0.1,
        1500
    );
    //inicializamos la esceba
    scene = new THREE.Scene();  
    // para dibujar se necesita
    //1.- Geometria:es un objeto que almecena la informacion de los vertices, indices y demas
    //2.-Material: es un objeto que alamcena la info del material como colores, texturas , iliminacion , etx
    //3.-Mesh:es un objeto que contiene la geometria y el material

    // var axesHelpert = new THREE.AxesHelper(10);
    // scene.add(axesHelpert);
    // const GridHelper= new THREE.GridHelper(10);
    // GridHelper.position.y=0.5
    // scene.add(GridHelper);
    // var orbit =new OrbitControls(camera,renderer.domElement);
    camera.position.set(0, 12, 40);
    
    // orbit.update();
     
    const BoatModelLoader=new GLTFLoader();
    BoatModelLoader.load('modelos/boat/Animated_Boat_1.glb',(model)=>{
        boat= model.scene;
        isLoaded[0]=true;
        boat.position.set(0,0,5);
        boat.name = "BoatModel"
        scene.add(boat);
        mixer= new THREE.AnimationMixer(boat);
        // mixer2= new THREE.AnimationMixer(boat);
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
        water.position.set(0,0.5,0);
        water.name="water";
        isLoaded[1]=true;
       scene.add(water)
      
    })

    const ModelLoader=new GLTFLoader();
    ModelLoader.load('modelos/city/Map.glb',(model)=>{
       
        Map=model.scene;
        Map.name="map";
        isLoaded[2]=true;
        scene.add(Map);
       
    })
    //sky dome
 var skyGeo = new THREE.SphereGeometry(1300, 25, 25); 
 var loader  = new THREE.TextureLoader(),
 texture = loader.load( "img/sky1.png" );
 texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = 4;
  texture.repeat.y = 4;

 var material = new THREE.MeshPhongMaterial({ 
  map: texture,
  });
  
  var sky = new THREE.Mesh(skyGeo, material);
  sky.material.side = THREE.BackSide;
  scene.add(sky);
    //iluminacion ambiental 
    //parametros 
    //color de la luz
    //intensidad
    var ambient = new THREE.AmbientLight(
        new THREE.Color(1, 0.6, 0.1),
        1
       
    );
    scene.add(ambient);
    //lus direccional
    var directional = new THREE.DirectionalLight(
        0xFFFFFF,
        1
       

    );
    directional.position.set(0, 12, 10);
    scene.add(directional);
    
    spotLight = new THREE.SpotLight(  0xFF5500,0.1,1000,Math.PI*0.6,0);

    spotLight.position.set(0,10,5);

    scene.add(spotLight);
 
    
   

        
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


    $("#scene-section").append(renderer.domElement);
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
        
            var ModelMap=scene.getObjectByName("map");
            var ModelWater=scene.getObjectByName("water");
          

            if(isLoaded[0]===true && isLoaded[1]===true && isLoaded[2]===true ){
                spotLight.target=boat;
    
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

                    tiempoDelta = clock.getDelta();
               
                    if (mixer){
                        mixer.update(tiempoDelta);
                    }  

                    ModelMap.position.z+=speed.speedMovementMap *tiempoDelta;
                    ModelMap.add(ModelWater);
        
                    //Colision lados
                    collisions.bounderiesCollision(player, boat);
                    //Colision final
                    collisions.finalMapCollision(player, Map, speed);
                    //Colision barries
                    if(barr.barrelCollision(player, boat))
                        document.getElementById('barrelCount').innerHTML = player.barrelCounter.toString();
                    //Colision obstaculos
                    if(!player.inmunidad){

                        if(obst.obstaclesCollisions(boat, player, speed))
                            document.getElementById('anclaCount').innerHTML = player.strikeCounter.toString();
                        
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
    
                    //Colision items (triangulos amarillos)
                    if(ite.itemsCollision(boat,player, speed)== 0)
                        document.getElementById("anclaCount").innerHTML = player.strikeCounter.toString();

            
                    if (player.inmunidad == true) {
                        player.inmunidadCounter += tiempoDelta;
                        switch(speed.speedMovementMap){
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

