import {Collision} from "./Collision.js";
import BarrelLoader from "../js/spawners/barrel/barrelSpawner.js";

export class Barrel{
    barrelsList=[];
    Barrels=[];
    scene;

    constructor(scene){
        this.scene = scene;
    }

    spawnBarrels(){

        for(let i = 0; i < 25; i ++){
            var z= Math.floor(Math.random() * (35 - 990) + 990);
            var x= Math.floor(Math.random() * (21 - (-21)) + (-21));
            
            BarrelLoader(this.scene,this.Barrels[1],x,0,-z,i);
        }
    
    }

    anchorBarrels(Map){
        for(let i=0; i< 25; i++)
        {
            let a = this.scene.getObjectByName("Barril_"+i);
            this.barrelsList.push(a)
            Map.add(this.barrelsList[i]);
        }
    
    }

    barrelCollision(player, boat){
        let collision = new Collision();

        for(let i = 0; i < this.barrelsList.length; i++){
            if(collision.detectCollision(boat, this.barrelsList[i])){
                    //console.log('Bote colisionó barril')
    
                    this.barrelsList[i].removeFromParent();
                    this.barrelsList[i].remove();
                    let index = this.barrelsList.indexOf(this.barrelsList[i])
                    this.barrelsList.splice(index,1);
                    
                player.barrelCounter++;
                player.score = player.score + 50;
                document.getElementById('barrelCount').innerHTML = player.barrelCounter.toString();
            }else{
            }
        }
    }
}