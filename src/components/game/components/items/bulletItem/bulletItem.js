import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { setupBulletItem } from './setupBulletItem.js';

async function loadBulletItem(scene) {

    const loader = new GLTFLoader();

    const bulletItemData = await loader.loadAsync('/models/bullet.glb');

    const bulletItem = setupBulletItem(bulletItemData, scene);

    return bulletItem;
}

export { loadBulletItem };