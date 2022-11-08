
import{ GLTFLoader } from "../../../jsm/loaders/GLTFLoader.js"
export default function yellowTriangleSpawn(Myscene,MyModel,x,z,i) {
    const ModelLoader=new GLTFLoader();
    ModelLoader.load('js/spawners/yellowTriangle/Triangulo.glb',(model)=>{
        MyModel= model.scene;
        MyModel.name="yellowTriangle"+i;
        Myscene.add(MyModel);
        MyModel.position.set(x,2,z);
    })
    /*var materialYelloOrbe={
        clearcoat:1.0,
        metalness:0.5,
        roughness:0.5,
        color:0xfeff00
    };
    var geometryCone= new THREE.ConeGeometry(2,4,4);
    var materialCone = new THREE.MeshPhysicalMaterial(materialYelloOrbe);
    MyModel = new THREE.Mesh(geometryCone, materialCone);
    MyModel.name="yellowTriangle"+i;
    MyModel.scale.set(.5,.5,.5);
    Myscene.add(MyModel);
    MyModel.position.set(x,2,z);*/


  }