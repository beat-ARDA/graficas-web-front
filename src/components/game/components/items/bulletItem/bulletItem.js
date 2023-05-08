import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupBulletItem } from './setupBulletItem.js';

async function loadBulletItem(scene, socket) {

    const loader = new GLTFLoader();

    const bulletItemData = await loader.loadAsync('/models/bullet.glb');

    const bulletItem = setupBulletItem(bulletItemData, scene, socket);

    return bulletItem;
}

export { loadBulletItem };