import * as THREE from 'three';
import {v4 as uuidv4} from 'uuid';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('app').appendChild(renderer.domElement);

let sphere;

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

// fetch the stored radius from backend and render the sphere
async function fetchRadiusAndCreateSphere() {
    const id = uuidv4()
    try {
        const response = await fetch("http://localhost:9003/api/json-rpc-sphere", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "getRadius",
                id: id
            })
        })
        const data = await response.json();
        const radius = data.result;
        createSphere(radius);
    } catch (error) {
        console.error(error);
    }
}

async function setRadius(newRadius) {
    const id = uuidv4()
    try {
        await fetch("http://localhost:9003/api/json-rpc-sphere", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "setRadius",
                params: {radius: newRadius},
                id: id,
            })
        });
    } catch (error) {
        console.error(error);
    }
}

// attach event listener to submit button
document.getElementById("submitRadius").addEventListener("click", () => {
    const radiusInput = document.getElementById("radiusInput").value;
    if (radiusInput) {
        setRadius(parseFloat(radiusInput))
            .then(() => fetchRadiusAndCreateSphere()) // fetch newly updated radius after setRadius
            .catch(error => console.log(error));
    }
});

// entry point of the app
fetchRadiusAndCreateSphere().catch(error => console.log(error));
animate();
