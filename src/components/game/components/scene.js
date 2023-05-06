import { Scene, TextureLoader } from 'three';
import { infoGame } from '../helpers/helpers';

function createTexture() {
    const textureLoader = new TextureLoader();
    let pathBackground = infoGame.scene === 1 ? './images/scene1.png' : (infoGame.scene === 2 ? './images/scene2.png' : './images/scene3.png')
    const texture = textureLoader.load(pathBackground);

    return texture;
}

function createScene() {
    const scene = new Scene();
    scene.background = createTexture();

    return scene;
}

export { createScene };