import { BoxGeometry, Mesh, MeshStandardMaterial, MathUtils, TextureLoader } from 'three';

function createMaterial() {
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('textures/uv-test-bw.png');
    const material = new MeshStandardMaterial({ map: texture });

    return material;
}

function createCube() {
    const geometry = new BoxGeometry(2, 2, 2);
    const material = createMaterial();
    const cube = new Mesh(geometry, material);
    cube.rotation.set(-0.5, -0.1, 0.8);
    const radiansPerSecond = MathUtils.degToRad(30);

    cube.tick = (delta) => {
        // increase the cube's rotation each frame
        cube.rotation.z += radiansPerSecond * delta;
        cube.rotation.x += radiansPerSecond * delta;
        cube.rotation.y += radiansPerSecond * delta;
    };


    return cube;
}

export { createCube };