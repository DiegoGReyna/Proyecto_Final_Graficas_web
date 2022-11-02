
import * as THREE from "../../threeJS/three.module.js"
export default function redOrbeSpawn(Myscene,MyModel,x,z) {
    var geometrySphere =new THREE.SphereGeometry( 1.5, 32, 16 ,);
    var materialRedOrbe={
        clearcoat:1.0,
 
        metalness:0.5,
        roughness:0.5,
        color:0xea0000
    };
    const material = new THREE.MeshPhysicalMaterial(materialRedOrbe);
   
    MyModel = new THREE.Mesh( geometrySphere, material );

    MyModel.name="redOrbe";
    Myscene.add( MyModel );

    MyModel.position.set(x,2,z);
    

  }