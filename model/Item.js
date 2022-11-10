import redOrbeSpawn from "../js/spawners/redOrbe/redOrbeSpawn.js";
import yellowOrbSpawn from "../js/spawners/yellowOrb/yellowOrb.js";
import yellowTriangleSpawn from "../js/spawners/yellowTriangle/yellowTriangleSpawn.js";
import { Sound } from "./Audio.js";
import {Collision} from "./Collision.js";


export class Item{
    redOrbeList=[]; 
    yellowOrbeList=[];
    yellowTriangleList=[];
    redOrbe=[];
    yellowOrbe=[];
    yellowTriangle=[];
    scene;

    constructor(scene){
        this.scene =scene;
    }

    spawnItems(){

        for(let i = 0; i < 5; i ++){
            let z= Math.floor(Math.random() * (36 - 990) + 990);
            let x= Math.floor(Math.random() * (21 - (-21)) + (-21));
            redOrbeSpawn(this.scene,this.redOrbe[1],x,-z,i );
        }
    
        for(let i = 0; i < 5; i++){
            let z= Math.floor(Math.random() * (36 - 990) + 990);
            let x= Math.floor(Math.random() * (21 - (-21)) + (-21));
            yellowOrbSpawn(this.scene,this.yellowOrbe[1],x,-z, i);
        }
    
        for(let i = 0; i < 5; i++){
            let z= Math.floor(Math.random() * (36 - 990) + 990);
            let x= Math.floor(Math.random() * (21 - (-21)) + (-21));
            yellowTriangleSpawn(this.scene,this.yellowTriangle[1],x,-z, i);
        }
    
    }

    anchorItems(Map){
        for(let i=0; i< 5; i++)
        {
            let a = this.scene.getObjectByName("redOrbe"+i);
            this.redOrbeList.push(a)
            Map.add(this.redOrbeList[i]);
        }
        //yellowOrbe
        for(let i=0; i< 5; i++)
        {
            let a = this.scene.getObjectByName("yellowOrbe"+i);
            this.yellowOrbeList.push(a)
            Map.add(this.yellowOrbeList[i]);
        }
        //yellowTriangle
        for(let i=0; i< 5; i++)
        {
            let a = this.scene.getObjectByName("yellowTriangle"+i);
            this.yellowTriangleList.push(a)
            Map.add(this.yellowTriangleList[i]);
        }
    
    }

    itemsCollision(boat,player, speed){
        let collision = new Collision();
        let sound = new Sound();
        
        for(let i = 0; i < this.redOrbeList.length; i++){
            if(collision.detectCollision(boat, this.redOrbeList[i])){
                console.log('Bote colisionó con una esfera roja');
                this.redOrbeList[i].removeFromParent();
                this.redOrbeList[i].remove();
                let index = this.redOrbeList.indexOf(this.redOrbeList[i])
                this.redOrbeList.splice(index,1);
                if(player.score > 0){    
                    player.score = player.score*2;
                }
                sound.playGetItem();
            }else{
            }
        
        }
        for(let i = 0; i < this.yellowOrbeList.length; i++){
            if(collision.detectCollision(boat, this.yellowOrbeList[i])){
                console.log('Bote colisionó con una esfera amarilla');
                this.yellowOrbeList[i].removeFromParent();
                this.yellowOrbeList[i].remove();
                let index_ = this.yellowOrbeList.indexOf(this.yellowOrbeList[i])
                this.yellowOrbeList.splice(index_,1);
                if(player.score > 0){    
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
                sound.playGetItem();
            }else{
            }
        
        }
        for(let i = 0; i < this.yellowTriangleList.length; i++){
            if(collision.detectCollision(boat, this.yellowTriangleList[i])){
                console.log('Bote colisionó con un triangulo amarillo')
                this.yellowTriangleList[i].removeFromParent();
                this.yellowTriangleList[i].remove();
                let index = this.yellowTriangleList.indexOf(this.yellowTriangleList[i])
                this.yellowTriangleList.splice(index,1);

                if(player.strikeCounter > 0){ 
                    player.strikeCounter--;
                    speed.speedMovementMap = speed.speedMovementMap + 1;
                    document.getElementById("anclaCount").innerHTML = player.strikeCounter.toString();
                }
                sound.playGetItem();
            }else{
            }
        
        }
    }
}