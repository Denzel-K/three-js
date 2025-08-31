import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Aspect ratio
const aspectRatio = window.innerWidth / window.innerHeight

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

//console.log(scene);


// Initializing the camera
const camera = new THREE.PerspectiveCamera(
  75, 
  aspectRatio,
  0.1,
  200
);

// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   200
// )

// Position the camera
camera.position.z = 5
scene.add(camera);


// Initialize the renderer
const canvas = document.querySelector('.three-js');

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true // Software based antialiasing
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Hardware based antialiasing
const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
renderer.setPixelRatio(maxPixelRatio);

// Instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
controls.autoRotate = true


window.addEventListener('resize', () => {
  // console.log(`Window resized. Aspect ratio = ${window.innerWidth / window.innerHeight}`);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix;
  renderer.setSize(window.innerWidth, window.innerHeight);
})


// Render the scene
const renderLoop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop)
  controls.update();
}


renderLoop();
