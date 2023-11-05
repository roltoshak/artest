import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as dataj from './model/new_json.json' assert {type: 'json'};

function init(){
    const data = dataj.default;
    let coordinates = [];
    for (let i = 0; i < data.length; i++){
        coordinates.push(data[i].x, data[i].y, data[i].z)
    }


    const scene = new THREE.Scene();
    const div = document.body.querySelector(".size");
    const canvas = document.body.querySelector(".canvas");
    const camera = new THREE.PerspectiveCamera(75, div.offsetWidth / div.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({canvas});
    console.log(coordinates);
    scene.add(camera);

    renderer.setSize(div.offsetWidth, div.offsetHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.MeshStandardMaterial({color: 0xf0f0f0, wireframe: false, side: THREE.DoubleSide}))
    plane.position.y = -0.5;
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    plane.receiveShadow = true;

    const loader = new GLTFLoader();

    const modelg = new THREE.BufferGeometry();
    modelg.setAttribute('position', new THREE.Float32BufferAttribute(coordinates, 3));
    const material = new THREE.PointsMaterial({color: 0xff0000, size: 0.05});
    const model = new THREE.Points(modelg, material);
    scene.add(model);

    const alight1 = new THREE.AmbientLight(0xdee6ff, 2);
    scene.add(alight1);

    const alight = new THREE.DirectionalLight(0xdee6ff, 10);
    alight.position.y = 3;
    alight.castShadow = true;
    scene.add(alight);

    camera.position.z = 9;

    const controls = new OrbitControls(camera, canvas);

    window.addEventListener('resize', resizediv, false)
    function resizediv(){
        camera.aspect = div.offsetWidth / div.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(div.offsetWidth, div.offsetHeight);
        renderer.render(scene, camera);
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}
init();
