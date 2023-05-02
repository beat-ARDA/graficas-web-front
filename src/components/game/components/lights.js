import { DirectionalLight } from 'three';

function createLights() {
    const light = new DirectionalLight('white', 8);
    light.position.set(0, 10, 0);

    return light;
}
export { createLights };