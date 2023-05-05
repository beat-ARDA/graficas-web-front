import { TextureLoader, SpriteMaterial, Sprite } from "three";

function lifesGui() {

    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('images/0v.png');

    // Crea un nuevo objeto Sprite utilizando la textura cargada
    const spriteMaterial = new SpriteMaterial({ map: texture });
    const sprite = new Sprite(spriteMaterial);

    sprite.position.set(0, 0, -0.1);

    return sprite;
}

export { lifesGui }
