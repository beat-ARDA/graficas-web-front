import { SpotLight } from 'three';

function spotLight(position, color) {

    const spot = new SpotLight(color);
    spot.position.set(position.x, position.y, position.z);
    spot.angle = Math.PI / 4;
    spot.penumbra = 0.05;
    spot.decay = 2;
    spot.distance = 100;

    return spot;
}

export { spotLight };