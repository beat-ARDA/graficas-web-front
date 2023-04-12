import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModelHeroe, setupModelVillain } from './setupModel';
import { MathUtils } from 'three';

async function loadSpaceships(scene) {
    const loader = new GLTFLoader();

    const [heroeData, villainData] = await Promise.all([
        loader.loadAsync('/models/Nave.glb'),
        loader.loadAsync('/models/NaveVillanoTest.glb')
    ]);

    //Heroe
    const spaceShipHeroe = setupModelHeroe(heroeData, scene);
    spaceShipHeroe.position.set(10, 0, 0);
    spaceShipHeroe.scale.set(0.1, 0.1, 0.1);
    spaceShipHeroe.rotation.x = MathUtils.degToRad(90);
    spaceShipHeroe.rotation.z = MathUtils.degToRad(180);

    //Objeto inicial de cada modelo de villano
    const dirVillain = {
        "left": true,
        "right": false,
        "up": false,
        "down": true,
        "shoot": false,
        "shootRecall": 0,
        "deleteAfterShoot": false,
        "bullets": false
    }

    //Villain
    const spaceShipVillain = setupModelVillain(villainData, scene, dirVillain, spaceShipHeroe);
    spaceShipVillain.position.set(0, 0, 10);
    spaceShipVillain.scale.set(0.1, 0.1, 0.1);
    if (dirVillain.right)
        spaceShipVillain.rotation.y = MathUtils.degToRad(90);
    else if (dirVillain.left)
        spaceShipVillain.rotation.y = MathUtils.degToRad(-90);
    spaceShipVillain.name = 'villain1';

    return { spaceShipHeroe, spaceShipVillain };
}

export { loadSpaceships };