import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene initialization
const scene = new THREE.Scene();

// Adding objects to the scene
const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"});

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
);
scene.add(cubeMesh);

console.log(scene);


// Initializing the camera
const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

// Position the camera
camera.position.z = 10
scene.add(camera);


// Initialize the renderer
const canvas = document.querySelector('.three-js');

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
controls.autoRotate = true

const renderLoop = () => {
  controls.update()
 renderer.render(scene, camera);
 window.requestAnimationFrame(renderLoop)
}


renderLoop();
