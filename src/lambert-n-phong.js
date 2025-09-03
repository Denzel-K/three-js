import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry();
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);

// initialize the material
const lambertMaterial = new THREE.MeshLambertMaterial();
const phongMaterial = new THREE.MeshPhongMaterial()


// Add tweakpane binding for phongMaterial shininess
pane.addBinding(phongMaterial, 'shininess', {
  min: 0,
  max: 1000,
  step: 1
});

// initialize the mesh
const cube = new THREE.Mesh(geometry, lambertMaterial);

const torusKnot = new THREE.Mesh(torusKnotGeometry, phongMaterial);
torusKnot.position.x = 2

const sphere = new THREE.Mesh(sphereGeometry, lambertMaterial)
sphere.position.x = -2

scene.add(cube);
scene.add(torusKnot);
scene.add(sphere);


// Initialize the light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 40);
pointLight.position.set (3,4,3)
scene.add(pointLight)

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 10;

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