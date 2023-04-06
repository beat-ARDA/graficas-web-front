import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModel } from './setupModel';

async function loadBuilding() {
    const loader = new GLTFLoader();

    const buildingData = await loader.loadAsync('/models/edificio.glb');

    const building = setupModel(buildingData);

    return { building };
}

export { loadBuilding };