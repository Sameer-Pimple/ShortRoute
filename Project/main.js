let targetRotationX = 0.05;
let targetRotationY = 0.02;
let mouseX = 0, mouseXOnMouseDown = 0, mouseY = 0, mouseYOnMouseDown = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
const slowingFactor = 0.98;
const dragFactor = 0.0002;

function onDocumentMouseDown( event ) {
    event.preventDefault();
    document.addEventListener('mousemove', onDocumentMouseMove, false );
    document.addEventListener('mouseup', onDocumentMouseUp, false );
    mouseXOnMouseDown = event.clientX - windowHalfX;
    mouseYOnMouseDown = event.clientY - windowHalfY;
}

function onDocumentMouseMove( event ) {
    mouseX = event.clientX - windowHalfX;
    targetRotationX = ( mouseX - mouseXOnMouseDown ) * dragFactor;
    mouseY = event.clientY - windowHalfY;
    targetRotationY = ( mouseY - mouseYOnMouseDown ) * dragFactor;
}

function onDocumentMouseUp( event ) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
}

function main() 
{
    const scene = new THREE.Scene();

    // Create a WebGLRenderer with alpha set to true
    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#globe'), alpha: true });
    renderer.setSize(800, 500);

    // Set the CSS background of the container to transparent
    renderer.domElement.style.background = 'transparent';

    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('texture/earthmap.jpeg'),
        bumpMap: new THREE.TextureLoader().load('texture/earthbump.jpeg'),
        bumpScale: 0.01,
        // Ensure Earth is not transparent
        transparent: false,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earthMesh);

    // Add ambient light
    const ambientlight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientlight);

    // Add point light
    const pointerlight = new THREE.PointLight(0xffffff, 0.9);
    pointerlight.position.set(5, 3, 5);
    scene.add(pointerlight);

    // Create cloudGeometry
    const cloudGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Slightly larger than Earth
    const cloudMaterial = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('texture/earthCloud.png'),
        // Make cloud layer transparent
        transparent: true,
    });
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(cloudMesh);

    // Create starGeometry
    const starGeometry = new THREE.SphereGeometry(5, 64, 64);
    const starMaterial = new THREE.MeshBasicMaterial({
        // map: new THREE.TextureLoader().load('galaxy.png'), 
        // side: THREE.BackSide
    });
    const starMesh = new THREE.Mesh(starGeometry, starMaterial);
    scene.add(starMesh);

    // Add the camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1.7;

    const render = () => {
        earthMesh.rotateY(0.001); // Rotating the Earth slowly from left to right
    cloudMesh.rotateY(0.001); // Rotating the cloud layer along with the Earth
        earthMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), targetRotationX);
        earthMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), targetRotationY);
        cloudMesh.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), targetRotationX);
        cloudMesh.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), targetRotationY);
        targetRotationY = targetRotationY * slowingFactor;
        targetRotationX = targetRotationX * slowingFactor;
        renderer.render(scene,camera);
    }
    const animate = () =>{
        requestAnimationFrame(animate);
        render();
    }
    animate();
    document.addEventListener('mousedown', onDocumentMouseDown, false );
}
window.onload = main;
