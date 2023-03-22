import { AnimationMixer, MathUtils } from "three";
import { createBullet } from "./bullets/bullets";
function setupModel(data, scene, container) {
    let bulletsLeft = [];
    let bulletsRight = [];
    let bulletsDelete = [];
    let bulletMove = false;
    let left = true;
    let right = false;
    let arriba, abajo = false;
    const model = data.scene.children[0];
    // const clip = data.animations[0];
    // const mixer = new AnimationMixer(model);
    // const action = mixer.clipAction(clip);

    // document.addEventListener("keydown", onDocumentKeyDown, false);
    // function onDocumentKeyDown(event) {
    //     var keyCode = event.which;
    //     if (keyCode == 65) {
    //         left = true;
    //     } else if (keyCode == 68) {
    //         right = true;
    //     }

    // };

    model.tick = (delta) => {
        // mixer.update(delta);
        if (bulletMove) {
            bulletsLeft.map((bullet) => {
                bullet.position.x -= 0.05;
                if (bullet.position.x <= -2)
                    bulletsDelete.push(bullet);
            });

            bulletsRight.map((bullet) => {
                bullet.position.x += 0.05;
                if (bullet.position.x >= 2)
                    bulletsDelete.push(bullet);
            });
        }

        bulletsDelete.map((bullet) => scene.remove(bullet));
        bulletsDelete = [];

        if (arriba)
            model.position.y += 0.1;
        else if (abajo)
            model.position.y -= 0.1;
    };

    document.addEventListener("keydown", onDocumentKeyDown, false);
    async function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if (keyCode == 65) {
            left = true;
            right = false;
            model.rotation.y = MathUtils.degToRad(275);
        } else if (keyCode == 68) {
            left = false;
            right = true;
            model.rotation.y = MathUtils.degToRad(90);
        } else if (keyCode == 87) {
            arriba = true;
        }
        else if (keyCode == 83) {
            abajo = true;
        }
        else if (keyCode == 32) {
            let bullet = createBullet(model);
            if (left)
                bulletsLeft.push(bullet);
            else if (right)
                bulletsRight.push(bullet);
            scene.add(bullet);
            bulletMove = true;
        }
    };

    document.addEventListener("keyup", onDocumentKeyUp, false);
    async function onDocumentKeyUp(event) {
        var keyCode = event.which;
        if (keyCode == 87) {
            arriba = false;
        }
        else if (keyCode == 83) {
            abajo = false;
        }
    };

    return model;
}

export { setupModel };