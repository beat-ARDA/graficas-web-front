import { loadSpaceships } from '../components/spaceships/spaceships.js';
import { createCamera } from '../components/camera.js';
import { createScene } from '../components/scene.js';
import { createLights } from '../components/lights.js';
import { createRenderer } from '../systems/renderer.js';
import { Resizer } from '../systems/Reziser.js';
import { Loop } from '../systems/Loop.js';
import { createControls } from '../systems/controls.js';
import { loadBuilding } from '../components/building/building.js';
import { createShield } from '../components/items/shield.js';
import { createHearth } from '../components/items/hearth.js';
import { loadHearthItem } from '../components/items/hearthItem/hearthItem.js';
import { loadBulletItem } from '../components/items/bulletItem/bulletItem.js';
import { loadShieldItem } from '../components/items/shieldItem/shieldItem.js';
import { loadHeroe } from '../components/heroe/heroe.js';
import { loadBulletHeroe } from '../components/bulletHeroe/bulletHeroe.js';
import { infoBulletHeroe, infoBulletVillain, infoHeroe, infoVillain } from '../helpers/helpers.js';
import { MathUtils, Vector3 } from 'three';
import { loadVillain } from '../components/villain/villain.js';
import { loadBulletVillain } from '../components/bulletVillain/bulletVillain.js';

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
        //const shieldItem = await createShield(scene);
        //const hearthItem = await createHearth(scene);
        const hearthItem = await loadHearthItem(scene);
        const bulletItem = await loadBulletItem(scene);
        const shieldItem = await loadShieldItem(scene);
        const [villain, villainData] = await loadVillain(scene, loop, true, false, 50, 0);
        infoVillain.model = villainData;

        const heroe = await loadHeroe(scene, loop);

        infoHeroe.model = heroe;

        const [bulletHeroe, dataHeroe] = await loadBulletHeroe(
            new Vector3(Math.cos(MathUtils.degToRad(45)), 0, Math.sin(MathUtils.degToRad(45))),
            scene,
            45,
            false,
            false,
            false,
            false);

        infoBulletHeroe.bullet = dataHeroe;

        const [bulletVillain, bulletVillainData] = await loadBulletVillain(
            new Vector3(Math.cos(MathUtils.degToRad(45)), 0, Math.sin(MathUtils.degToRad(45))),
            scene,
            45,
            false,
            false);

        infoBulletVillain.bullet = bulletVillainData;
        //const { spaceShipHeroe, villainModelsArray } = await loadSpaceships(scene, loop, shieldItem, hearthItem);
        scene.add(heroe, building, bulletItem, hearthItem, shieldItem);
        loop.updatables.push(heroe, building, bulletItem, hearthItem, shieldItem,);

        //Level 1 OnePlayer
        // villainModelsArray.forEach((villain, indexVillain) => {
        //     loop.updatables.push(villain);
        //     if (indexVillain <= 2)
        //         scene.add(villain);
        // });
    }

    start() {
        loop.start();
    }

    stop() {
        loop.stop();
    }
}

export { World };