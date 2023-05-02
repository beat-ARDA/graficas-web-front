import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupHeroe } from './setupHeroe.js';

async function loadHeroe(scene, loop) {

    const loader = new GLTFLoader();

    const heroeData = await loader.loadAsync('/models/nave.glb');

    const heroe = setupHeroe(heroeData, scene, loop);

    return heroe;
}

export { loadHeroe };