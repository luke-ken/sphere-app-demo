import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('app').appendChild(renderer.domElement);

let sphere;
let radius = 1;

// create and render the sphere
function createSphere(radius) {
    if (sphere) scene.remove(sphere);
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true });
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    if (sphere) {
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
}

createSphere(radius);
animate();
