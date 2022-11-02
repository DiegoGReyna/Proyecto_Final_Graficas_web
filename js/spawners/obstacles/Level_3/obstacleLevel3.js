import{ GLTFLoader } from "../../../../jsm/loaders/GLTFLoader.js"

export  function obstacleLevel3_1(Myscena,globalVar,x,y,z,i) {
    const BoatModelLoader=new GLTFLoader();
    BoatModelLoader.load('js/spawners/obstacles/Level_3/Roca_Decierto_grande_Level3.glb',(model)=>{
        globalVar= model.scene;
        globalVar.name="Roca_Decierto_grande_"+i;
        Myscena.add(globalVar);
        globalVar.position.set(x,y,z);
    })
}


export  function obstacleLevel3_2(Myscena,globalVar,x,y,z,i) {
    const BoatModelLoader=new GLTFLoader();
    BoatModelLoader.load('js/spawners/obstacles/Level_3/Roca_Decierto_grande_2_Level3.glb',(model)=>{
        globalVar= model.scene;
        globalVar.name="Roca_Decierto_grande2_"+i;
        Myscena.add(globalVar);
        globalVar.position.set(x,y,z);
    })
}