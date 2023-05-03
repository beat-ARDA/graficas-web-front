import { DirectionalLight } from 'three';

function directionalLight() {
    const light = new DirectionalLight('white', 8);
    light.position.set(0, 10, 0);
    return light;
}

export { directionalLight };