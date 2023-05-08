import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupBulletTwoPlayer } from './setupBulletTwoPlayer.js';

async function loadTwoPlayerBullet(
    twoPlayerPos,
    scene,
    twoPlayerCountDegrees,
    twoPlayerLeft,
    twoPlayerRight,
    up,
    down,
    loop
) {
    const loader = new GLTFLoader();

    const bulletTwoPlayerData = await loader.loadAsync('/models/bulletHeroe.glb');

    const bulletTwoPlayer = setupBulletTwoPlayer(
        bulletTwoPlayerData,
        scene,
        twoPlayerPos,
        twoPlayerCountDegrees,
        twoPlayerLeft,
        twoPlayerRight,
        up,
        down,
        loop
    );

    return [bulletTwoPlayer, bulletTwoPlayerData];
}

export { loadTwoPlayerBullet };