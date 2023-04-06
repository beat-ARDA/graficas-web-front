import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModelHeroe, setupModelVillain } from './setupModel';
import { MathUtils } from 'three';

async function loadSpaceships() {
    const loader = new GLTFLoader();

    const [heroeData, villainData] = await Promise.all([
        loader.loadAsync('/models/Nave.glb'),
        loader.loadAsync('/models/NaveVillanoTest.glb')
    ]);

    const spaceShipHeroe = setupModelHeroe(heroeData);
    spaceShipHeroe.position.set(10, 0, 0);
    spaceShipHeroe.scale.set(0.1, 0.1, 0.1);
    spaceShipHeroe.rotation.x = MathUtils.degToRad(90);
    spaceShipHeroe.rotation.z = MathUtils.degToRad(180);

    const spaceShipVillain = setupModelVillain(villainData);
    spaceShipVillain.position.set(0, 0, 10);
    spaceShipVillain.scale.set(0.1, 0.1, 0.1);

    return { spaceShipHeroe, spaceShipVillain };
}

export { loadSpaceships };