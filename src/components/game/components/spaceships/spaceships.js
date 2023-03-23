import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModelP1, setupModelP2 } from './setupModel';
import { MathUtils } from 'three';

async function loadSpaceshipP1(scene) {
    const loader = new GLTFLoader();
    const naveDataP1 = await loader.loadAsync('/models/NaveP1.glb');
    const naveP1 = setupModelP1(naveDataP1, scene);

    naveP1.rotation.y = MathUtils.degToRad(-90);
    naveP1.scale.set(0.1, 0.1, 0.1);

    return { naveP1 };
}

async function loadSpaceshipP2(scene) {
    const loader = new GLTFLoader();
    const naveDataP2 = await loader.loadAsync('/models/NaveP2.glb');
    const naveP2 = setupModelP2(naveDataP2, scene);

    naveP2.position.x = 5;
    naveP2.rotation.y = MathUtils.degToRad(-90);
    naveP2.scale.set(0.1, 0.1, 0.1);

    return { naveP2 };
}

export { loadSpaceshipP1, loadSpaceshipP2 };