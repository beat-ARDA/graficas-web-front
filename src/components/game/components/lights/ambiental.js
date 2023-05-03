import { AmbientLight } from 'three';

function ambientLight() {

    const ambientLight = new AmbientLight(0xffffff, 0.5);

    return ambientLight;
}

export { ambientLight };