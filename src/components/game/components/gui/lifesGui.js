import { TextureLoader, SpriteMaterial, Sprite } from "three";
import { infoGui } from "../../helpers/helpers";
import { MathUtils } from "three";

async function onMoveGui(event) {
    var keyCode = event.which;

    if (keyCode === 65) {
        infoGui.left = true;
    } else if (keyCode === 68) {
        infoGui.right = true;
    }
};

async function onGuiStop(event) {
    var keyCode = event.which;

    if (keyCode === 65) {
        infoGui.left = false;
    } else if (keyCode === 68) {
        infoGui.right = false;
    }
};

function lifesGui() {

    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('images/0v.png');

    // Crea un nuevo objeto Sprite utilizando la textura cargada
    const spriteMaterial = new SpriteMaterial({ map: texture });
    const sprite = new Sprite(spriteMaterial);

    // Establece la posición del Sprite
    // sprite.position.set(
    //     infoGui.distance * Math.cos(MathUtils.degToRad(infoGui.countDegrees)),
    //     0.38,
    //     infoGui.distance * Math.sin(MathUtils.degToRad(infoGui.countDegrees)));

    sprite.position.set(0, 0, -0.1);
    //sprite.scale.set(0.1, 0.1, 0.1);

    // sprite.tick = () => {
    //     infoGui.countDegrees = infoGui.left ? infoGui.countDegrees + 0.6 : (infoGui.right ? infoGui.countDegrees - 0.6 : infoGui.countDegrees);
    //     infoGui.countDegrees = infoGui.countDegrees >= 360 ? 0 : (infoGui.countDegrees <= -360 ? 0 : infoGui.countDegrees);

    //     sprite.position.x = infoGui.distance * Math.cos(MathUtils.degToRad(infoGui.countDegrees)) + 0.75;
    //     //sprite.position.y = 2;
    //     sprite.position.z = infoGui.distance * Math.sin(MathUtils.degToRad(infoGui.countDegrees)) + 0.75;
    // }

    // document.addEventListener("keydown", onMoveGui, false);
    // document.addEventListener("keyup", onGuiStop, false);

    return sprite;
}

export { lifesGui }
