import { OrthographicCamera, PerspectiveCamera } from 'three';
import { MathUtils } from 'three';
import { infoCamera } from '../helpers/helpers';

async function onCameraMove(event) {
    var keyCode = event.which;

    if (keyCode === 65) {
        infoCamera.left = true;
    } else if (keyCode === 68) {
        infoCamera.right = true;
    }
};

async function onCameraStop(event) {
    var keyCode = event.which;

    if (keyCode === 65) {
        infoCamera.left = false;
    } else if (keyCode === 68) {
        infoCamera.right = false;
    }
};

function createCamera() {

    const camera = new PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000,
    );

    camera.position.set(
        infoCamera.distance * Math.cos(MathUtils.degToRad(infoCamera.countDegrees)),
        0,
        infoCamera.distance * Math.sin(MathUtils.degToRad(infoCamera.countDegrees)));

    camera.tick = () => {
        infoCamera.countDegrees = infoCamera.left ? infoCamera.countDegrees + 0.6 : (infoCamera.right ? infoCamera.countDegrees - 0.6 : infoCamera.countDegrees);
        infoCamera.countDegrees = infoCamera.countDegrees >= 360 ? 0 : (infoCamera.countDegrees <= -360 ? 0 : infoCamera.countDegrees);

        camera.position.x = infoCamera.distance * Math.cos(MathUtils.degToRad(infoCamera.countDegrees));
        camera.position.z = infoCamera.distance * Math.sin(MathUtils.degToRad(infoCamera.countDegrees));
    }

    document.addEventListener("keydown", onCameraMove, false);
    document.addEventListener("keyup", onCameraStop, false);

    return camera;
}

export { createCamera };