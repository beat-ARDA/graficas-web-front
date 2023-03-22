import { PerspectiveCamera } from 'three';
import { MathUtils } from 'three';

function createCamera() {
    const camera = new PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        10000,
    );
    camera.position.set(0, 0, 10);

    return camera;
}

export { createCamera };