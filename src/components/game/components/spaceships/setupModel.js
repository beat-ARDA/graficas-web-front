import { MathUtils } from "three";
import { createBullet } from "./bullets/bullets";
import { Box3 } from "three";

const keyboards = {
    "w": 87,
    "s": 83,
    "a": 65,
    "d": 68,
    "space": 32
}

const dirHeroe = {
    "left": false,
    "right": false,
    "viewLeft": false,
    "viewRight": true,
    "down": false,
    "up": false
};

let bullets = [];

function setupModelHeroe(data, scene) {
    const model = data.scene.children[0];

    let i = 0;
    model.tick = (delta) => {
        //Move spaceship around axis y
        model.position.y = dirHeroe.down ? model.position.y - 0.1 : (
            dirHeroe.up ? model.position.y + 0.1 : model.position.y);

        //Incremente i factor
        i = dirHeroe.left ? i + 0.6 : (
            dirHeroe.right ? i - 0.6 : i);

        //Move spaceship around axis x
        if (dirHeroe.left || dirHeroe.right) {
            model.position.x = 10 * Math.cos(MathUtils.degToRad(i));
            model.position.z = 10 * Math.sin(MathUtils.degToRad(i));
        }

        //Rotate spaceship on move
        model.rotation.z = dirHeroe.right ?
            10 * Math.sin(MathUtils.degToRad((180 + i) * 0.10)) :
            (dirHeroe.left ?
                10 * Math.sin(MathUtils.degToRad(i * 0.108)) :
                model.rotation.z);

        //Quitar balas del arreglo que ya no se usan
        bullets = bullets.filter((bulletInfo) => bulletInfo.bullet !== null);

        //Procesar balas
        bullets.map((bulletInfo) => {
            //Posiciona correctamente la bala, si no, se crea siempre en el origen
            if (bulletInfo.recentCreated) {
                bulletInfo.count = i;
                bulletInfo.recentCreated = false;
            }

            //Valida si la bala esta en movimiento
            if (bulletInfo.onMovement) {
                bulletInfo.bullet.position.z = 10 * Math.sin(MathUtils.degToRad(bulletInfo.count));
                bulletInfo.bullet.position.x = 10 * Math.cos(MathUtils.degToRad(bulletInfo.count));

                //Define la direccion de la bala
                bulletInfo.count = bulletInfo.left ? bulletInfo.count + 1.2 : (bulletInfo.right ? bulletInfo.count - 1.2 : bulletInfo.count);
                //Aumentar contador de grados de la bala
                bulletInfo.countPosition = bulletInfo.left ? bulletInfo.countPosition + 1.2 : (bulletInfo.right ? bulletInfo.countPosition - 1.2 : bulletInfo.countPosition);
                //Eliminar bala cuando llegue a un limite
                if (bulletInfo.left && bulletInfo.countPosition >= 100) {
                    bulletInfo.onMovement = false;
                    scene.remove(bulletInfo.bullet);
                    bulletInfo.bullet.geometry.dispose();
                    bulletInfo.bullet.material.dispose();
                    bulletInfo.bullet = null;
                }
                else if (bulletInfo.right && bulletInfo.countPosition <= -100) {
                    bulletInfo.onMovement = false;
                    scene.remove(bulletInfo.bullet);
                    bulletInfo.bullet.geometry.dispose();
                    bulletInfo.bullet.material.dispose();
                    bulletInfo.bullet = null;
                }

                //Define el limite de grados de la bala
                bulletInfo.count = bulletInfo.count >= 360 ? 0 : (bulletInfo.count <= -360 ? 0 : bulletInfo.count);
                bulletInfo.countPosition = bulletInfo.countPosition >= 360 ? 0 : (bulletInfo.countPosition <= -360 ? 0 : bulletInfo.countPosition);
            }
        });

        //Control the i factor
        i = i >= 360 ? 0 : (i <= -360 ? 0 : i);
    };

    async function onHeroeMove(event) {
        var keyCode = event.which;

        if (keyCode === keyboards.a) {
            dirHeroe.left = true;
            dirHeroe.viewLeft = true;
            dirHeroe.viewRight = false;
        } else if (keyCode === keyboards.d) {
            dirHeroe.right = true;
            dirHeroe.viewLeft = false;
            dirHeroe.viewRight = true;
        } else if (keyCode === keyboards.w)
            dirHeroe.up = true;
        else if (keyCode === keyboards.s)
            dirHeroe.down = true;
        else if (keyCode === keyboards.space) {
            const bullet = createBullet(model);

            bullets.push({
                "left": dirHeroe.viewLeft,
                "right": dirHeroe.viewRight,
                "count": 0,
                "countPosition": 0,
                "onMovement": true,
                "recentCreated": true,
                "bullet": bullet
            });

            scene.add(bullet);

            //scene.add(bulletVillain);
        }
    };

    async function onHeoreStop(event) {
        var keyCode = event.which;

        if (keyCode === keyboards.w)
            dirHeroe.up = false;
        else if (keyCode === keyboards.s)
            dirHeroe.down = false;
        else if (keyCode === keyboards.a)
            dirHeroe.left = false;
        else if (keyCode === keyboards.d)
            dirHeroe.right = false;

    };

    document.addEventListener("keydown", onHeroeMove, false);
    document.addEventListener("keyup", onHeoreStop, false);

    return model;
}

let bulletsVillain = [];

