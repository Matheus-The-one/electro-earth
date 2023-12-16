import * as THREE from '/build/three.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';


// global variables
let scene;
let camera;
let renderer;
const canvas = document.querySelector('.webgl');

// scene setup
scene = new THREE.Scene();

// camera setup
const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera);

// renderer setup
renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);

// orbit control setup
const controls = new OrbitControls(camera, renderer.domElement);

// earth geometry
const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);

// earth material
const earthMaterial = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    map: THREE.ImageUtils.loadTexture('./texture/earthmap1k.jpg'),
    bumpMap: THREE.ImageUtils.loadTexture('./texture/earthbump.jpg'),
    bumpScale: 0.3
});

// earth mesh
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

// cloud Geometry
const cloudGeometry = new THREE.SphereGeometry(0.63, 32, 32);

// cloud metarial
const cloudMetarial = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('./texture/earthCloud.png'),
    transparent: true,
});

// cloud mesh
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMetarial);
scene.add(cloudMesh);

// galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);

// galaxy material
const starMaterial = new THREE.MeshBasicMaterial({
    map : THREE.ImageUtils.loadTexture('./texture/galaxy.png'),
    side: THREE.BackSide
});

// galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh);

// ambient light
const ambientlight = new THREE.AmbientLight(0xffffff, 0.05);
scene.add(ambientlight);

// point light
const pointLight = new THREE.PointLight(0xffffff, 0.2)
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

// point light helper
const Helper = new THREE.PointLightHelper(pointLight);
scene.add(Helper);

// handling resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}, false);

// current fps
const stats = Stats();
document.body.appendChild(stats.dom);

// spinning animation
const animate = () => {
    requestAnimationFrame(animate);
    starMesh.rotation.y -= 0.002;
    earthMesh.rotation.y -= 0.0015;
    cloudMesh.rotation.y -= 0.001;
    controls.update();
    render();
    stats.update();
};

// rendering
const render = () => {
    renderer.render(scene, camera);
}


// ... (your existing code) ...

// Handle button click to toggle opacity and animation
document.getElementById('lightButton').addEventListener('click', () => {
    toggleAnimation();
    // Add any other logic you want to execute when the button is clicked
});

// Function to toggle spinning animation
let isAnimationPaused = false;



// ... (your existing code) ...

animate()


// ... (previous code remains unchanged)

// Button click event to increase light intensity
const button = document.getElementById('lightButton');
button.addEventListener('click', () => {
    // Set an interval to increase intensity every 0.2 seconds
    const intervalId = setInterval(() => {
        // Increase point light intensity by 0.2
        pointLight.intensity += 0.3;
        Helper.update();
    }, 200);

    // Stop the interval after 1 second (adjust the duration as needed)
    setTimeout(() => {
        clearInterval(intervalId);
    }, 1000);
});

// client.js
// client.js
// client.js
window.onload = function () {
    // Get references to the navigation links
    const homeLink = document.getElementById('homeLink');
    const aboutLink = document.getElementById('aboutLink');
    const contactLink = document.getElementById('contactLink');
    const servicesLink = document.getElementById('servicesLink');

    // Log the links to the console for debugging
    console.log('homeLink:', homeLink);
    console.log('aboutLink:', aboutLink);
    console.log('contactLink:', contactLink);
    console.log('servicesLink:', servicesLink);

    // Handle click events for the links
    homeLink.addEventListener('click', navigateToLink);
    aboutLink.addEventListener('click', navigateToLink);
    contactLink.addEventListener('click', navigateToLink);
    servicesLink.addEventListener('click', navigateToLink);

    // Your Three.js code can go here...

    // Function to navigate to the link
    function navigateToLink(event) {
        event.preventDefault(); // Prevent the default link behavior
        const link = event.target; // Get the clicked link
        console.log('Navigating to:', link.getAttribute('href')); // Log the href for debugging
        window.location.href = link.getAttribute('href'); // Navigate to the specified URL
    }
};


