import obstacleLevel2 from "../js/spawners/obstacles/Level_2/obstacleLevel2.js";
import obstacleLevel1 from "../js/spawners/obstacles/Level_1/obstacleLevel1.js";
import {obstacleLevel3_1} from "../js/spawners/obstacles/Level_3/obstacleLevel3.js";
import {Collision} from "./Collision.js";
export class Obstacles{

    obstaclesLevel1 = [];
    obstaclesLevel2 = [];
    obstaclesLevel3 = [];
    obstacles=[];
    scene;

    constructor(scene){
        this.scene = scene;
    }

   spawnObstacles(){

        //Level 1
        for(let i = 0; i < 10; i ++){
            let z= Math.floor(Math.random() * (26 - 300) + 300);
            let x= Math.floor(Math.random() * (21 - (-21)) + (-21));
        
            obstacleLevel1(this.scene,this.obstacles[0],x,0,-z,i );
        }
        //Level 2
        for(let i = 0; i < 10; i ++){
            let z= Math.floor(Math.random() * (300 - 628) + 628);
            let x= Math.floor(Math.random() * (21 - (-21)) + (-21));
            obstacleLevel2(this.scene,this.obstacles[0],x,0,-z,i );
        }
        //Level 3
        for(let i = 0; i < 10; i ++){
            let z= Math.floor(Math.random() * (628 - 990) + 990);
            let x= Math.floor(Math.random() * (21 - (-21)) + (-21));
        
            obstacleLevel3_1(this.scene,this.obstacles[2],x,0,-z,i );
        }
   }

   anchorObstacles(map){
        for(let i=0; i< 10; i++)
        {
            let a = this.scene.getObjectByName("RocaLevel1_"+i);
            this.obstaclesLevel1.push(a)
            map.add(this.obstaclesLevel1[i]);
        }
        for(let i=0; i< 10; i++)
        {
            let a = this.scene.getObjectByName("Glacier_"+i);
            this.obstaclesLevel2.push(a)
            map.add(this.obstaclesLevel2[i]);
        }

        for(let i=0; i< 10; i++)
        {
            let a = this.scene.getObjectByName("Roca_Decierto_grande_"+i);
            this.obstaclesLevel3.push(a);
            map.add(this.obstaclesLevel3[i]);
        }

   }

   obstaclesCollisions(boat, player, speed){
    let collision = new Collision();
    
    for(let i = 0; i < this.obstaclesLevel1.length; i++){
        if(collision.detectCollision(boat, this.obstaclesLevel1[i])){
            player.inmunidad = true;
            player.strikeCounter++;
            document.getElementById('anclaCount').innerHTML = player.strikeCounter.toString();
            console.log('Bote colisionó con los obstaculos del nivel 1')
            speed.speedMovementMap = speed.speedMovementMap -1;
        }else{
        }
    
    }

    for(let i = 0; i < this.obstaclesLevel2.length; i++){
        if(collision.detectCollision(boat, this.obstaclesLevel2[i])){
            player.inmunidad = true;
            player.strikeCounter++;
            document.getElementById('anclaCount').innerHTML = player.strikeCounter.toString();
            console.log('Bote colisionó con los obstaculos del nivel 2')
            speed.speedMovementMap = speed.speedMovementMap -1;
        }else{
        }
    
    }

    for(let i = 0; i < this.obstaclesLevel3.length; i++){
        if(collision.detectCollision(boat, this.obstaclesLevel3[i])){
            player.inmunidad = true;
            player.strikeCounter++;
            document.getElementById('anclaCount').innerHTML = player.strikeCounter.toString();
            console.log('Bote colisionó con los obstaculos del nivel 3')
            speed.speedMovementMap = speed.speedMovementMap -1;
        }else{
        }
    
    }

   }
    
}