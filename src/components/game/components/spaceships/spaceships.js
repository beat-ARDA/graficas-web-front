import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModelHeroe } from './setupModel';

async function loadSpaceships() {
    const loader = new GLTFLoader();

    const heroeData = await loader.loadAsync('/models/NaveHeroeTest.glb');

    const spaceShipHeroe = setupModelHeroe(heroeData);

    return { spaceShipHeroe };
}

export { loadSpaceships };