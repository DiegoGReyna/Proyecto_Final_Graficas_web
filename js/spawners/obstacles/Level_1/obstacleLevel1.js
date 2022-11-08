import{ GLTFLoader } from "../../../../jsm/loaders/GLTFLoader.js"

export default function obstacleLevel1(Myscena,globalVar,x,y,z,i) {

    const BoatModelLoader=new GLTFLoader();
    BoatModelLoader.load('js/spawners/obstacles/Level_1/Roca_Level_1glb.glb',(model)=>{
        globalVar= model.scene;
        globalVar.name="RocaLevel1_"+i;
        Myscena.add(globalVar);
        globalVar.position.set(x,y,z);
    })
}