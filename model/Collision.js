import { Sound } from "./Audio.js";

export class Collision{
    
    detectCollision(object1, object2){

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

    bounderiesCollision(player, object){
        let sound = new Sound();
        for (var i = 0; i < object.children.length; i++) {
    
            if(object.position.x > 21 || object.position.x < -21)
            {
                //isPlay = false;
                localStorage.setItem("score", player.score)
                sound.playLose();
                player.lose = true;

            }          
        }
    }

    finalMapCollision(player, object){
        let sound = new Sound();

        for (var i = 0; i < object.children.length; i++) {
    
            if(object.position.z > 1045)
            {
                //isPlay = false;
                localStorage.setItem("score", player.score)
                player.win = true;
            }          
        }
    }
}