function setupModelVillain(data, scene, dirVillain, heroe) {
    const model = data.scene.children[0];
    let i = 0;

    model.tick = (delta) => {
        //Verificar si el modelo no a sido removido de la escena
        const modelExists = scene.getObjectByName('villain1') !== undefined;
        if (modelExists) {
            //Charge bullets
            if (!dirVillain.bullets && bulletsVillain.length <= 0) {
                const directions = [{ "up": true, "down": false, "rect": false }, { "up": false, "down": true, "rect": false }, { "up": false, "down": false, "rect": true }];
                for (let o = 0; o < 3; o++) {
                    let bullet = createBullet(model);
                    bulletsVillain.push({
                        "left": dirVillain.left,
                        "right": dirVillain.right,
                        "count": 0,
                        "countPosition": 0,
                        "onMovement": false,
                        "recentCreated": true,
                        "velocity": 1,
                        "up": directions[o].up,
                        "down": directions[o].down,
                        "rect": directions[o].rect,
                        "bullet": bullet
                    });
                }
                dirVillain.bullets = true;
            }

            //increment position
            i = dirVillain.left ? i + 0.2 : (
                dirVillain.right ? i - 0.2 : i);

            //Move villain around axis x
            if (dirVillain.left || dirVillain.right) {
                model.position.x = 10 * Math.cos(MathUtils.degToRad(i));
                model.position.z = 10 * Math.sin(MathUtils.degToRad(i));
            }

            //Calculate distance heroe and villain
            let distancia = model.position.distanceTo(heroe.position);

            if (distancia <= 5 && !dirVillain.shoot)
                dirVillain.shoot = true;

            if (dirVillain.shoot)
                dirVillain.shootRecall += 0.01;
            //Recorre la ristra de balas
            if (dirVillain.shoot && dirVillain.shootRecall >= 1)
                bulletsVillain.map((bulletInfo) => {
                    //Posiciona correctamente la bala, si no, se crea siempre en el origen
                    if (bulletInfo.recentCreated) {
                        bulletInfo.count = i;
                        bulletInfo.recentCreated = false;
                        bulletInfo.onMovement = true;
                        scene.add(bulletInfo.bullet);
                    }

                    //Valida si la bala esta en movimiento
                    if (bulletInfo.onMovement) {
                        bulletInfo.bullet.position.z = 10 * Math.sin(MathUtils.degToRad(bulletInfo.count));
                        bulletInfo.bullet.position.x = 10 * Math.cos(MathUtils.degToRad(bulletInfo.count));
                        if (bulletInfo.up)
                            bulletInfo.bullet.position.y += 0.01;
                        else if (bulletInfo.down)
                            bulletInfo.bullet.position.y -= 0.01;

                        //Define la direccion de la bala
                        bulletInfo.count = bulletInfo.left ? bulletInfo.count + 0.3 : (bulletInfo.right ? bulletInfo.count - 0.3 : bulletInfo.count);
                        //Aumentar contador de grados de la bala
                        bulletInfo.countPosition = bulletInfo.left ? bulletInfo.countPosition + 0.3 : (bulletInfo.right ? bulletInfo.countPosition - 0.3 : bulletInfo.countPosition);
                        //Eliminar bala cuando llegue a un limite
                        if (bulletInfo.left && bulletInfo.countPosition >= 100) {
                            bulletInfo.onMovement = false;
                            scene.remove(bulletInfo.bullet);
                            bulletInfo.bullet.geometry.dispose();
                            bulletInfo.bullet.material.dispose();
                            bulletInfo.bullet = null;

                        }
                        else if (bulletInfo.right && bulletInfo.countPosition <= -100) {
                            bulletInfo.onMovement = false;
                            scene.remove(bulletInfo.bullet);
                            bulletInfo.bullet.geometry.dispose();
                            bulletInfo.bullet.material.dispose();
                            bulletInfo.bullet = null;

                        }

                        //Define el limite de grados de la bala
                        bulletInfo.count = bulletInfo.count >= 360 ? 0 : (bulletInfo.count <= -360 ? 0 : bulletInfo.count);
                        bulletInfo.countPosition = bulletInfo.countPosition >= 360 ? 0 : (bulletInfo.countPosition <= -360 ? 0 : bulletInfo.countPosition);
                    }
                });

            //Comprobar balas vacias
            const bulletsFIlter = bulletsVillain.filter((bulletInfo) => bulletInfo.bullet !== null);
            if (bulletsFIlter.length <= 0) {
                dirVillain.bullets = false;
                dirVillain.shoot = false;
                bulletsVillain = [];
                dirVillain.shootRecall = 0;
            }

            //Process colisions
            bullets = bullets.filter((bulletInfo) => bulletInfo.bullet !== null);
            bullets.map((bulletInfo) => {
                if (bulletInfo.onMovement) {
                    let boxBullet = new Box3().setFromObject(bulletInfo.bullet);
                    let boxVillain = new Box3().setFromObject(model);

                    if (boxBullet.intersectsBox(boxVillain)) {
                        scene.remove(model);
                        bulletInfo.onMovement = false;
                        scene.remove(bulletInfo.bullet);
                        bulletInfo.bullet.geometry.dispose();
                        bulletInfo.bullet.material.dispose();
                        bulletInfo.bullet = null;
                    }
                    boxBullet = null;
                    boxVillain = null;
                }
            });

            //Control the i factor
            i = i >= 360 ? 0 : (i <= -360 ? 0 : i);
        }
    }

    return model;
}

export { setupModelHeroe, setupModelVillain };