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
var scene2;
var renderer;
var camera;
var clock;
//var isPlay = true, 
var anclaje_ = true, isPlayingRn = false;

//OBJETOS
var player = new Player(0,0,0,false, false, 0);
var obst, barr, ite;
var collisions = new Collision();
var speed = new Terrain(5);
var factoryGame = new Game();
///Animaciones
var  action;
var  action2;
var mixer;
var mixer2;
///Modelos
var boat2;
var water;
var Map;
var keys = {};

var isLosing=true;
var isLoaded=[false,false,false,false];
$(document).ready(function () {
    
    var box = document.querySelector('.ContainerPlayer1');
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
        1000
    );
    //inicializamos la esceba
    scene2 = new THREE.Scene();

    // para dibujar se necesita
    //1.- Geometria:es un objeto que almecena la informacion de los vertices, indices y demas
    //2.-Material: es un objeto que alamcena la info del material como colores, texturas , iliminacion , etx
    //3.-Mesh:es un objeto que contiene la geometria y el material
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(0.7, 0, 0),
    });
  
    var material2 = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0.5, 0.5, 0.5),
        specular: new THREE.Color(1, 1, 1),
        shininess: 500,
    });
    

    var axesHelpert = new THREE.AxesHelper(10);
    scene2.add(axesHelpert);
    const GridHelper= new THREE.GridHelper(10);
    GridHelper.position.y=0.5
    scene2.add(GridHelper);
    var orbit =new OrbitControls(camera,renderer.domElement);
    camera.position.set(0, 12, 20);
    orbit.update();
   
    const BoatModelLoader=new GLTFLoader();
    BoatModelLoader.load('modelos/boat/Animated_Boat_2.glb',(model)=>{
        boat2= model.scene;
        isLoaded[1]=true;
        boat2.position.set(0,0,5);
        scene2.add(boat2);
        mixer= new THREE.AnimationMixer(boat2);
       
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
        scene2.add(water)
    })
   
   
    
    const ModelLoader=new GLTFLoader();
    ModelLoader.load('modelos/city/Map.glb',(model)=>{
        Map=model.scene;
        isLoaded[0]=true;
        scene2.add(Map);
        Map.name="map";
        console.log(Map);
    })
   
//luz ambiental
    var ambient = new THREE.AmbientLight(
        "#FFFFFF",
        1
    );
    scene2.add(ambient);
    //luz direccional
    var directional = new THREE.DirectionalLight(
        new THREE.Color(1, 0.6, 0.1),
        1

    );
    directional.position.set(0, 12, 10);
    scene2.add(directional);
    // le indicamos a Threejs
    // donde queremos el canvas

    $("#scene-sectionPlayer2").append(renderer.domElement);

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

var tiempoDelta = 0;

function onKeyDown(event) {
    keys[event.keyCode] = true;
}
function onKeyUp(event) {
    keys[event.keyCode] = false;
}

function render() {
    if(player.lose == false){
        if(factoryGame.isPaused == false){
            requestAnimationFrame(render);
            if(isLoaded[0]===true && isLoaded[1]===true && isLoaded[2]===true){
            var tiempoDelta = clock.getDelta();
            if (mixer){
                mixer.update(tiempoDelta);
            } 
            var ModelMap=scene2.getObjectByName("map");
            var ModelWater=scene2.getObjectByName("water");
            ModelMap.position.z+=5 *tiempoDelta;
            ModelMap.add(ModelWater);

            if (keys[37]) {
                boat2.position.x-=5 *tiempoDelta;
            
            } else if (keys[39]) {
                boat2.position.x +=5 *tiempoDelta;
            }
    
            renderer.render(scene2, camera);
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