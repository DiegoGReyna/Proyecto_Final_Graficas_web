
import * as THREE from "../../threeJS/three.module.js"
export default function yellowTriangleSpawn(Myscene,MyModel,x,z) {
    var materialYelloOrbe={
        clearcoat:1.0,
        metalness:0.5,
        roughness:0.5,
        color:0xfeff00
    };
    var geometryCone= new THREE.ConeGeometry(2,4,4);
    var materialCone = new THREE.MeshPhysicalMaterial(materialYelloOrbe);
     MyModel = new THREE.Mesh(geometryCone, materialCone);
    
    Myscene.add(MyModel);
    
    MyModel.position.set(x,2,z);


  }