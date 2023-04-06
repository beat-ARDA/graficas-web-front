import { PerspectiveCamera } from 'three';

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
    let i = 0;
    const camera = new PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000,
    );
    camera.position.set(20, 0, 0);
    camera.tick = () => {
        if (left) {
            camera.position.x = 20 * Math.cos(i * 0.01)
            camera.position.z = 20 * Math.sin(i * 0.01)
            i++;
        }
        else if (right) {
            camera.position.x = 20 * Math.cos(i * 0.01)
            camera.position.z = 20 * Math.sin(i * 0.01)
            i--;
        }
    }

    document.addEventListener("keydown", onCameraMove, false);
    document.addEventListener("keyup", onCameraStop, false);

    return camera;
}

export { createCamera };