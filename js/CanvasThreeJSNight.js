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
//Variables
var tiempoDelta;
var speedMovementMap = 5;
var scene;
var renderer;
var camera;
var clock;
//var isPlay = true, 
var anclaje_ = true, isPlayingRn = false, isPaused = false;
//OBJETOS
var player = new Player(0,0,0,false, false, 0);
var obst, barr, ite;
var collisions = new Collision();
var speed = new Terrain(5);

///Modelos
var boat;
var water;
var Map;
var keys = {};
let mixer;
var isLoaded=[false,false,false,false];
$(document).ready(function () {
  
    var box = document.querySelector('.ContainerPlayGame');
    var width = box.offsetWidth;
    var height = box.offsetHeight;
    clock = new THREE.Clock;
    var planeGeometry=new THREE.PlaneGeometry(50,50);
    var planeMaterial=new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    var plan = new THREE.Mesh(planeGeometry,planeMaterial);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0.2, 0.3, 0.6));
    renderer.setSize(width, height);
   
    camera = new THREE.PerspectiveCamera(
        60,
        width / height,
        0.1,
        1000
    );
  
    scene = new THREE.Scene();  
   

    var axesHelpert = new THREE.AxesHelper(10);
    scene.add(axesHelpert);
    const GridHelper= new THREE.GridHelper(10);
    GridHelper.position.y=0.5
    scene.add(GridHelper);
    var orbit =new OrbitControls(camera,renderer.domElement);
    camera.position.set(0, 12, 20);
    
    orbit.update();
     
    const BoatModelLoader=new GLTFLoader();
    BoatModelLoader.load('modelos/boat/Animated_Boat.glb',(model)=>{
        boat= model.scene;
        isLoaded[0]=true;
        boat.position.set(0,0,5);
        boat.name = "BoatModel"
        scene.add(boat);
        mixer= new THREE.AnimationMixer(boat);
        const clips=model.animations;
        const clip = THREE.AnimationClip.findByName(clips,'otra animacion');
        const action = mixer.clipAction(clip);
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
    
    //iluminacion ambiental 
    //parametros 
    //color de la luz
    //intensidad
    var ambient = new THREE.AmbientLight(
        "#061596",
        0.5
    );
    scene.add(ambient);
    //lus direccional
    var directional = new THREE.DirectionalLight(
        "#999DBF",
        0.4

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


    $("#scene-section").append(renderer.domElement);
    document.addEventListener('keydown', onKeyDown);
	document.addEventListener('keyup', onKeyUp);
    render();
});

function onKeyDown(event) {
    keys[String.fromCharCode(event.keyCode)] = true;
}
function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}

function render() {
    //!player.lose
    if(!player.lose){
        if(!isPaused){
        
            requestAnimationFrame(render);
        
            if(isLoaded[0]===true && isLoaded[1]===true && isLoaded[2]===true ){
                tiempoDelta = clock.getDelta();
                        
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
    
                    if(anclaje_){
                        obst.anchorObstacles(Map);
                        barr.anchorBarrels(Map);
                        ite.anchorItems(Map);
                        anclaje_ = false;
                    }
                    if(!isPlayingRn)
                        isPlayingRn = true;
                }

                if(isPlayingRn){
                    //Colision lados
                    collisions.bounderiesCollision(player, boat);
                    //Colision final
                    collisions.finalMapCollision(player, boat);
                    //Colision barries
                    barr.barrelCollision(player, boat);
                    //Colision obstaculos
                    if(!player.inmunidad){

                        obst.obstaclesCollisions(boat, player, speed)
                        
                        if(player.strikeCounter > 2)
                        {
                            player.lose = true;
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
                }else if (keys["L"]) {
                   
                }
        
               
                renderer.render(scene, camera);
            }
        }
    }else{
        //isPlay = false;
        localStorage.setItem("score", player.score)
        window.location.href = "Loser.php";
    }   
    
}