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
var city;

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

   
    // scene.add(plan);

    plan.rotation.x=-0.5*Math.PI;


    // para dibujar se necesita
    //1.- Geometria:es un objeto que almecena la informacion de los vertices, indices y demas
    //2.-Material: es un objeto que alamcena la info del material como colores, texturas , iliminacion , etx
    //3.-Mesh:es un objeto que contiene la geometria y el material
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({
        color: new THREE.Color(0.7, 0, 0),
    });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    var material2 = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0.5, 0.5, 0.5),
        specular: new THREE.Color(1, 1, 1),
        shininess: 500,
    });
    var cube2 = new THREE.Mesh(geometry, material2);
    scene.add(cube2);
    cube.name = "cubo01";
    cube2.name = "cube02";
    var axesHelpert = new THREE.AxesHelper(10);
    scene.add(axesHelpert);
    const GridHelper= new THREE.GridHelper(10);
    GridHelper.position.y=0.5
    scene.add(GridHelper);
    var orbit =new OrbitControls(camera,renderer.domElement);
    camera.position.set(0, 12, 20);
    

    orbit.update();
    cube2.position.x = -1;
    cube.position.x = 1;

     



    const BoatModelLoader=new GLTFLoader();
    BoatModelLoader.load('../modelos/boat/Boat_01.glb',function(gltf){
        boat= gltf.scene;
        boat.position.set(0,0,5);
        scene.add(boat);
    })
    const WaterModelLoader=new GLTFLoader();
    WaterModelLoader.load('../modelos/water/Water.glb',function(gltf){
        water=gltf.scene;
        water.position.set(0,0.5,0);
       scene.add(water)
    })
    const ModelLoader=new GLTFLoader();
    ModelLoader.load('../modelos/city/Map.glb',function(gltf){
       
        city=gltf.scene;
        scene.add(city);
    })
    
    //iluminacion ambiental 
    //parametros 
    //color de la luz
    //intensidad
    var ambient = new THREE.AmbientLight(
        "#FFFFFF",
        1
    );
    scene.add(ambient);
    //lus direccional
    var directional = new THREE.DirectionalLight(
        new THREE.Color(1, 0.6, 0.1),
        1

    );
    directional.position.set(0, 12, 10);
    scene.add(directional);
    // le indicamos a Threejs
    // donde queremos el canvas

    $("#scene-section").append(renderer.domElement);
    
    render();
});
var tiempoDelta = 0;
function render() {
    var tiempoDelta = clock.getDelta();
    var cubo = scene.getObjectByName("cubo01");
    var cubo2 = scene.getObjectByName("cube02");
    cubo2.rotation.y += 0.01;
    cubo.rotation.y += 0.01
    
    renderer.render(scene, camera);
    requestAnimationFrame(render);
    city.position.z+=0.2;
    document.onkeydown=function(e){
        if(e.keyCode===65){
            boat.position.x-=5;
           
         
        }
        if(e.keyCode===68){
            boat.position.x +=5;
        }
    }
}