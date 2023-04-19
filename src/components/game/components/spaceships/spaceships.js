import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupModelHeroe, setupModelVillain } from './setupModel';
import { MathUtils } from 'three';

const loader = new GLTFLoader();

const dirVillainArray = [];

async function createModels(count, pathModel, left = true, right = false) {
    
    if (left && right)
        right = false;
    else if (!left && !right)
        left = false;

    let loadersModels = [];
    for (let i = 0; i < count; i++) {
        loadersModels.push(loader.loadAsync(pathModel));
        dirVillainArray.push({
            "left": left,
            "right": right,
            "up": true,
            "down": false,
            "shoot": false,
            "shootRecall": 0,
            "velocityShootRecall": 0.08,
            "limitShootRecall": 15,
            "deleteAfterShoot": false,
            "exists": true,
            "bullets": false,
            "bulletsInSpaceship": 1
        });
    }

    return await Promise.all(loadersModels);
}

async function loadSpaceships(scene, loop) {
    let villainModelsArray = [];
    const heroeData = await loader.loadAsync('/models/Parrot.glb');
    const villainsData = await createModels(4, '/models/Stork.glb', false, true);

    villainsData.forEach((villain, index) => {
        let separator = 0;

        if (villainsData.length % 2 === 0) {
            separator = 2;
        } else {
            separator = 1;
        }

        villain.scene.children[0].position.set(0, (index * 1) - separator, 10);
        villain.scene.children[0].scale.set(0.1, 0.1, 0.1);
        if (dirVillainArray[index].right)
            villain.scene.children[0].rotation.y = MathUtils.degToRad(90);
        else if (dirVillainArray[index].left)
            villain.scene.children[0].rotation.y = MathUtils.degToRad(-90);
        villain.scene.children[0].name = 'villain' + index;
        const spaceShipVillain = setupModelVillain(villain, scene, dirVillainArray[index], loop);

        villainModelsArray.push(spaceShipVillain);
    });

    //Heroe
    const spaceShipHeroe = setupModelHeroe(heroeData, villainModelsArray, scene, dirVillainArray, loop);
    spaceShipHeroe.position.set(10, 0, 0);
    spaceShipHeroe.scale.set(0.1, 0.1, 0.1);
    spaceShipHeroe.rotation.y = MathUtils.degToRad(180);

    return { spaceShipHeroe, villainModelsArray };
}

export { loadSpaceships };