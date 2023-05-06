import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupHeroe } from './setupHeroe.js';

async function loadHeroe(scene, loop, audioWorld) {

    const loader = new GLTFLoader();

    const heroeData = await loader.loadAsync('/models/nave-anim.glb');

    const heroe = setupHeroe(heroeData, scene, loop, audioWorld);

    return heroe;
}

export { loadHeroe };