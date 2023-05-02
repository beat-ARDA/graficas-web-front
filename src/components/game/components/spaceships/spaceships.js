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
            "bulletsInSpaceship": 1,
            "runTick": false,
            "created": false
        });
    }

    return await Promise.all(loadersModels);
}

async function loadSpaceships(scene, loop, shieldItem, hearthItem) {
    let level = 3;
    let countLevel = 0;
    let distanceObjects = 10;
    let _countDegreesVillains = 180;
    let _countDegreesHeroe = 90;
    let villainModelsArray = [];
    for (let l = 1; l < level + 1; l++)
        countLevel += (3 * l);

    const heroeData = await loader.loadAsync('/models/sapaceShipOnePlayer.glb');
    const villainsData = await createModels(countLevel, '/models/spaceshipTwoPlayer.glb', true, false);

    villainsData.forEach((villain, index) => {
        let separator = 0;

        if (villainsData.length % 2 === 0) {
            separator = 2;
        } else {
            separator = 1;
        }

        villain.scene.children[0].position.x = distanceObjects * Math.cos(MathUtils.degToRad(_countDegreesVillains));
        villain.scene.children[0].position.z = distanceObjects * Math.sin(MathUtils.degToRad(_countDegreesVillains));
        villain.scene.children[0].position.y = index - separator;
        villain.scene.children[0].scale.set(0.1, 0.1, 0.1);

        if (dirVillainArray[index].right)
            villain.scene.children[0].rotation.y = MathUtils.degToRad(90);
        else if (dirVillainArray[index].left)
            villain.scene.children[0].rotation.y = MathUtils.degToRad(-90);
        villain.scene.children[0].name = 'villain' + index;
        const spaceShipVillain = setupModelVillain(villain, scene, dirVillainArray[index], loop, _countDegreesVillains, distanceObjects);
        villainModelsArray.push(spaceShipVillain);
    });

    //Heroe
    heroeData.scene.children[0].position.x = distanceObjects * Math.cos(MathUtils.degToRad(_countDegreesHeroe));
    heroeData.scene.children[0].position.z = distanceObjects * Math.sin(MathUtils.degToRad(_countDegreesHeroe));
    heroeData.scene.children[0].position.y = 0;
    heroeData.scene.children[0].scale.set(0.1, 0.1, 0.1);
    heroeData.scene.children[0].rotation.y = MathUtils.degToRad(180);
    const spaceShipHeroe = setupModelHeroe(
        heroeData,
        villainModelsArray,
        scene,
        dirVillainArray,
        loop,
        _countDegreesHeroe,
        distanceObjects,
        shieldItem,
        hearthItem
    );
    //spaceShipHeroe.position.set(10, 0, 0);

    return { spaceShipHeroe, villainModelsArray };
}

export { loadSpaceships };