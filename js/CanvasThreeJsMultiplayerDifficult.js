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

var spotLight2;
var spotLight;

var speedMovementMap2 = 5;
var scene2;
var renderer2;
var camera2;

//var isPlay = true, 
var anclaje_ = true, isPlayingRn = false;
var playerOneCrashed = false, playerTwoCrashed = false;
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
  

    var box2 = document.querySelector('.ContainerPlayer2');
    var width2 = box2.offsetWidth;
    var height2 = box2.offsetHeight;

    clock = new THREE.Clock;
    
    //*** JUGADOR UNO render***/

    // in icializamos el renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0.2, 0.3, 0.6));
    renderer.setSize(width, height);
    //**Jugador 2 render */
    renderer2 = new THREE.WebGLRenderer();
    renderer2.setClearColor(new THREE.Color(0.2, 0.3, 0.6));
    renderer2.setSize(width2, height2);

    //inicializamos la camara jugador 1
    camera = new THREE.PerspectiveCamera(
        60,
        width / height,
        1,
        1500
    );
    //inicializamos la camara jugador 2
    camera2 = new THREE.PerspectiveCamera(
        60,
        width2 / height2,
        1,
        1500
    );
   
    // camera.update()
    // camera2.update()
    scene = new THREE.Scene();
    /*Camararas*/
    camera.position.set(0, 12, 40);
    camera2.position.set(300, 12, 40);

    
    
    //*** Modelos JUGADOR UNO ***/
    
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
        "#061596",
        0.09
    );
    scene.add(ambient);
    //luz direccional
    var directional = new THREE.DirectionalLight(
        "#5B67CA",
        0.2

    );

    directional.position.set(0, 12, 10);
    scene.add(directional);

    spotLight = new THREE.SpotLight( 0xFFFFFF,2,200,Math.PI*0.15,0.4,1);

    spotLight.position.set(0,5,30);

    scene.add(spotLight);

    spotLight2 = new THREE.SpotLight( 0xFFFFFF,2,200,Math.PI*0.15,0.4,1);

    spotLight2.position.set(300,5,30);
    

    scene.add(spotLight2);
console.log(spotLight2.position);
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
    
    //*** Modelos JUGADOR DOS ***/

    const BoatModelLoader2=new GLTFLoader();
    BoatModelLoader2.load('modelos/boat/Animated_Boat_2.glb',(model)=>{
        boat2= model.scene;
        isLoaded2[1]=true;
        boat2.position.set(0,0,5);
        boat2.name = "BoatModel2"
        scene.add(boat2);
        boat2.position.x=300;
        mixer2= new THREE.AnimationMixer(boat2);
       
        const clips2=model.animations;
        const clip2 = THREE.AnimationClip.findByName(clips2,'Moving_1');
        const clip22 = THREE.AnimationClip.findByName(clips2,'Action');
        action2 = mixer2.clipAction(clip2);
        action22 = mixer2.clipAction(clip22);
        action22.setLoop( THREE.LoopOnce );
        
        action2.play();


    })
 
    const WaterModelLoader2=new GLTFLoader();
    WaterModelLoader2.load('modelos/water/water_1.0.glb',(model)=>{
        water2=model.scene;
        water2.name="water2";
        isLoaded2[2]=true;
        water2.position.set(0,0.5,0);
       scene.add(water2)
       water2.position.x=50;

    })
       
    const ModelLoader2=new GLTFLoader();
    ModelLoader2.load('modelos/city/Map.glb',(model)=>{

        Map2=model.scene;
        Map2.name="map2";
        isLoaded2[0]=true;
        scene.add(Map2);
        Map2.position.x=300;

    })
   /*Sky dome*/
   var skyGeo = new THREE.SphereGeometry(1400, 25, 25); 
 var loader  = new THREE.TextureLoader(),
 texture = loader.load( "img/Starbasesnow.png" );
 texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x =6;
  texture.repeat.y =6;

 var material = new THREE.MeshPhongMaterial({ 
  map: texture,
  });
  
  var sky = new THREE.Mesh(skyGeo, material);
  sky.material.side = THREE.BackSide;
  scene.add(sky);
  sky.rotateY(90);
  sky.position.y=-300;
  sky.position.z=-100;
    
    
    // le indicamos a Threejs
    // donde queremos el canvas

    obst2 = new Obstacles(scene);
    barr2 = new Barrel(scene);
    ite2 = new Item(scene);
    //Obstaculos
    obst2.spawnObstacles2();
    //Barriles
    barr2.spawnBarrels2();
    //Items
    ite2.spawnItems2();

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
    keys2[event.keyCode] = true;
}
function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
    keys2[event.keyCode] = false;
}

