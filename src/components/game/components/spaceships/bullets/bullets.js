import { SphereGeometry, Mesh, MeshBasicMaterial, TextureLoader } from 'three';

function createMaterial() {
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('./textures/bulletTexture.jpg');
    // texture.wrapS = MirroredRepeatWrapping;
    // texture.wrapT = MirroredRepeatWrapping;
    // texture.repeat.set(2, 2);
    const material = new MeshBasicMaterial({
        map: texture,
    });

    return material;
}

function createBullet(spaceship) {
    var bulletGeo = new SphereGeometry(0.06, 25, 25);
    const material = createMaterial();
    const bullet = new Mesh(bulletGeo, material);
    bullet.position.x = spaceship.position.x;
    bullet.position.y = spaceship.position.y;
    bullet.position.z = spaceship.position.z;

    return bullet;
}

export { createBullet };