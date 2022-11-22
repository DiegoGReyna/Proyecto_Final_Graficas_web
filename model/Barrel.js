import {Collision} from "./Collision.js";
import BarrelLoader from "../js/spawners/barrel/barrelSpawner.js";
import { Sound } from "./Audio.js";
export class Barrel{
    barrelsList=[];
    Barrels=[];
    scene;

    constructor(scene){
        this.scene = scene;
        this.sound = new Sound();

    }

    spawnBarrels(){

        for(let i = 0; i < 15; i ++){
            var z= Math.floor(Math.random() * (35 - 990) + 990);
            var x= Math.floor(Math.random() * (21 - (-21)) + (-21));
            
            BarrelLoader(this.scene,this.Barrels[1],x,0,-z,i);
        }
    
    }

    spawnBarrels2(){

        for(let i = 15; i < 30; i ++){
            var z= Math.floor(Math.random() * (35 - 990) + 990);
            var x= Math.floor(Math.random() * (321 - (279)) + (279));
            
            BarrelLoader(this.scene,this.Barrels[1],x,0,-z,i);
        }
    
    }

    anchorBarrels(Map){
        for(let i=0; i< 15; i++)
        {
            let a = this.scene.getObjectByName("Barril_"+i);
            this.barrelsList.push(a)
            Map.add(this.barrelsList[i]);
        }
    
    }

    
    anchorBarrels2(Map){
        for(let i=0; i< 30; i++)
        {
            let a = this.scene.getObjectByName("Barril_"+i);
            this.barrelsList.push(a)
            Map.add(this.barrelsList[i]);
        }
    
    }

    barrelCollision(player, boat){
        let collision = new Collision();
        let coll = false;

        for(let i = 0; i < this.barrelsList.length; i++){
            if(collision.detectCollision(boat, this.barrelsList[i])){
                    //console.log('Bote colisionó barril')
                    this.sound.playGetItem();
    
                    this.barrelsList[i].removeFromParent();
                    this.barrelsList[i].remove();
                    let index = this.barrelsList.indexOf(this.barrelsList[i])
                    this.barrelsList.splice(index,1);
                    
                player.barrelCounter++;
                player.score = player.score + 50;
                coll = true;
            }else{
            }
        }

        return coll;
    }
}