import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry();

// initialize the material
const material1 = new THREE.MeshBasicMaterial({
  color: 'limegreen',
//   transparent: true,
//   opacity: 0.5
});
const material2 = new THREE.MeshBasicMaterial({
  color: 'crimson',
//   transparent: true,
//   opacity: 0.5
});
const material3 = new THREE.MeshBasicMaterial({
  color: 'blue',
//   transparent: true,
//   opacity: 0.5
});

material3.side = THREE.DoubleSide;


// Initialize the fog
const fog = new THREE.Fog(0xffffff, 1, 10)
scene.fog = fog
scene.background = new THREE.Color('white')

// initialize the mesh
const mesh1 = new THREE.Mesh(geometry, material1);

const mesh2 = new THREE.Mesh(geometry, material2);
mesh2.position.x = 2

const plane = new THREE.Mesh(planeGeometry, material3);
plane.position.x = -1.5



scene.add(mesh1);
scene.add(mesh2);
scene.add(plane);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector(".three-js");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();