import { PerspectiveCamera } from 'three';
import { MathUtils } from 'three';

let left, right = false;

async function onCameraMove(event) {
    var keyCode = event.which;

    if (keyCode === 65) {
        left = true;
    } else if (keyCode === 68) {
        right = true;
    }
};

async function onCameraStop(event) {
    var keyCode = event.which;

    if (keyCode === 65) {
        left = false;
    } else if (keyCode === 68) {
        right = false;
    }
};

function createCamera() {
    let distanceCamera = 20;
    let i = 90;
    const camera = new PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000,
    );

    camera.position.set(distanceCamera * Math.cos(MathUtils.degToRad(i)), 0, distanceCamera * Math.sin(MathUtils.degToRad(i)));

    camera.tick = () => {

        i = left ? i + 0.6 : (right ? i - 0.6 : i);
        i = i >= 360 ? 0 : (i <= -360 ? 0 : i);

        camera.position.x = distanceCamera * Math.cos(MathUtils.degToRad(i));
        camera.position.z = distanceCamera * Math.sin(MathUtils.degToRad(i));
    }

    document.addEventListener("keydown", onCameraMove, false);
    document.addEventListener("keyup", onCameraStop, false);

    return camera;
}

export { createCamera };