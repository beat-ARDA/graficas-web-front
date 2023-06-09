import { loadSpaceships } from '../components/spaceships/spaceships.js';
import { createCamera } from '../components/camera.js';
import { createScene } from '../components/scene.js';
import { createLights } from '../components/lights.js';
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
        loop.updatables.push(camera, controls);
        scene.add(light);

        const resizer = new Resizer(container, camera, renderer);
    }

    render() {
        renderer.render(scene, camera);
    }

    async init() {
        const { building } = await loadBuilding();
        const { spaceShipHeroe, villainModelsArray, spaceShipPlayer2 } = await loadSpaceships(scene);

        loop.updatables.push(spaceShipHeroe, building, spaceShipPlayer2);
        scene.add(spaceShipHeroe, building, spaceShipPlayer2);
        villainModelsArray.map(villain => {
            loop.updatables.push(villain);
            scene.add(villain);
        });
    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }
}

export { World };