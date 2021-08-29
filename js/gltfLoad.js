import * as THREE from '../libs/three.module.js';

import {GLTFLoader} from '../libs/GLTFLoader.js';

import {OrbitControls} from '../libs/OrbitControls.js';

/***** Create Scene and Camera ****/
const canvas = document.getElementById("d");

/***** add renderer ****/
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

const fov = 75;
const aspect = window.innerWidth/window.innerHeight;
const near = 0.001; // evite le clipping
const far = 150;
const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.position.set(0.5,0.9,1.5);
scene.add(camera);

/***** add cube ****/
// const geometry = new THREE.BoxGeometry(1,1,1);
// const material = new THREE.MeshLambertMaterial({
//     opacity:1,
//     transparent:true,
//     color: 0xF3FFE2,
// });

 /***** create a cube ****/
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
// cube.position.set(5,5,5);
// renderer.render(scene, camera);

/***** add light ****/
scene.background = new THREE.Color(0X1f2836);
const ambientLight = new THREE.AmbientLight(0xFFFFE0, 0.6);
const frontLight = new THREE.PointLight(0xFFFFE0, 2);
const backLight = new THREE.PointLight(0xFFFFE0, 2)
frontLight.position.set(0,15,25);
backLight.position.set(0,15,-170);
scene.add(ambientLight, frontLight, backLight);


/***** Load texture ****/
// const loaderTexture = new THREE.TextureLoader();
// const texture = loaderTexture.load('models/textureChampignon.png');
// const material = new THREE.MeshBasicMaterial({map:texture});
// console.log(loaderTexture);

/***** Load model champignon ****/
const loaderOBJ = new GLTFLoader().setPath('../models/');
loaderOBJ.load('champignon.glb', function(gltf){
  
    scene.add(gltf.scene);  
    renderer.render(scene, camera);
});

/***** controle du champignon ****/
const controles = new OrbitControls(camera, renderer.domElement);
controles.enableDamping = true;
controles.dampingFactor = 0.05;
camera.position.set(0.5,0.7,1.5);
camera.lookAt(0,0,0);
controles.update();
animate();

function animate(){
    requestAnimationFrame(animate);
    controles.update();
    renderer.render(scene, camera);
}

/***** resize écran ****/
window.addEventListener('resize', onWindowResize);

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}