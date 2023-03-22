import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModel } from './setupModel';
import { MathUtils } from 'three';

async function loadSpaceships(scene, container) {
    const loader = new GLTFLoader();
    const naveData = await loader.loadAsync('/models/NaveVillanoTest.glb');
    const nave = setupModel(naveData, scene, container);
    nave.rotation.y = MathUtils.degToRad(-90);
    nave.scale.set(0.1, 0.1, 0.1);

    return { nave };
}

export { loadSpaceships };