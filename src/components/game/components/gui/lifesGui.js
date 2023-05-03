import { TextureLoader, SpriteMaterial, Sprite, DoubleSide } from "three";

function lifesGui() {
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('images/0v.png');

    // Crea un nuevo objeto Sprite utilizando la textura cargada
    const spriteMaterial = new SpriteMaterial({ map: texture });
    const sprite = new Sprite(spriteMaterial);

    // Establece la posición del Sprite
    sprite.position.set(0, 0, -20);

    return sprite;
}

export { lifesGui }
