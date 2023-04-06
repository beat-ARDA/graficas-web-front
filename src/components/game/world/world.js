import { loadSpaceships } from '../components/spaceships/spaceships.js';
import { createCamera } from '../components/camera.js';
import { createScene } from '../components/scene.js';
import { createLights } from '../components/lights.js';
import { MathUtils } from 'three';
import { createRenderer } from '../systems/renderer.js';
import { Resizer } from '../systems/Reziser.js';
import { Loop } from '../systems/Loop.js';
import { createControls } from '../systems/controls.js';
import { loadBuilding } from '../components/building/building.js';

let camera;
let renderer;
let controls;
let scene;
let loop;

class World {
    constructor(container) {

        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);
        controls = createControls(camera, renderer.domElement);
        const light = createLights();
        loop.updatables.push(controls, camera);
        scene.add(light);

        const resizer = new Resizer(container, camera, renderer);
    }

    render() {
        renderer.render(scene, camera);
    }

    async init() {
        //Buildings
        const { building } = await loadBuilding();
        building.position.set(0, -5.5, 0);
        building.scale.set(1.7, 1.7, 1.7);
        building.rotation.y = MathUtils.degToRad(275);

        //SpaceShips
        const { spaceShipHeroe, spaceShipVillain } = await loadSpaceships();

        spaceShipVillain.position.x = building.position.x;
        spaceShipVillain.position.z = building.position.z;
        spaceShipVillain.scale.set(0.1, 0.1, 0.1);

        loop.updatables.push(spaceShipHeroe, spaceShipVillain, building);
        scene.add(spaceShipHeroe, spaceShipVillain, building);
    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }
}

export { World };