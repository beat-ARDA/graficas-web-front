import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupHearthItem } from './setupHearthItem.js';

async function loadHearthItem(scene, socket) {

    const loader = new GLTFLoader();

    const hearthItemData = await loader.loadAsync('/models/hearth.glb');

    const hearthItem = setupHearthItem(hearthItemData, scene, socket);

    return hearthItem;
}

export { loadHearthItem };