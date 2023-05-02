import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupVillain } from './setupVillain.js';

async function loadVillain(scene, loop, _left, _right, _countDegrees, _posY) {

    const loader = new GLTFLoader();

    const villainData = await loader.loadAsync('/models/spaceshipTwoPlayer.glb');

    const villain = setupVillain(scene, loop, villainData, _left, _right, _countDegrees, _posY);

    return [villain, villainData];
}

export { loadVillain };