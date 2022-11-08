
import{ GLTFLoader } from "../../../jsm/loaders/GLTFLoader.js"
export default function yellowOrbSpawn(Myscene,MyModel,x,z,i) {

    const ModelLoader=new GLTFLoader();
    ModelLoader.load('js/spawners/yellowOrb/Yellow_esfera.glb',(model)=>{
        MyModel= model.scene;
        MyModel.name="yellowOrbe"+i;
        Myscene.add(MyModel);
        MyModel.position.set(x,2,z);
    })

    /*var geometrySphere =new THREE.SphereGeometry( 1.5, 32, 16 ,);
    var materialRedOrbe={
        clearcoat:1.0,
        metalness:0.5,
        roughness:0.5,
        color:0xfeff00
    };
    const material = new THREE.MeshPhysicalMaterial(materialRedOrbe);
   
    MyModel = new THREE.Mesh( geometrySphere, material );

    MyModel.name="yellowOrbe"+i;
    MyModel.scale.set(.5,.5,.5);
    Myscene.add( MyModel );
    MyModel.position.set(x,2,z);*/
    

  }