import { Scene, TextureLoader } from 'three';

function createTexture() {
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('./images/juego-fondo.png');

    return texture;
}

function createScene() {
    const scene = new Scene();
    scene.background = createTexture();

    return scene;
}

export { createScene };