import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MathUtils } from 'three';
import { deepCloneAttribute } from 'three/examples/jsm/utils/BufferGeometryUtils';

const loader = new GLTFLoader();

async function createShield(scene) {
    let degrees = 0;
    let posY = 5;
    const shieldData = await loader.loadAsync('/models/shield.glb');
    const model = shieldData.scene.children[0];
    model.name = "shieldItem";

    model.position.x = 0;
    model.position.y = posY;
    model.position.z = 10;

    model.scale.set(0.04, 0.04, 0.04);

    model.tick = (delta) => {

        degrees += 1.5;
        posY -= 0.01;

        model.rotation.z = MathUtils.degToRad(degrees);

        model.position.y = posY;

        if (!scene.getObjectByName("shieldItem"))
            posY = 5;
    };

    return model;
}

export { createShield };