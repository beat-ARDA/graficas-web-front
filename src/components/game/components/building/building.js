import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModel } from './setupModel';
import { MathUtils } from 'three';

async function loadBuilding() {
    const loader = new GLTFLoader();

    const buildingData = await loader.loadAsync('/models/edificio1.glb');

    const building = setupModel(buildingData);

    building.position.set(0, -5.5, 0);
    building.scale.set(1.7, 1.7, 1.7);
    building.rotation.y = MathUtils.degToRad(275);

    return { building };
}

export { loadBuilding };