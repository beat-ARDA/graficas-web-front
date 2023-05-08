import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupHeroe } from './setupHeroe.js';
import { infoGame } from '../../helpers/helpers.js';

async function loadHeroe(scene, loop, socket) {

    const loader = new GLTFLoader();

    const heroeData = await loader.loadAsync('/models/nave-anim.glb');

    const heroe = setupHeroe(heroeData, scene, loop, socket);

    return heroe;
}

export { loadHeroe };