function render() {
    if(player.win == false || player2.win == false){
        if(factoryGame.isPaused == false){
        
            requestAnimationFrame(render);
        
            var ModelMap=scene.getObjectByName("map");
            var ModelWater=scene.getObjectByName("water");
            var ModelMa2=scene.getObjectByName("map2");
            var ModelWater2=scene.getObjectByName("water2");

            if(isLoaded2[1] === true && isLoaded2[2]===true && isLoaded2[0]===true&&isLoaded[0]===true && isLoaded[1]===true && isLoaded[2]===true ){
                spotLight2.target=boat2;
                spotLight.target=boat;
                //Anclaje de obstaculos al mapa
                if(scene.getObjectByName("Roca_Decierto_grande_9") !== undefined &&
                scene.getObjectByName("Barril_4") !== undefined &&
                scene.getObjectByName("yellowTriangle4") !== undefined &&
                scene.getObjectByName("Glacier_9") !== undefined &&
                scene.getObjectByName("RocaLevel1_9") !== undefined &&

                scene.getObjectByName("Roca_Decierto_grande_19") !== undefined &&
                scene.getObjectByName("Glacier_19") !== undefined &&
                scene.getObjectByName("RocaLevel1_19") !== undefined &&
                scene.getObjectByName("Barril_49") !== undefined
                
                ){
                        
                    if(factoryGame.anclaje_ == true){
                        obst.anchorObstacles2(Map);
                        barr.anchorBarrels2(Map);
                        ite.anchorItems2(Map);

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
                    if (mixer2){
                        mixer2.update(tiempoDelta);
                        
                    }  

                    ModelMap.position.z=ModelMap.position.z +(speed.speedMovementMap *tiempoDelta);
                    ModelMa2.position.z=ModelMa2.position.z + (speed2.speedMovementMap *tiempoDelta);
                    ModelMa2.add(ModelWater2);
                    ModelMap.add(ModelWater);    

                    //Colision lados
                    collisions.bounderiesCollision(player, boat);
                    collisions.bounderiesCollision2(player2, boat2);
                    //Colision final
                    collisions.finalMapCollision(player, Map, speed);
                    collisions.finalMapCollision(player2, Map2, speed2);

                    //Colision barries
                    if(barr.barrelCollision(player, boat))
                        document.getElementById('barrelCount').innerHTML = player.barrelCounter.toString();
                    if(barr.barrelCollision(player2, boat2))
                        document.getElementById('barrelCount2').innerHTML = player2.barrelCounter.toString();

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

                    //Colision obstaculos
                    if(!player2.inmunidad){

                        if(obst.obstaclesCollisions(boat2, player2, speed2))
                            document.getElementById('anclaCount2').innerHTML = player2.strikeCounter.toString();

                        if(player2.strikeCounter > 2)
                        {
                            
                            action.stop();
                            action2.play();
                            mixer.update(tiempoDelta);

                            setTimeout(() => {
                                
                                boat2.position.y=-4;
                                }, 2800)

                            setTimeout(() => {
                                
                                player2.lose = true;
                                }, 5000)
                            
                        }
    
                    }
    
                    //Colision items (triangulos amarillos)
                    if(ite.itemsCollision(boat,player, speed)== 0)
                        document.getElementById("anclaCount").innerHTML = player.strikeCounter.toString();
                    if(ite.itemsCollision(boat2,player2, speed2)== 0)
                        document.getElementById("anclaCount2").innerHTML = player2.strikeCounter.toString();

            
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

                    if (player2.inmunidad == true) {
                        player2.inmunidadCounter += tiempoDelta;
                        switch(speed2.speedMovementMap){
                            case 5:
                                if (player2.inmunidadCounter >= 3.5) {
                                    player2.inmunidad = false;
                                    player2.inmunidadCounter = 0;
                                } 
                            break;
                            case 4: 
                                if (player2.inmunidadCounter >= 4.5) {
                                    player2.inmunidad = false;
                                    player2.inmunidadCounter = 0;
                                }
                            break;
                            case 3: 
                                if (player2.inmunidadCounter >= 5.5) {
                                    player2.inmunidad = false;
                                    player2.inmunidadCounter = 0;
                                }
                            break;
                        }
                        
                    }

                    if(player.lose == true){

                        factoryGame.isPaused = true;
                        playerOneCrashed = true;
                                                   
                    }else if(player2.lose == true){

                        factoryGame.isPaused = true;
                        playerTwoCrashed = true;

                    }
                }
    
                document.getElementById('pScore').innerHTML = player.score.toString();
                document.getElementById('pScore2').innerHTML = player2.score.toString();

                
                    if (keys["A"]) {
                        
                        boat.position.x-=5 *tiempoDelta;
                    
                    } else if (keys["D"]) {
                        
                        boat.position.x +=5*tiempoDelta;
                    }else if (keys["P"]) {
                        factoryGame.isPaused = true;
                        document.getElementById("myModal").style.display = "block";
                    }

                    if (keys2[37]) {
                        boat2.position.x-=5 *tiempoDelta;
                    
                    } else if (keys2[39]) {
                        boat2.position.x +=5 *tiempoDelta;
                    }
            
               

            
        
                renderer2.render(scene, camera2);
                renderer.render(scene, camera);
                
            }
        }else{
            if(playerOneCrashed){
                localStorage.setItem("score", player.score)
                localStorage.setItem("score2", player2.score)
                localStorage.setItem("jugador", 'Jugador 2')
    
            }else if(playerTwoCrashed){

                localStorage.setItem("score", player.score)
                localStorage.setItem("jugador", 'Jugador 1')
            }

            window.location.href = "Victory.php";

        }
    }else{
        
          
        factoryGame.isPaused = true;

        if(player.score > player2.score){
            localStorage.setItem("score", player.score)
            localStorage.setItem("jugador", 'Jugador 1')

            window.location.href = "Victory.php";
        }else if(player.score < player2.score){
            localStorage.setItem("score", player.score)
            localStorage.setItem("score2", player2.score)
            localStorage.setItem("jugador", 'Jugador 2')

            window.location.href = "Victory.php";
           
        }else{
            localStorage.setItem("score", player.score)
            localStorage.setItem("jugador", 'Jugador 1')
        }
      

    }



}