import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Aspect ratio
const aspectRatio = window.innerWidth / window.innerHeight

// Scene initialization
const scene = new THREE.Scene();

// Adding objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({color: "lightblue"});

// Initialize 3 cubes
const cubeMesh = new THREE.Mesh( cubeGeometry, cubeMaterial);
const cubeMesh2 = new THREE.Mesh( cubeGeometry, cubeMaterial);
const cubeMesh3 = new THREE.Mesh( cubeGeometry, cubeMaterial);

// Add single object to scene
// scene.add(cubeMesh);

const group = new THREE.Group();
group.add(cubeMesh)
group.add(cubeMesh2)
group.add(cubeMesh3)

// Add grouped objects to scene
scene.add(group);

// Position the cubes
const tempVector = new THREE.Vector3(0, 0, 0)

cubeMesh.position.copy(new THREE.Vector3(2, 0, 0))
cubeMesh2.position.copy(new THREE.Vector3(0, 3, 0))
cubeMesh3.position.copy(new THREE.Vector3(0, 0, 4))

const axesHelper = new THREE.AxesHelper(4)
scene.add(axesHelper)

// Initializing the camera
const camera = new THREE.PerspectiveCamera(
  75, 
  aspectRatio,
  0.5,
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
camera.position.z = 10
scene.add(camera);

console.log(cubeMesh.position.distanceTo(camera.position))

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
