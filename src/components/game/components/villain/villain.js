import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupVillain } from './setupVillain.js';

async function loadVillain(scene, loop, _left, _right, _countDegrees, _posY, animations) {

    const loader = new GLTFLoader();

    const villainData = await loader.loadAsync('/models/nave2-anima.glb');

    const villain = setupVillain(scene, loop, villainData, _left, _right, _countDegrees, _posY, animations);

    return [villain, villainData];
}

export { loadVillain };