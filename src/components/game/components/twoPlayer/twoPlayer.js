import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupTwoPlayer } from './setupTwoPlayer';

async function loadTwoPlayer(scene, loop, socket) {
    const loader = new GLTFLoader();
    const twoPlayerData = await loader.loadAsync('/models/nave2-anima.glb');
    const twoPlayer = setupTwoPlayer(twoPlayerData, scene, loop, socket);
    return twoPlayer;
}

export { loadTwoPlayer };