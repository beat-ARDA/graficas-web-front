import { Scene, TextureLoader } from 'three';
import { infoGame } from '../helpers/helpers';

function createTexture() {
    const textureLoader = new TextureLoader();
    console.log(process.env.REACT_APP_PATH_LOCAL);
    let pathBackground = infoGame.scene === 1 ? `${process.env.REACT_APP_PATH_LOCAL}/images/scene1.png` : (infoGame.scene === 2 ? `${process.env.REACT_APP_PATH_LOCAL}/images/scene2.png` : `${process.env.REACT_APP_PATH_LOCAL}/images/scene3.png`)
    const texture = textureLoader.load(pathBackground);
    return texture;
}

function createScene() {
    const scene = new Scene();
    scene.background = createTexture();
    return scene;
}

export { createScene };