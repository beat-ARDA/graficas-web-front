import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModelHeroe, setupModelVillain } from './setupModel';
import { MathUtils } from 'three';

const loader = new GLTFLoader();

async function createModels(count, pathModel) {
    let loadersModels = [];
    for (let i = 0; i < count; i++)
        loadersModels.push(loader.loadAsync(pathModel));
    return await Promise.all(loadersModels);
}

async function loadSpaceships(scene) {
    let villainModelsArray = [];
    const heroeData = await loader.loadAsync('/models/Nave.glb');
    const villainsData = await createModels(2, '/models/NaveVillanoTest.glb');

    //Objeto inicial de cada modelo de villano
    const dirVillainArray = [
        {
            "left": true,
            "right": false,
            "up": true,
            "down": false,
            "shoot": false,
            "shootRecall": 0,
            "deleteAfterShoot": false,
            "bullets": false
        },
        {
            "left": true,
            "right": false,
            "up": true,
            "down": false,
            "shoot": false,
            "shootRecall": 0,
            "deleteAfterShoot": false,
            "bullets": false
        }
    ]

    villainsData.map((villain, index) => {
        villain.scene.children[0].position.set(0, index * 1, 10);
        villain.scene.children[0].scale.set(0.1, 0.1, 0.1);
        if (dirVillainArray[index].right)
            villain.scene.children[0].rotation.y = MathUtils.degToRad(90);
        else if (dirVillainArray[index].left)
            villain.scene.children[0].rotation.y = MathUtils.degToRad(-90);
        villain.scene.children[0].name = 'villain' + index;
        const spaceShipVillain = setupModelVillain(villain, scene, dirVillainArray[index]);

        villainModelsArray.push(spaceShipVillain);
    });

    // //Villain
    // const spaceShipVillain = setupModelVillain(villainData, scene, dirVillain);
    // spaceShipVillain.position.set(0, 0, 10);
    // spaceShipVillain.scale.set(0.1, 0.1, 0.1);
    // if (dirVillain.right)
    //     spaceShipVillain.rotation.y = MathUtils.degToRad(90);
    // else if (dirVillain.left)
    //     spaceShipVillain.rotation.y = MathUtils.degToRad(-90);
    // spaceShipVillain.name = 'villain1';

    //Heroe
    const spaceShipHeroe = setupModelHeroe(heroeData, villainModelsArray, scene);
    spaceShipHeroe.position.set(10, 0, 0);
    spaceShipHeroe.scale.set(0.1, 0.1, 0.1);
    spaceShipHeroe.rotation.x = MathUtils.degToRad(90);
    spaceShipHeroe.rotation.z = MathUtils.degToRad(180);

    return { spaceShipHeroe, villainModelsArray };
}

export { loadSpaceships };