

import{ GLTFLoader } from "../../../jsm/loaders/GLTFLoader.js"

export default function BarrelLoader(Myscena,globalVar,x,y,z,i) {
    
    const BoatModelLoader=new GLTFLoader();
    BoatModelLoader.load('js/spawners/barrel/Barrel_LowPoly.glb',(model)=>{
        globalVar= model.scene;
        globalVar.name="Barril_"+i;
        Myscena.add(globalVar);
        globalVar.position.set(x,y,z);
    })
   
}