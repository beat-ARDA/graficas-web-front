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
    "hasShield": false,
    "countShiled": 5,
    "lifes": 3,
    "left": false,
    "right": false,
    "viewLeft": false,
    "viewRight": true,
    "down": false,
    "up": false,
};

let heroe;
let level = 3;
let levelCount = 1;
let countVillainsDeleted = 0;
let countDegreesHeroe = 0;

function setupModelHeroe(data, villainModelsArray, scene, dirVillainArray, loop, _countDegreesHeroe, distanceObjects, shieldItem) {
    /*///////////////////////////////////////////////////////////////////////////////////////
    /                                 Declaracion de variables                              /
    /*///////////////////////////////////////////////////////////////////////////////////////

    const model = data.scene.children[0];
    let bullets = [];
    let indexBullets = [];
    let indexVillains = [];
    let timeToCreateItem = 0;
    let itemCreated = false;
    countDegreesHeroe = _countDegreesHeroe;

    for (let l = 1; l < level + 1; l++)
        countVillainsDeleted += (3 * l);

    // const clip = data.animations[0];

    // const mixer = new AnimationMixer(model);
    // const action = mixer.clipAction(clip);
    // action.play();

    model.tick = async (delta) => {
        /*///////////////////////////////////////////////////////////////////////////////////////
        /                                    CREATE ITEMS                                       /
        /*///////////////////////////////////////////////////////////////////////////////////////

        if (!itemCreated)
            timeToCreateItem += 0.08;

        if (timeToCreateItem >= 10) {
            scene.add(shieldItem);
            itemCreated = true;
            timeToCreateItem = 0;
        }

        if (shieldItem.position.y <= -5) {
            scene.remove(shieldItem);
            itemCreated = false;
        }

        //Colision shield
        if (itemCreated) {
            let boxHeroe = new Box3().setFromObject(model);
            let boxShield = new Box3().setFromObject(shieldItem);

            if (boxHeroe.intersectsBox(boxShield)) {
                scene.remove(shieldItem);
                itemCreated = false;
                dirHeroe.hasShield = true;
            }
        }

        heroe = model;
        //mixer.update(delta);
        /*///////////////////////////////////////////////////////////////////////////////////////
        /                                     Movimiento Heroe                                  /
        /*///////////////////////////////////////////////////////////////////////////////////////
        //Aumentar contador de grados
        if (dirHeroe.left)
            countDegreesHeroe += 0.6;
        else if (dirHeroe.right)
            countDegreesHeroe -= 0.6;
        //Subir o bajar nave
        if (dirHeroe.down)
            model.position.y -= 0.1;
        else if (dirHeroe.up)
            model.position.y += 0.1;
        //Rotar la nave
        if (dirHeroe.right)
            model.rotation.y = -distanceObjects * Math.sin(MathUtils.degToRad((180 + countDegreesHeroe) * 0.102));
        else if (dirHeroe.left)
            model.rotation.y = -distanceObjects * Math.sin(MathUtils.degToRad(countDegreesHeroe * 0.108));
        //Mover heroe a la derecha o izquierda
        if (dirHeroe.left || dirHeroe.right) {
            model.position.x = distanceObjects * Math.cos(MathUtils.degToRad(countDegreesHeroe));
            model.position.z = distanceObjects * Math.sin(MathUtils.degToRad(countDegreesHeroe));
        }
        //Restablecer contador de grados al llegar al limite
        if (countDegreesHeroe >= 360)
            countDegreesHeroe = 0;
        else if (countDegreesHeroe <= -360)
            countDegreesHeroe = 0;

        /*///////////////////////////////////////////////////////////////////////////////////////
        /                                      Colisiones                                       /
        /*///////////////////////////////////////////////////////////////////////////////////////

        //Heroe colision con villano
        villainModelsArray.forEach((villain) => {
            let boxHeroe = new Box3().setFromObject(model);
            let boxVillain = new Box3().setFromObject(villain);
            if (boxHeroe.intersectsBox(boxVillain)) {
                indexVillains.push(villainModelsArray.indexOf(villain));
                dirHeroe.lifes -= 1;
                if (dirHeroe.lifes === 0) {
                    scene.remove(model);
                    document.removeEventListener("keydown", onHeroeMove, false);
                    document.removeEventListener("keyup", onHeoreStop, false);
                    loop.updatables = [];
                    loop.stop();
                }
            }
        });

        //Elimina los villanos colisionados
        indexVillains.forEach(index => {
            dirVillainArray[index].exists = false;
            scene.remove(villainModelsArray[index]);
            delete (villainModelsArray[index]);
            countVillainsDeleted--;
            if (countVillainsDeleted === 15 || countVillainsDeleted === 9)
                levelCount++;
        });

        indexVillains = [];

        //Balas heroe con villanos
        bullets.forEach((bulletInfo) => {
            let boxBullet = new Box3().setFromObject(bulletInfo.bullet);
            villainModelsArray.forEach((villain) => {
                let boxVillain = new Box3().setFromObject(villain);
                if (boxBullet.intersectsBox(boxVillain)) {
                    indexBullets.push(bullets.indexOf(bulletInfo));
                    indexVillains.push(villainModelsArray.indexOf(villain));
                }
            });
        });

        //Elimina los villanos colisionados
        indexVillains.forEach(index => {
            dirVillainArray[index].exists = false;
            scene.remove(villainModelsArray[index]);
            delete (villainModelsArray[index]);
            countVillainsDeleted--;
            if (countVillainsDeleted === 15 || countVillainsDeleted === 9)
                levelCount++;
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
                bulletInfo.count = countDegreesHeroe;
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
            bulletInfo.bullet.position.z = distanceObjects * Math.sin(MathUtils.degToRad(bulletInfo.count));
            bulletInfo.bullet.position.x = distanceObjects * Math.cos(MathUtils.degToRad(bulletInfo.count));
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

function setupModelVillain(data, scene, dirVillain, loop, _countDegrees, distanceObjects) {
    /*//////////////////////////////////////////////////////
    /               Definicion de variables                /
    ///////////////////////////////////////////////////////*/
    const model = data.scene.children[0];
    let bulletsVillain = [];
    let indexBulletsVillain = [];
    //let countDegrees = 0;
    let countDegrees = _countDegrees;
    let countUpDown = model.position.y;
    let limiteUp = model.position.y + 2;
    let limiteDown = model.position.y - 2;
    // const clip = data.animations[0];
    // const mixer = new AnimationMixer(model);
    // const action = mixer.clipAction(clip);
    // action.play();

    if (levelCount === 1) {
        if (model.name === 'villain0' || model.name === 'villain1' || model.name === 'villain2')
            dirVillain.runTick = true;
    }

    model.tick = (delta) => {

        //Crear villanos level 2
        if (levelCount === 2 && dirVillain.exists && !dirVillain.created) {
            if (model.name === 'villain3' || model.name === 'villain4' || model.name === 'villain5' ||
                model.name === 'villain6' || model.name === 'villain7' || model.name === 'villain8') {
                dirVillain.runTick = true;
                dirVillain.created = true;

                /**Primera ola de villanos*/
                if (model.name === 'villain3') {
                    //Controla countDegrees
                    let incrementCountDegrees = countDegreesHeroe + 90;

                    if (incrementCountDegrees > 360)
                        countDegrees = incrementCountDegrees - 360;
                    else
                        countDegrees = incrementCountDegrees;

                    model.position.x = distanceObjects * Math.sin(MathUtils.degToRad(countDegrees));
                    model.position.y = -1;
                    model.position.z = distanceObjects * Math.cos(MathUtils.degToRad(countDegrees));
                }
                else if (model.name === 'villain4') {
                    //Controla countDegrees

                    let incrementCountDegrees = countDegreesHeroe + 90;

                    if (incrementCountDegrees > 360)
                        countDegrees = incrementCountDegrees - 360;
                    else
                        countDegrees = incrementCountDegrees;

                    model.position.x = distanceObjects * Math.sin(MathUtils.degToRad(countDegrees));
                    model.position.y = 0;
                    model.position.z = distanceObjects * Math.cos(MathUtils.degToRad(countDegrees));
                }
                else if (model.name === 'villain5') {
                    //Controla countDegrees

                    let incrementCountDegrees = countDegreesHeroe + 90;

                    if (incrementCountDegrees > 360)
                        countDegrees = incrementCountDegrees - 360;
                    else
                        countDegrees = incrementCountDegrees;

                    model.position.x = distanceObjects * Math.sin(MathUtils.degToRad(countDegrees));
                    model.position.y = 1;
                    model.position.z = distanceObjects * Math.cos(MathUtils.degToRad(countDegrees));
                }
                if (model.name === 'villain6') {
                    //Controla countDegrees

                    let decrementCountDegrees = countDegreesHeroe - 90;

                    if (decrementCountDegrees < -360)
                        countDegrees = decrementCountDegrees + 360;
                    else
                        countDegrees = decrementCountDegrees;

                    model.position.x = distanceObjects * Math.sin(MathUtils.degToRad(countDegrees));
                    model.position.y = -1;
                    model.position.z = distanceObjects * Math.cos(MathUtils.degToRad(countDegrees));
                }
                else if (model.name === 'villain7') {
                    //Controla countDegrees

                    let decrementCountDegrees = countDegreesHeroe - 90;

                    if (decrementCountDegrees < -360)
                        countDegrees = decrementCountDegrees + 360;
                    else
                        countDegrees = decrementCountDegrees;

                    model.position.x = distanceObjects * Math.sin(MathUtils.degToRad(countDegrees));
                    model.position.y = 0;
                    model.position.z = distanceObjects * Math.cos(MathUtils.degToRad(countDegrees));
                }
                else if (model.name === 'villain8') {
                    //Controla countDegrees

                    let decrementCountDegrees = countDegreesHeroe - 90;

                    if (decrementCountDegrees < -360)
                        countDegrees = decrementCountDegrees + 360;
                    else
                        countDegrees = decrementCountDegrees;

                    model.position.x = distanceObjects * Math.sin(MathUtils.degToRad(countDegrees));
                    model.position.y = 1;
                    model.position.z = distanceObjects * Math.cos(MathUtils.degToRad(countDegrees));
                }

                scene.add(model);
            }
        }

        if (levelCount === 3 && dirVillain.exists && !dirVillain.created) {
            if (model.name === 'villain9' || model.name === 'villain10' || model.name === 'villain11' ||
                model.name === 'villain12' || model.name === 'villain13' || model.name === 'villain14' ||
                model.name === 'villain15' || model.name === 'villain16' || model.name === 'villain17') {
                dirVillain.runTick = true;
                dirVillain.created = true;

                //PRIMERA OLEADA
                if (model.name === 'villain9' || model.name === 'villain10' || model.name === 'villain11') {
                    let incrementCountDegrees = countDegreesHeroe + 90;

                    if (incrementCountDegrees > 360)
                        countDegrees = incrementCountDegrees - 360;
                    else
                        countDegrees = incrementCountDegrees;

                    model.position.x = distanceObjects * Math.sin(MathUtils.degToRad(countDegrees));
                    model.position.z = distanceObjects * Math.cos(MathUtils.degToRad(countDegrees));

                    if (model.name === 'villain9')
                        model.position.y = -1;
                    else if (model.name === 'villain10')
                        model.position.y = 0;
                    else if (model.name === 'villain11')
                        model.position.y = 1;
                }

                //SEGUNDA OLEADA
                if (model.name === 'villain12' || model.name === 'villain13' || model.name === 'villain14') {
                    let decrementCountDegrees = countDegreesHeroe - 90;

                    if (decrementCountDegrees < -360)
                        countDegrees = decrementCountDegrees + 360;
                    else
                        countDegrees = decrementCountDegrees;

                    model.position.x = distanceObjects * Math.sin(MathUtils.degToRad(countDegrees));
                    model.position.z = distanceObjects * Math.cos(MathUtils.degToRad(countDegrees));

                    if (model.name === 'villain12')
                        model.position.y = -1;
                    else if (model.name === 'villain13')
                        model.position.y = 0;
                    else if (model.name === 'villain14')
                        model.position.y = 1;
                }

                //TERCERA OLEADA
                if (model.name === 'villain15' || model.name === 'villain16' || model.name === 'villain17') {
                    let decrementCountDegrees = countDegreesHeroe - 45;

                    if (decrementCountDegrees < -360)
                        countDegrees = decrementCountDegrees + 360;
                    else
                        countDegrees = decrementCountDegrees;

                    model.position.x = distanceObjects * Math.sin(MathUtils.degToRad(countDegrees));
                    model.position.z = distanceObjects * Math.cos(MathUtils.degToRad(countDegrees));

                    if (model.name === 'villain15')
                        model.position.y = -1;
                    else if (model.name === 'villain16')
                        model.position.y = 0;
                    else if (model.name === 'villain17')
                        model.position.y = 1;
                }

                scene.add(model);
            }
        }
        if (dirVillain.runTick) {
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
            model.position.x = distanceObjects * Math.cos(MathUtils.degToRad(countDegrees));
            model.position.z = distanceObjects * Math.sin(MathUtils.degToRad(countDegrees));
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
                for (let i = 0; i < dirVillain.bulletsInSpaceship; i++)
                    bulletsVillain.push({
                        "left": dirVillain.left,
                        "right": dirVillain.right,
                        "count": 0,
                        "countPosition": 0,
                        "onMovement": true,
                        "velocity": 0.4,
                        "bullet": createBullet(model),
                        "recentCreated": true,
                        "colisionated": false
                    });

                dirVillain.bullets = true;
            }

            //Aumentar el atraso del disparo
            if (dirVillain.exists)
                dirVillain.shootRecall += dirVillain.velocityShootRecall;

            //Si el shoot recall llega al limite dispara
            if (dirVillain.shootRecall >= dirVillain.limitShootRecall)
                dirVillain.shoot = true;

            //Caja colisionadora del heroe
            let boxHeroe = new Box3().setFromObject(heroe);
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
                    bulletInfo.bullet.position.z = distanceObjects * Math.sin(MathUtils.degToRad(bulletInfo.count));
                    bulletInfo.bullet.position.x = distanceObjects * Math.cos(MathUtils.degToRad(bulletInfo.count));
                    //Establecer limites de movimiento
                    bulletInfo.count = bulletInfo.count >= 360 ? 0 : (bulletInfo.count <= -360 ? 0 : bulletInfo.count);
                    bulletInfo.countPosition = bulletInfo.countPosition >= 360 ? 0 : (bulletInfo.countPosition <= -360 ? 0 : bulletInfo.countPosition);

                    /*/////////////////////////////////////////////////////////////////////////////////////////
                    /                               COLISION BALAS VILLANO HEROE                              /
                    /*///////////////////////////////////////////////////////////////////////////////////////*/

                    let boxVillainBullet = new Box3().setFromObject(bulletInfo.bullet);

                    if (boxVillainBullet.intersectsBox(boxHeroe) && !bulletInfo.colisionated) {
                        indexBulletsVillain.push(indexBulletVillain);
                        scene.remove(bulletInfo.bullet);
                        bulletInfo.bullet.geometry.dispose();
                        bulletInfo.bullet.material.dispose();
                        bulletInfo.bullet = null;
                        bulletInfo.colisionated = true;
                        dirHeroe.lifes -= 1;
                        if (dirHeroe.lifes === 0) {
                            //document.removeEventListener("keydown", onHeroeMove, false);
                            //document.removeEventListener("keyup", onHeoreStop, false);
                            loop.updatables = [];
                            loop.stop();
                        }
                    }

                    /*/////////////////////////////////////////////////////////////////////////////////////////
                    /                                     LIMITE DE BALAS                                     /
                    /*///////////////////////////////////////////////////////////////////////////////////////*/

                    //Eliminar bala cuando llegue a un limite
                    if (bulletInfo.left && bulletInfo.countPosition >= 100 && !bulletInfo.colisionated) {
                        indexBulletsVillain.push(indexBulletVillain);
                        scene.remove(bulletInfo.bullet);
                        bulletInfo.bullet.geometry.dispose();
                        bulletInfo.bullet.material.dispose();
                        bulletInfo.bullet = null;
                    }
                    else if (bulletInfo.right && bulletInfo.countPosition <= -100 && !bulletInfo.colisionated) {
                        indexBulletsVillain.push(indexBulletVillain);
                        scene.remove(bulletInfo.bullet);
                        bulletInfo.bullet.geometry.dispose();
                        bulletInfo.bullet.material.dispose();
                        bulletInfo.bullet = null;
                    }
                });

                if (indexBulletsVillain.length === dirVillain.bulletsInSpaceship) {
                    bulletsVillain = [];
                    indexBulletsVillain = [];
                    dirVillain.shoot = false;
                    dirVillain.bullets = false;
                    dirVillain.shootRecall = 0;

                    //loop.updatables.splice(loop.updatables.indexOf(model), 1);
                }
            }

            if (!dirVillain.exists && !dirVillain.shoot)
                dirVillain.runTick = false;
        }

    }

    return model;
}

export { setupModelHeroe, setupModelVillain };