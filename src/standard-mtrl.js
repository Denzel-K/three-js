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
const material = new THREE.MeshPhysicalMaterial();
material.color = new THREE.Color('crimson')

pane.addBinding(material, 'metalness', {
    min: 0,
    max: 1,
    step: 0.01
})

pane.addBinding(material, 'roughness', {
    min: 0,
    max: 1,
    step: 0.01
})

pane.addBinding(material, 'reflectivity', {
    min: 0,
    max: 1,
    step: 0.01
})

pane.addBinding(material, 'clearcoat', {
    min: 0,
    max: 1,
    step: 0.01
})

// initialize the mesh
const cube = new THREE.Mesh(geometry, material);

const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
torusKnot.position.x = 2

const sphere = new THREE.Mesh(sphereGeometry, material)
sphere.position.x = -2

scene.add(cube);
scene.add(torusKnot);
scene.add(sphere);


// Initialize the light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
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