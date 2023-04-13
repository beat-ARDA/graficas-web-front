import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModelHeroe, setupModelVillain } from './setupModel';
import { MathUtils } from 'three';

async function GenerateVillainModels(count) {
    const loader = new GLTFLoader();
    let loadersModels = [];

    for (let i = 0; i < count; i++)
        loadersModels.push(loader.loadAsync('/models/NaveVillanoTest.glb'));

    const modelsData = await Promise.all(loadersModels);

    return modelsData;
}

async function loadSpaceships(scene) {
    const loader = new GLTFLoader();

    //Generar modelos
    const modelsVillainsData = await GenerateVillainModels(2);
    const heroeData = await loader.loadAsync('/models/Nave.glb');

    //Heroe
    const spaceShipHeroe = setupModelHeroe(heroeData, scene);
    spaceShipHeroe.position.set(10, 0, 0);
    spaceShipHeroe.scale.set(0.1, 0.1, 0.1);
    spaceShipHeroe.rotation.x = MathUtils.degToRad(90);
    spaceShipHeroe.rotation.z = MathUtils.degToRad(180);

    let dirVillainArray = [];

    let modelsVillains = [];

    const dirVillain1 = {
        "left": true,
        "right": false,
        "up": false,
        "down": true,
        "shoot": false,
        "shootRecall": 0,
        "deleteAfterShoot": false,
        "bullets": false
    }

    const dirVillain2 = {
        "left": false,
        "right": true,
        "up": false,
        "down": true,
        "shoot": false,
        "shootRecall": 0,
        "deleteAfterShoot": false,
        "bullets": false
    }

    dirVillainArray.push(dirVillain1, dirVillain2);

    modelsVillainsData.map((modelData, index) => {
        //Villain1
        const spaceShipVillain = setupModelVillain(modelData, scene, dirVillainArray[index], spaceShipHeroe);
        spaceShipVillain.position.set(0, 0, 10);
        spaceShipVillain.scale.set(0.1, 0.1, 0.1);
        if (dirVillainArray[index].right)
            spaceShipVillain.rotation.y = MathUtils.degToRad(90);
        else if (dirVillainArray[index].left)
            spaceShipVillain.rotation.y = MathUtils.degToRad(-90);
        spaceShipVillain.name = 'villain' + `${index}`;

        modelsVillains.push(spaceShipVillain);
    });

    return { spaceShipHeroe, modelsVillains };
}

export { loadSpaceships };