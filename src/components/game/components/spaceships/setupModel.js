import { MathUtils } from "three";
import { createBullet } from "./bullets/bullets";
import { Box3 } from "three";
import { AnimationMixer } from 'three';

const keyboards = {
    "w": 87,
    "s": 83,
    "a": 65,
    "d": 68,
    "space": 32
}

const dirHeroe = {
    "lifes": 3,
    "left": false,
    "right": false,
    "viewLeft": false,
    "viewRight": true,
    "down": false,
    "up": false
};

function setupModelHeroe(data, villainModelsArray, scene, dirVillainArray) {
    /*///////////////////////////////////////////////////////////////////////////////////////
    /                                 Declaracion de variables                              /
    /*///////////////////////////////////////////////////////////////////////////////////////
    const model = data.scene.children[0];
    let bullets = [];
    let indexBullets = [];
    let indexVillains = [];
    let countDegrees = 0;

    // const clip = data.animations[0];

    // const mixer = new AnimationMixer(model);
    // const action = mixer.clipAction(clip);
    // action.play();

    model.tick = (delta) => {
        //mixer.update(delta);
        /*///////////////////////////////////////////////////////////////////////////////////////
        /                                     Movimiento Heroe                                  /
        /*///////////////////////////////////////////////////////////////////////////////////////
        //Aumentar contador de grados
        if (dirHeroe.left)
            countDegrees += 0.6;
        else if (dirHeroe.right)
            countDegrees -= 0.6;
        //Subir o bajar nave
        if (dirHeroe.down)
            model.position.y -= 0.1;
        else if (dirHeroe.up)
            model.position.y += 0.1;
        //Rotar la nave
        if (dirHeroe.right)
            model.rotation.y = -10 * Math.sin(MathUtils.degToRad((180 + countDegrees) * 0.102));
        else if (dirHeroe.left)
            model.rotation.y = -10 * Math.sin(MathUtils.degToRad(countDegrees * 0.108));
        //Mover heroe a la derecha o izquierda
        if (dirHeroe.left || dirHeroe.right) {
            model.position.x = 10 * Math.cos(MathUtils.degToRad(countDegrees));
            model.position.z = 10 * Math.sin(MathUtils.degToRad(countDegrees));
        }
        //Restablecer contador de grados al llegar al limite
        if (countDegrees >= 360)
            countDegrees = 0;
        else if (countDegrees <= -360)
            countDegrees = 0;

        /*///////////////////////////////////////////////////////////////////////////////////////
        /                                      Colisiones                                       /
        /*///////////////////////////////////////////////////////////////////////////////////////

        bullets.forEach((bulletInfo) => {
            let boxBullet = new Box3().setFromObject(bulletInfo.bullet);
            villainModelsArray.forEach((villain) => {
                let boxVillain = new Box3().setFromObject(villain);
                if (boxBullet.intersectsBox(boxVillain)) {
                    indexBullets.push(bullets.indexOf(bulletInfo));
                    indexVillains.push(villainModelsArray.indexOf(villain));
                    console.log(villainModelsArray.indexOf(villain));
                }
            });
        });

        //Elimina los villanos colisionados
        indexVillains.forEach(index => {
            dirVillainArray[index].exists = false;
            scene.remove(villainModelsArray[index]);
            delete(villainModelsArray[index]);
            //villainModelsArray.splice(index, 1);
        });

        indexVillains = [];

        //Elimina las balas colisionadas
        indexBullets.forEach(index => {
            scene.remove(bullets[index].bullet);
            bullets[index].bullet.geometry.dispose();
            bullets[index].bullet.material.dispose();
            bullets[index].bullet = null;
            bullets.splice(index, 1);
        });

        indexBullets = [];

        /*///////////////////////////////////////////////////////////////////////////////////////
        /                                    Disparos Heroe                                     /
        /*///////////////////////////////////////////////////////////////////////////////////////

        bullets.forEach((bulletInfo, index) => {
            if (bulletInfo.recentCreated) {
                bulletInfo.count = countDegrees;
                bulletInfo.recentCreated = false;
            }

            //Incrementar contador de grados de la bala
            if (bulletInfo.left)
                bulletInfo.count += 1.2;
            else if (bulletInfo.right)
                bulletInfo.count -= 1.2;
            //Incrementar contador de grados secundario de la bala
            if (bulletInfo.left)
                bulletInfo.countPosition += 1.2;
            else if (bulletInfo.right)
                bulletInfo.countPosition -= 1.2;
            //Mover bala 
            bulletInfo.bullet.position.z = 10 * Math.sin(MathUtils.degToRad(bulletInfo.count));
            bulletInfo.bullet.position.x = 10 * Math.cos(MathUtils.degToRad(bulletInfo.count));
            //Establecer limites de movimiento
            bulletInfo.count = bulletInfo.count >= 360 ? 0 : (bulletInfo.count <= -360 ? 0 : bulletInfo.count);
            bulletInfo.countPosition = bulletInfo.countPosition >= 360 ? 0 : (bulletInfo.countPosition <= -360 ? 0 : bulletInfo.countPosition);

            /*///////////////////////////////////////////////////////////////////////////////////////
            /                               Establecer limites de la bala                           /
            /*///////////////////////////////////////////////////////////////////////////////////////

            //Eliminar bala cuando llegue a un limite
            if (bulletInfo.left && bulletInfo.countPosition >= 100)
                indexBullets.push(index);
            else if (bulletInfo.right && bulletInfo.countPosition <= -100)
                indexBullets.push(index);
        });

        //Elima las balas que llegaron al limite
        indexBullets.forEach(index => {
            scene.remove(bullets[index].bullet);
            bullets[index].bullet.geometry.dispose();
            bullets[index].bullet.material.dispose();
            bullets[index].bullet = null;
            bullets.splice(index, 1);
        });

        indexBullets = [];
    };

    let lastExecutionTime = 0;
    async function onHeroeMove(event) {
        var keyCode = event.which;
        const now = Date.now();

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
        else if (keyCode === keyboards.s) {
            dirHeroe.down = true;
        }

        if (now - lastExecutionTime >= 100) {
            if (keyCode === keyboards.space) {
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
            }

            lastExecutionTime = now;
        }
    }

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

function setupModelVillain(data, scene, dirVillain) {
    /*//////////////////////////////////////////////////////
    /               Definicion de variables                /
    ///////////////////////////////////////////////////////*/
    const model = data.scene.children[0];
    let bulletsVillain = [];
    let indexBulletsVillain = [];
    let countDegrees = 0;
    let countUpDown = model.position.y;
    let limiteUp = model.position.y + 2;
    let limiteDown = model.position.y - 2;
    // const clip = data.animations[0];
    // const mixer = new AnimationMixer(model);
    // const action = mixer.clipAction(clip);
    // action.play();

    model.tick = (delta) => {

        //mixer.update(delta);
        /*////////////////////////////////////////////////////////////////////////////////////////
        /                                 Movimiento nave enemiga                                /
        /*///////////////////////////////////////////////////////////////////////////////////////*/

        //Aumenta los grados del movimiento de la nave
        if (dirVillain.left)
            countDegrees += 0.2;
        else if (dirVillain.right)
            countDegrees -= 0.2;
        //Aumenta el contador de arriba abajo
        if (dirVillain.up)
            countUpDown += 0.05;
        else if (dirVillain.down)
            countUpDown -= 0.05;
        //Restablece la direccion en el eje y
        if (countUpDown >= limiteUp) {
            dirVillain.up = false;
            dirVillain.down = true;
        }
        else if (countUpDown <= limiteDown) {
            dirVillain.up = true;
            dirVillain.down = false;
        }
        //Mueve la nave
        model.position.x = 10 * Math.cos(MathUtils.degToRad(countDegrees));
        model.position.z = 10 * Math.sin(MathUtils.degToRad(countDegrees));
        //Restablece el contador de grados del movimiento de la nave
        if (countDegrees >= 360)
            countDegrees = 0;
        else if (countDegrees <= -360)
            countDegrees = 0;

        /*/////////////////////////////////////////////////////////////////////////////////////////
        /                                 Movimiento balas villano                                /
        /*///////////////////////////////////////////////////////////////////////////////////////*/

        //Crear balas
        if (!dirVillain.bullets) {
            for (let i = 0; i < 3; i++)
                bulletsVillain.push({
                    "left": dirVillain.left,
                    "right": dirVillain.right,
                    "count": 0,
                    "countPosition": 0,
                    "onMovement": true,
                    "velocity": 0.4,
                    "bullet": createBullet(model),
                    "recentCreated": true
                });
            dirVillain.bullets = true;
        }

        //Aumentar el atraso del disparo
        if (dirVillain.exists)
            dirVillain.shootRecall += dirVillain.velocityShootRecall;

        //Si el shoot recall llega al limite dispara
        if (dirVillain.shootRecall >= dirVillain.limitShootRecall)
            dirVillain.shoot = true;

        //Si la nave enemiga dispara
        if (dirVillain.shoot) {
            //Recorre la bala
            bulletsVillain.forEach((bulletInfo, indexBulletVillain) => {
                //Si la bala esta recien creada
                if (bulletInfo.recentCreated) {
                    bulletInfo.count = countDegrees;
                    scene.add(bulletInfo.bullet);
                    bulletInfo.recentCreated = false;
                }

                //Incrementar contador de grados de la bala
                if (bulletInfo.left)
                    bulletInfo.count += bulletInfo.velocity;
                else if (bulletInfo.right)
                    bulletInfo.count -= bulletInfo.velocity;
                //Incrementar contador de grados secundario de la bala
                if (bulletInfo.left)
                    bulletInfo.countPosition += bulletInfo.velocity;
                else if (bulletInfo.right)
                    bulletInfo.countPosition -= bulletInfo.velocity;
                //Mover bala 
                bulletInfo.bullet.position.z = 10 * Math.sin(MathUtils.degToRad(bulletInfo.count));
                bulletInfo.bullet.position.x = 10 * Math.cos(MathUtils.degToRad(bulletInfo.count));
                //Establecer limites de movimiento
                bulletInfo.count = bulletInfo.count >= 360 ? 0 : (bulletInfo.count <= -360 ? 0 : bulletInfo.count);
                bulletInfo.countPosition = bulletInfo.countPosition >= 360 ? 0 : (bulletInfo.countPosition <= -360 ? 0 : bulletInfo.countPosition);

                //Eliminar bala cuando llegue a un limite
                if (bulletInfo.left && bulletInfo.countPosition >= 100) {
                    indexBulletsVillain.push(indexBulletVillain);
                    scene.remove(bulletInfo.bullet);
                    bulletInfo.bullet.geometry.dispose();
                    bulletInfo.bullet.material.dispose();
                    bulletInfo.bullet = null;
                }

                else if (bulletInfo.right && bulletInfo.countPosition <= -100) {
                    indexBulletsVillain.push(indexBulletVillain);
                    scene.remove(bulletInfo.bullet);
                    bulletInfo.bullet.geometry.dispose();
                    bulletInfo.bullet.material.dispose();
                    bulletInfo.bullet = null;
                }
            });

            if (indexBulletsVillain.length === 3) {
                bulletsVillain = [];
                indexBulletsVillain = [];
                dirVillain.shoot = false;
                dirVillain.bullets = false;
                dirVillain.shootRecall = 0;
            }
        }

    }

    return model;
}

export { setupModelHeroe, setupModelVillain };