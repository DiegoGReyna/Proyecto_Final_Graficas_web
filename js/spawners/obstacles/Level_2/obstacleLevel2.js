import{ GLTFLoader } from "../../../../jsm/loaders/GLTFLoader.js"

export default function obstacleLevel2(Myscena,globalVar,x,y,z,i) {
    const BoatModelLoader=new GLTFLoader();
    BoatModelLoader.load('js/spawners/obstacles/Level_2/Glacier_Level2_2.glb',(model)=>{
        globalVar= model.scene;
        globalVar.name="Glacier_"+i;
        Myscena.add(globalVar);
        globalVar.position.set(x,y,z);
    })
}