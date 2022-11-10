import * as THREE from "./threeJS/three.module.js"
// import { OrbitControls } from "../jsm/controls/OrbitControls.js"
import { OrbitControls } from "./threeJS/OrbitControls.js";
import{ GLTFLoader } from "../jsm/loaders/GLTFLoader.js";



var scene2;
var renderer;
var camera;
var clock;
///Modelos
var boat2;
var water;
var Map;
var isLoaded=[false,false,false];
var keys = {};
$(document).ready(function () {
    
    var box = document.querySelector('.ContainerPlayer1');
    var width = box.offsetWidth;
    var height = box.offsetHeight;
    
    clock = new THREE.Clock;
    
   
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0.2, 0.3, 0.6));
    renderer.setSize(width, height);
   
    camera = new THREE.PerspectiveCamera(
        60,
        width / height,
        0.1,
        1000
    );
   
    scene2 = new THREE.Scene();

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
    BoatModelLoader.load('modelos/boat/Boat_03_Green.glb',(model)=>{
        boat2= model.scene;
        isLoaded[1]=true;
        boat2.position.set(0,0,5);
        scene2.add(boat2);
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
        "#061596",
        0.5
    );
    scene2.add(ambient);
    //luz direccional
    var directional = new THREE.DirectionalLight(
        "#999DBF",
        0.4

    );
    directional.position.set(0, 12, 10);
    scene2.add(directional);
    // le indicamos a Threejs
    // donde queremos el canvas

    $("#scene-sectionPlayer2").append(renderer.domElement);

    document.addEventListener('keydown', onKeyDown);
	document.addEventListener('keyup', onKeyUp);	
    
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
   
        requestAnimationFrame(render);
        if(isLoaded[0]===true && isLoaded[1]===true && isLoaded[2]===true){
        var tiempoDelta = clock.getDelta();
        
        var ModelMap=scene2.getObjectByName("map");
        var ModelWater=scene2.getObjectByName("water");
        ModelMap.position.z+=5 *tiempoDelta;
        ModelMap.add(ModelWater);
        
        // document.onkeydown=function(e){
        //     if(e.keyCode===37){
        //         boat2.position.x-=5;
            
            
        //     }
        //     if(e.keyCode===39){
        //         boat2.position.x +=5;
              
        //     }
        // }



    
        if (keys[37]) {
            boat2.position.x-=5 *tiempoDelta;
          
		} else if (keys[39]) {
            boat2.position.x +=5 *tiempoDelta;
		}

    
    
        renderer.render(scene2, camera);
    }
}