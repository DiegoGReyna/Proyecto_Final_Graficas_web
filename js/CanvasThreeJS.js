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
import {obstacleLevel3_1} from "./spawners/obstacles/Level_3/obstacleLevel3.js";
import { Player } from "../model/Player.js";
var i=1;
var redOrbe=[];
var obstacles=[];
var obstaclesLevel1= [], obstaclesLevel2=[], obstaclesLevel3=[];
var yellowOrbe=[];
var yellowTriangle=[];
var Barrels=[], barrelsList=[], redOrbeList=[], yellowOrbeList=[], yellowTriangleList=[];
var Barrel;
var scene;
var renderer;
var camera;
var clock;
var isPlay = true, anclaje_ = true, isPlayingRn = false;
var player;
var tiempoDelta;
var speedMovementMap = 5;
///Modelos
var boat;
var water;
var Map;
var keys = {};
let mixer;
var isLoaded=[false,false,false,false];
var bounds=[];
$(document).ready(function () {
   
    //jugador
    player = new Player(0,0,0,false, false, 0);


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
        boat.name = "BoatModel"
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
    //Obstaculos
    spawnObstaclesLvl1();
    spawnObstaclesLvl2();
    spawnObstaclesLvl3();

    //Barriles
    spawnBarrels();

    //Items
    spawnItems();


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
        if(isPlay){
            //var BarrilLoaded=scene.getObjectByName("Barril"+i);
        
            requestAnimationFrame(render);
        
            if(isLoaded[0]===true && isLoaded[1]===true && isLoaded[2]===true ){
                tiempoDelta = clock.getDelta();
                        
                var ModelMap=scene.getObjectByName("map");
                ModelMap.position.z+=speedMovementMap *tiempoDelta;
    
                //Anclaje de obstaculos al mapa
                if(scene.getObjectByName("Roca_Decierto_grande_9") !== undefined &&
                scene.getObjectByName("Barril_4") !== undefined &&
                scene.getObjectByName("yellowTriangle4") !== undefined &&
                scene.getObjectByName("Glacier_9") !== undefined &&
                scene.getObjectByName("RocaLevel1_9") !== undefined
                ){
    
                    if(anclaje_){
                        anclajeObstaculos();
                    }
                    if(!isPlayingRn)
                        isPlayingRn = true;
                }

                if(isPlayingRn){
                    //Colision lados
                    bounderiesCollision(boat);
                    //Colision final
                    finalMapCollision(ModelMap);
                    //Colision barries
                    barrelCollision(boat, barrelsList);
                    //Colision obstaculos
                    if(!player.inmunidad){

                        obstaclesCollision1(boat, obstaclesLevel1)
                        obstaclesCollision2(boat, obstaclesLevel2)
                        obstaclesCollision3(boat, obstaclesLevel3);

                        if(player.strikeCounter > 2)
                        {
                            player.lose = true;
                        }
    
                    }
    
                    //Colision items
                    itemsCollision(boat,redOrbeList, yellowOrbeList, yellowTriangleList)

                }
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
        isPlay = false;
        localStorage.setItem("score", player.score)
        window.location.href = "Loser.php";
    }
    
    
}

function barrelCollision(boat, barrelsList){
    for(let i = 0; i < barrelsList.length; i++){
        if(detectCollision(boat, barrelsList[i])){
                //console.log('Bote colisionó barril')

                barrelsList[i].removeFromParent();
                barrelsList[i].remove();
                let index = barrelsList.indexOf(barrelsList[i])
                barrelsList.splice(index,1);
                
            player.barrelCounter++;
            player.score = player.score + 50;
            document.getElementById('barrelCount').innerHTML = player.barrelCounter.toString();
        }else{
        }
    }
}

function itemsCollision(boat,redOrbeList, yellowOrbeList, yellowTriangleList){

    for(let i = 0; i < redOrbeList.length; i++){
        if(detectCollision(boat, redOrbeList[i])){
            console.log('Bote colisionó con una esfera roja')
            if(player.score > 0){
                redOrbeList[i].removeFromParent();
                redOrbeList[i].remove();
                let index = redOrbeList.indexOf(redOrbeList[i])
                redOrbeList.splice(index,1);

                player.score = player.score*2;
            }
        }else{
        }
    
    }
    for(let i = 0; i < yellowOrbeList.length; i++){
        if(detectCollision(boat, yellowOrbeList[i])){
            console.log('Bote colisionó con una esfera amarilla')
            if(player.score > 0){
                yellowOrbeList[i].removeFromParent();
                yellowOrbeList[i].remove();
                let index_ = yellowOrbeList.indexOf(yellowOrbeList[i])
                yellowOrbeList.splice(index_,1);

                let array = [-1/3, 3];
                let index = Math.floor(Math.random() * array.length);
                let chosen = array[index];
                if(index == 0){
                    player.score = Math.round(player.score + (player.score*chosen));
                }
                else{
                    player.score = player.score*3;
                }
            }
        }else{
        }
    
    }
    for(let i = 0; i < yellowTriangleList.length; i++){
        if(detectCollision(boat, yellowTriangleList[i])){
            console.log('Bote colisionó con un triangulo amarillo')
            if(player.strikeCounter > 0){ 
                yellowTriangleList[i].removeFromParent();
                yellowTriangleList[i].remove();
                let index = yellowTriangleList.indexOf(yellowTriangleList[i])
                yellowTriangleList.splice(index,1);

                player.strikeCounter--;
                document.getElementById("anclaCount").innerHTML = player.strikeCounter.toString();
            }
        }else{
        }
    
    }
}

function obstaclesCollision1(boat, obstaclesLevel1){

    for(let i = 0; i < obstaclesLevel1.length; i++){
        if(detectCollision(boat, obstaclesLevel1[i])){
            player.inmunidad = true;
            player.strikeCounter++;
            document.getElementById('anclaCount').innerHTML = player.strikeCounter.toString();
            speedMovementMap = speedMovementMap -1;
            console.log('Bote colisionó con los obstaculos del nivel 1')
        }else{
        }
    
    }
}

function obstaclesCollision2(boat, obstaclesLevel2){

    for(let i = 0; i < obstaclesLevel2.length; i++){
        if(detectCollision(boat, obstaclesLevel2[i])){
            player.inmunidad = true;
            player.strikeCounter++;
            document.getElementById('anclaCount').innerHTML = player.strikeCounter.toString();
            speedMovementMap = speedMovementMap -1;
            console.log('Bote colisionó con los obstaculos del nivel 2')
        }else{
        }
    
    }
}
function obstaclesCollision3(boat, obstaclesLevel3){

    for(let i = 0; i < obstaclesLevel3.length; i++){
        if(detectCollision(boat, obstaclesLevel3[i])){
            player.inmunidad = true;
            player.strikeCounter++;
            document.getElementById('anclaCount').innerHTML = player.strikeCounter.toString();
            speedMovementMap = speedMovementMap -1;
            console.log('Bote colisionó con los obstaculos del nivel 3')
        }else{
        }
    
    }
}

function detectCollision(object1, object2){

    for (var i = 0; i < object1.children.length; i++) {

        for (var j = 0; j < object2.children.length; j++) {
            object1.children[i].geometry.computeBoundingBox(); 
            object2.children[i].geometry.computeBoundingBox();
            object1.updateMatrixWorld();
            object2.updateMatrixWorld();

            var box1 = object1.children[i].geometry.boundingBox.clone();
            box1.applyMatrix4(object1.matrixWorld);

            var box2 = object2.children[i].geometry.boundingBox.clone();
            box2.applyMatrix4(object2.matrixWorld);
            if (box1.intersectsBox(box2)) {
                return true;
            }
        }
    }
    return false;
}

function bounderiesCollision(object){
    for (var i = 0; i < object.children.length; i++) {

        if(object.position.x > 21 || object.position.x < -21)
        {
            isPlay = false;
            localStorage.setItem("score", player.score)
            window.location.href = "loser.php";
        }          
    }
}

function finalMapCollision(object){
    for (var i = 0; i < object.children.length; i++) {

        if(object.position.z > 1045)
        {
            isPlay = false;
            localStorage.setItem("score", player.score)
            window.location.href = "victory.php";
        }          
    }
}

function spawnObstaclesLvl1(){

    for(let i = 0; i < 10; i ++){
        let z= Math.floor(Math.random() * (26 - 300) + 300);
        let x= Math.floor(Math.random() * (21 - (-21)) + (-21));
    
        obstacleLevel1(scene,obstacles[0],x,0,-z,i );
    }
}

function spawnObstaclesLvl2(){

    for(let i = 0; i < 10; i ++){
        let z= Math.floor(Math.random() * (300 - 628) + 628);
        let x= Math.floor(Math.random() * (21 - (-21)) + (-21));
        obstacleLevel2(scene,obstacles[0],x,0,-z,i );
    }
}

function spawnObstaclesLvl3(){

    for(let i = 0; i < 10; i ++){
        let z= Math.floor(Math.random() * (628 - 990) + 990);
        let x= Math.floor(Math.random() * (21 - (-21)) + (-21));
    
        obstacleLevel3_1(scene,obstacles[2],x,0,-z,i );
    }
}

function spawnBarrels(){

    for(let i = 0; i < 25; i ++){
        var z= Math.floor(Math.random() * (35 - 990) + 990);
        var x= Math.floor(Math.random() * (21 - (-21)) + (-21));
        
        BarrelLoader(scene,Barrels[1],x,0,-z,i);
    }

}

function spawnItems(){

    for(let i = 0; i < 5; i ++){
        let z= Math.floor(Math.random() * (36 - 990) + 990);
        let x= Math.floor(Math.random() * (21 - (-21)) + (-21));
        redOrbeSpawn(scene,redOrbe[1],x,-z,i );
    }

    for(let i = 0; i < 5; i++){
        let z= Math.floor(Math.random() * (36 - 990) + 990);
        let x= Math.floor(Math.random() * (21 - (-21)) + (-21));
        yellowOrbSpawn(scene,yellowOrbe[1],x,-z, i);
    }

    for(let i = 0; i < 5; i++){
        let z= Math.floor(Math.random() * (36 - 990) + 990);
        let x= Math.floor(Math.random() * (21 - (-21)) + (-21));
        yellowTriangleSpawn(scene,yellowTriangle[1],x,-z, i);
    }

}

function anclajeObstaculos(){
    //Obstaculos
    for(let i=0; i< 10; i++)
    {
        let a = scene.getObjectByName("RocaLevel1_"+i);
        obstaclesLevel1.push(a)
        Map.add(obstaclesLevel1[i]);
    }
    for(let i=0; i< 10; i++)
    {
        let a = scene.getObjectByName("Glacier_"+i);
        obstaclesLevel2.push(a)
        Map.add(obstaclesLevel2[i]);
    }

    for(let i=0; i< 10; i++)
    {
        let a = scene.getObjectByName("Roca_Decierto_grande_"+i);
        obstaclesLevel3.push(a);
        Map.add(obstaclesLevel3[i]);
    }

    //Barriles
    for(let i=0; i< 25; i++)
    {
        let a = scene.getObjectByName("Barril_"+i);
        barrelsList.push(a)
        Map.add(barrelsList[i]);
    }

    //Items
    //redOrbe
    for(let i=0; i< 5; i++)
    {
        let a = scene.getObjectByName("redOrbe"+i);
        redOrbeList.push(a)
        Map.add(redOrbeList[i]);
    }
    //yellowOrbe
    for(let i=0; i< 5; i++)
    {
        let a = scene.getObjectByName("yellowOrbe"+i);
        yellowOrbeList.push(a)
        Map.add(yellowOrbeList[i]);
    }
    //yellowTriangle
    for(let i=0; i< 5; i++)
    {
        let a = scene.getObjectByName("yellowTriangle"+i);
        yellowTriangleList.push(a)
        Map.add(yellowTriangleList[i]);
    }

    anclaje_ = false;
}