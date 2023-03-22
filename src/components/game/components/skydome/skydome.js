import { SphereGeometry, Mesh, MathUtils, MeshBasicMaterial, TextureLoader, BackSide, RepeatWrapping, MirroredRepeatWrapping } from 'three';

function createMaterial() {
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('./textures/skydome1.jpg');
    texture.wrapS = MirroredRepeatWrapping;
    texture.wrapT = MirroredRepeatWrapping;
    texture.repeat.set(2, 2);
    const material = new MeshBasicMaterial({
        map: texture,
        side: BackSide
    });

    return material;
}

function createSkydome() {
    let right, left = false;
    var skyGeo = new SphereGeometry(9000, 25, 25);
    const material = createMaterial();
    const skydome = new Mesh(skyGeo, material);

    const radiansPerSecond = MathUtils.degToRad(10);
    skydome.tick = (delta) => {
        if (right)
            skydome.rotation.y += radiansPerSecond * delta;
        else if (left)
            skydome.rotation.y -= radiansPerSecond * delta;
    };

    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if (keyCode == 65) {
            left = true;
        } else if (keyCode == 68) {
            right = true;
        }
    };

    document.addEventListener("keyup", onDocumentKeyUp, false);
    function onDocumentKeyUp(event) {
        var keyCode = event.which;
        if (keyCode == 65) {
            left = false;
        } else if (keyCode == 68) {
            right = false;
        }
    };


    return skydome;
}

export { createSkydome };