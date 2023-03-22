import { Scene, TextureLoader } from 'three';

function createTexture() {
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('./textures/skydome1.jpg');

    return texture;
}

function createScene() {
    const scene = new Scene();
    scene.background = createTexture();

    return scene;
}

export { createScene };