import obstacleLevel2 from "../js/spawners/obstacles/Level_2/obstacleLevel2.js";
import obstacleLevel1 from "../js/spawners/obstacles/Level_1/obstacleLevel1.js";
import {obstacleLevel3_1} from "../js/spawners/obstacles/Level_3/obstacleLevel3.js";
import {Collision} from "./Collision.js";
export class Obstacles{

    obstaclesLevel1 = [];
    obstaclesLevel2 = [];
    obstaclesLevel3 = [];
    obstaclesLevel1_2 = [];
    obstaclesLevel2_2 = [];
    obstaclesLevel3_2 = [];
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

   spawnObstacles2(){
        //Level 1
        for(let i = 10; i < 20; i ++){
            let z= Math.floor(Math.random() * (26 - 300) + 300);
            let x= Math.floor(Math.random() * (321 - (279)) + (279));
        
            obstacleLevel1(this.scene,this.obstacles[0],x,0,-z,i );
        }
        //Level 2
        for(let i = 10; i < 20; i ++){
            let z= Math.floor(Math.random() * (300 - 628) + 628);
            let x= Math.floor(Math.random() * (321 - (279)) + (279));
            obstacleLevel2(this.scene,this.obstacles[0],x,0,-z,i );
        }
        //Level 3
        for(let i = 10; i < 20; i ++){
            let z= Math.floor(Math.random() * (628 - 990) + 990);
            let x= Math.floor(Math.random() * (321 - (279)) + (279));
        
            obstacleLevel3_1(this.scene,this.obstacles[2],x,0,-z,i );
        }
    }

    anchorObstacles(map){
        for(let i=0; i< 10; i++)
        {
            let a = this.scene.getObjectByName("RocaLevel1_"+i);
            this.obstaclesLevel1.push(a)
            map.add(this.obstaclesLevel1[i]);

            let b = this.scene.getObjectByName("Glacier_"+i);
            this.obstaclesLevel2.push(b)
            map.add(this.obstaclesLevel2[i]);

            let c = this.scene.getObjectByName("Roca_Decierto_grande_"+i);
            this.obstaclesLevel3.push(c);
            map.add(this.obstaclesLevel3[i]);
        }
   }


   anchorObstacles2(map){
        for(let i=0; i< 20; i++)
        {
            let a = this.scene.getObjectByName("RocaLevel1_"+i);
            this.obstaclesLevel1.push(a)
            map.add(this.obstaclesLevel1[i]);

            let b = this.scene.getObjectByName("Glacier_"+i);
            this.obstaclesLevel2.push(b)
            map.add(this.obstaclesLevel2[i]);

            let c = this.scene.getObjectByName("Roca_Decierto_grande_"+i);
            this.obstaclesLevel3.push(c);
            map.add(this.obstaclesLevel3[i]);
        }
   }


   obstaclesCollisions(boat, player, speed){
    let collision = new Collision();
    let coll = false;

    for(let i = 0; i < this.obstaclesLevel1.length; i++){
        if(collision.detectCollision(boat, this.obstaclesLevel1[i])){
            player.inmunidad = true;
            player.strikeCounter++;
            console.log('Bote colisionó con los obstaculos del nivel 1')
            speed.speedMovementMap = speed.speedMovementMap +1;
            coll = true;
        }else{
        }
    
    }

    for(let i = 0; i < this.obstaclesLevel2.length; i++){
        if(collision.detectCollision(boat, this.obstaclesLevel2[i])){
            player.inmunidad = true;
            player.strikeCounter++;
            console.log('Bote colisionó con los obstaculos del nivel 2')
            speed.speedMovementMap = speed.speedMovementMap +1;
            coll = true;
        }else{
        }
    
    }

    for(let i = 0; i < this.obstaclesLevel3.length; i++){
        if(collision.detectCollision(boat, this.obstaclesLevel3[i])){
            player.inmunidad = true;
            player.strikeCounter++;
            console.log('Bote colisionó con los obstaculos del nivel 3')
            speed.speedMovementMap = speed.speedMovementMap +1;
            coll = true;
        }else{
        }
    
    }

    return coll;

   }
    
}