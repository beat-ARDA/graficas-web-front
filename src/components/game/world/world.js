import { loadBirds } from '../components/birds/birds.js';
import { createCube } from '../components/cube.js';
import { createSkydome } from '../components/skydome/skydome.js';
import { loadSpaceships } from '../components/spaceships/spaceships.js';
import { createCamera } from '../components/camera.js';
import { createScene } from '../components/scene.js';
import { createLights } from '../components/lights.js';

import { createRenderer } from '../systems/renderer.js';
import { Resizer } from '../systems/Reziser.js';
import { Loop } from '../systems/Loop.js';
import { createControls } from '../systems/controls.js';

let camera;
let renderer;
let controls;
let scene;
let loop;
let containerClass;

class World {
    constructor(container) {
        containerClass = container;
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        loop = new Loop(camera, scene, renderer);
        container.append(renderer.domElement);
        controls = createControls(camera, renderer.domElement);
        //const skydome = createSkydome();
        // const cube = createCube();
        //controls.target.copy(cube.position);
        const light = createLights();
        loop.updatables.push(controls);
        // loop.updatables.push(skydome);
        //loop.updatables.push(cube);
        scene.add(light);

        const resizer = new Resizer(container, camera, renderer);
        // resizer.onResize = () => {
        //     this.render();
        // };
    }

    render() {
        renderer.render(scene, camera);
    }

    async init() {
        // const { parrot, flamingo, stork, nave } = await loadBirds();
        // controls.target.copy(parrot.position);
        // loop.updatables.push(parrot, flamingo, stork, nave);
        // scene.add(nave);
        const { nave } = await loadSpaceships(scene, containerClass);
        controls.target.copy(nave.position);
        loop.updatables.push(nave);
        scene.add(nave);
    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }
}

export { World };