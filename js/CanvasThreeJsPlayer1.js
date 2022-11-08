import * as THREE from "./threeJS/three.module.js"
// import { OrbitControls } from "../jsm/controls/OrbitControls.js"
import { OrbitControls } from "./threeJS/OrbitControls.js";
import{ GLTFLoader } from "../jsm/loaders/GLTFLoader.js";



var scene;
var renderer;
var camera;
var clock;
///Modelos
var boat;
var water;
var Map;
var isLoaded=[false,false,false];

var Barrel

var keys = {};

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
    scene = new THREE.Scene();

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
    scene.add(axesHelpert);
    const GridHelper= new THREE.GridHelper(10);
    GridHelper.position.y=0.5
    scene.add(GridHelper);
    var orbit =new OrbitControls(camera,renderer.domElement);
    camera.position.set(0, 12, 20);
    orbit.update();
   
    const BoatModelLoader=new GLTFLoader();
    BoatModelLoader.load('modelos/boat/Boat_01.glb',(model)=>{
        boat= model.scene;
        isLoaded[1]=true;
        boat.position.set(0,0,5);
        scene.add(boat);
    })

    
    const WaterModelLoader=new GLTFLoader();
    WaterModelLoader.load('modelos/water/Water.glb',(model)=>{
        water=model.scene;
        isLoaded[2]=true;
        water.position.set(0,0.5,0);
       scene.add(water)
    })
   
    
    const ModelLoader=new GLTFLoader();
    ModelLoader.load('modelos/city/Map.glb',(model)=>{
        Map=model.scene;
        isLoaded[0]=true;
        scene.add(Map);
        Map.name="map";
        console.log(Map);
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

    $("#scene-sectionPlayer1").append(renderer.domElement);
    
    render();
    
		document.addEventListener('keydown', onKeyDown);
		document.addEventListener('keyup', onKeyUp);	
});

var tiempoDelta = 0;

function onKeyDown(event) {
    keys[String.fromCharCode(event.keyCode)] = true;
}
function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}

function render() {
   
        requestAnimationFrame(render);
        

        if(isLoaded[0]===true && isLoaded[1]===true && isLoaded[2]===true){
        var tiempoDelta = clock.getDelta();
        
        var ModelMap=scene.getObjectByName("map");
        ModelMap.position.z+=5 *tiempoDelta;

        
        if (keys["A"]) {
			boat.position.x-=5 *tiempoDelta;
          
		} else if (keys["D"]) {
            boat.position.x +=5*tiempoDelta;
		}
        
        //document.onkeydown=function(e){
        //     if(e.keyCode===65){
        //         boat.position.x-=5;
        //         console.log("aaaa");
            
        //     }
        //     if(e.keyCode===68){
        //         boat.position.x +=5;
              
        //     }
        // }


       
    
        renderer.render(scene, camera);
    }
}




/******** */