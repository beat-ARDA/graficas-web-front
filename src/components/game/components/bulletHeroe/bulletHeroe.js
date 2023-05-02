import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupBulletHeroe } from './setupBulletHeroe.js';

async function loadBulletHeroe(
    heroePos,
    scene,
    heroeCountDegrees,
    heroeLeft,
    heroeRight,
    up,
    down
) {
    const loader = new GLTFLoader();

    const bulletHeroeData = await loader.loadAsync('/models/bulletHeroe.glb');

    const bulletHeroe = setupBulletHeroe(
        bulletHeroeData,
        scene,
        heroePos,
        heroeCountDegrees,
        heroeLeft,
        heroeRight,
        up,
        down
    );

    return [bulletHeroe, bulletHeroeData];
}

export { loadBulletHeroe };