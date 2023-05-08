import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupShieldItem } from './setupShieldItem.js';

async function loadShieldItem(scene, socket) {

    const loader = new GLTFLoader();

    const shieldItemData = await loader.loadAsync('/models/shield.glb');

    const shieldItem = setupShieldItem(shieldItemData, scene, socket);

    return shieldItem;
}

export { loadShieldItem };