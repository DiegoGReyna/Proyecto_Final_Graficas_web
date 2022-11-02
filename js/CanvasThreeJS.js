import * as THREE from "./threeJS/three.module.js"
// import { OrbitControls } from "../jsm/controls/OrbitControls.js"
import { OrbitControls } from "./threeJS/OrbitControls.js";
import{ GLTFLoader } from "../jsm/loaders/GLTFLoader.js";
import BarrelLoader from "./spawners/barrel/barrelSpawner.js";
import redOrbeSpawn from "./spawners/redOrbe/redOrbeSpawn.js";
import yellowOrbSpawn from "./spawners/yellowOrb/yellowOrb.js";
import yellowTriangleSpawn from "./spawners/yellowTriangle/yellowTriangleSpawn.js";
import obstacleLevel1 from "./spawners/obstacles/Level_1/obstacleLevel1.js";
import obstacleLevel2 from "./spawners/obstacles/Level_2/obstacleLevel2.js";
import {obstacleLevel3_1,obstacleLevel3_2} from "./spawners/obstacles/Level_3/obstacleLevel3.js";
var i=1;
var redOrbe=[];
var obstacles=[];
var yellowOrbe=[];
var yellowTriangle=[];
var Barrels=[];
var Barrel;
var scene;
var renderer;
var camera;
var clock;
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
    // var width = window.innerWidth / 2;
    // var height = window.innerHeight / 2;
    clock = new THREE.Clock;
    var planeGeometry=new THREE.PlaneGeometry(50,50);
    var planeMaterial=new THREE.MeshBasicMaterial({color: 0xFFFFFF});
    var plan = new THREE.Mesh(planeGeometry,planeMaterial);
    
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
   
     


  
    const BoatModelLoader=new GLTFLoader();
    BoatModelLoader.load('modelos/boat/Animated_Boat.glb',(model)=>{
        boat= model.scene;
        isLoaded[0]=true;
        boat.position.set(0,0,5);
       
        scene.add(boat);
        mixer= new THREE.AnimationMixer(boat);
        const clips=model.animations;
        const clip = THREE.AnimationClip.findByName(clips,'otra animacion');
        const action = mixer.clipAction(clip);
        action.play();
        
      
    })




    const WaterModelLoader=new GLTFLoader();
    WaterModelLoader.load('modelos/water/Water.glb',(model)=>{
        water=model.scene;
        water.position.set(0,0.5,0);
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
        new THREE.Color(1, 0.6, 0.1),
        1
    );
    scene.add(ambient);
    //lus direccional
    var directional = new THREE.DirectionalLight(
        "#FFFFFF",
        1.5

    );
    directional.position.set(0, 12, 10);
    scene.add(directional);
    // le indicamos a Threejs
    // donde queremos el canvas
    




    // var geometryTetrahedron = new THREE.ConeBufferGeometry(2,4,4);
    // var materialTetrahedron = new THREE.MeshLambertMaterial({
    //     color: new THREE.Color(0.7, 0, 0),
    // });
    // var Tetrahedron = new THREE.Mesh(geometryTetrahedron, materialTetrahedron);
    // scene.add(Tetrahedron);
    // Tetrahedron.position.y=2;




    edgesMapCubes(scene);
    finishMapCube(scene);




   
    $("#scene-section").append(renderer.domElement);
    document.addEventListener('keydown', onKeyDown);
	document.addEventListener('keyup', onKeyUp);
    render();
});
var tiempoDelta = 0;
function onKeyDown(event) {
    keys[String.fromCharCode(event.keyCode)] = true;
}
function onKeyUp(event) {
    keys[String.fromCharCode(event.keyCode)] = false;
}
function render() {
    
    var BarrilLoaded=scene.getObjectByName("Barril"+i);
    
    
    requestAnimationFrame(render);

    
 
    if(isLoaded[0]===true && isLoaded[1]===true && isLoaded[2]===true ){
        var tiempoDelta = clock.getDelta();
        
        
        var ModelMap=scene.getObjectByName("map");

        var Meta=scene.getObjectByName("finishCube");
        ModelMap.position.z+=5 *tiempoDelta;
        
        Map.add(Meta);
        
        if(BarrilLoaded!=null){
             BarrilLoaded.position.z+=5 *tiempoDelta;
                
        }
       
      
        if (keys["A"]) {
            
			boat.position.x-=5 *tiempoDelta;
         
		} else if (keys["D"]) {
            
            boat.position.x +=5*tiempoDelta;
		}else if (keys["L"]) {
           
		}else if(keys["S"]){

            obstacleLevel1(scene,obstacles[1],-20,0,-10);
            obstacleLevel2(scene,obstacles[2],0,0,-10);
            obstacleLevel3_1(scene,obstacles[3],20,0,-10);
            obstacleLevel3_2(scene,obstacles[4],10,0,-10);


            BarrelLoader(scene,Barrels[i],0,0,-100,i);
            redOrbeSpawn(scene,redOrbe[1],-20,-100);
            yellowOrbSpawn(scene,yellowOrbe[1],20,-100);
            yellowTriangleSpawn(scene,yellowTriangle[1],10,-100);
            
        }
        renderer.render(scene, camera);
    }
}


function edgesMapCubes(scene){
    
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(0.7, 0, 0),
        // wireframe:true,
        // transparent:true,
        // opacity:0,
    });
    var cubeRight = new THREE.Mesh(geometry, material);
    scene.add(cubeRight);
    var material2 = new THREE.MeshLambertMaterial({
        color: new THREE.Color(0.5, 0.5, 0.5),
        // wireframe:true,
        // transparent:true,
        // opacity:0,
    });
    var cubeLeft = new THREE.Mesh(geometry, material2);
    scene.add(cubeLeft);

    cubeRight.name = "cubeRight";
    cubeLeft.name = "cubeLeft";
   
    cubeLeft.position.set(-23,10,5);
    cubeRight.position.set(23,10,5);
    cubeRight.scale.set(1,20,50);
    cubeLeft.scale.set(1,20,50);
}


function finishMapCube(scene){
    
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(0, 0, 1),
        // wireframe:true,
        // transparent:true,
        // opacity:0,
    });
    var finishCube = new THREE.Mesh(geometry, material);
    scene.add(finishCube);
    finishCube.name = "finishCube";
    finishCube.position.set(0,1,-1046);
    finishCube.scale.set(45,4,1);
    
}