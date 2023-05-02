import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupBulletVillain } from './setupBulletVillain.js';

async function loadBulletVillain(
    villainPos,
    scene,
    villainCountDegrees,
    villainLeft,
    villainRight
) {
    const loader = new GLTFLoader();

    const bulletVillainData = await loader.loadAsync('/models/bulletVillain.glb');

    const bulletVillain = setupBulletVillain(
        bulletVillainData,
        scene,
        villainPos,
        villainCountDegrees,
        villainLeft,
        villainRight
    );

    return [bulletVillain, bulletVillainData];
}

export { loadBulletVillain };