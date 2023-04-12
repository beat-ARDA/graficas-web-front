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
    //Obtener el modelo
    const model = data.scene.children[0];
    //Define la variable i, esta varivale sirve para mover algunos objetos en el la escena
    let i = 0;
    let y = 0;

    //Este es el bucle del modelo se añaade en el archivo world
    model.tick = (delta) => {
        //Se verifica que no tenga balas el villano y que el arreglo de las balas este vacio
        if (!dirVillain.bullets && bulletsVillain.length <= 0) {
            //Variable de ayuda para dar direccion a las tres balas del villano
            const directions = [{ "up": true, "down": false, "rect": false }, { "up": false, "down": true, "rect": false }, { "up": false, "down": false, "rect": true }];
            //bucle de tres para asignar las balas al arreglo de las balas del villano
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
            //Se cambia a verdadero para indicar que las balas estan cargadas en el villano
            dirVillain.bullets = true;
        }

        //Saber si no a sido disparado el arreglo
        const bulletVillainFilter = bulletsVillain.filter((bulletInfo) => bulletInfo.recentCreated === true);
        //Codigo para evitar que dispare cuando desaparezca
        if (bulletVillainFilter.length === 3 && !model.visible) {
            dirVillain.shoot = false;
            dirVillain.shootRecall = 0;
            dirVillain.bullet = false;
            bulletsVillain = [];
        }

        //Incrementa o decrementa la variable i dependiendo si el villano va a la derecha o a la izquerda
        i = dirVillain.left ? i + 0.2 : (
            dirVillain.right ? i - 0.2 : i);

        if (dirVillain.up)
            y += 0.01;
        else if (dirVillain.down)
            y -= 0.01;

        if (y >= 2) {
            dirVillain.up = false;
            dirVillain.down = true;
        } else if (y <= -2) {
            dirVillain.up = true;
            dirVillain.down = false;
        }

        //Mueve el viallano siempre y cuando la nave del villano va a la izquierda o derecha
        model.position.x = dirVillain.left || dirVillain.right ? 10 * Math.cos(MathUtils.degToRad(i)) : model.position.x;
        model.position.z = dirVillain.left || dirVillain.right ? 10 * Math.sin(MathUtils.degToRad(i)) : model.position.z;

        //Aumentar la y de la nave del villano
        model.position.y = y;

        //Obtiene la distancia entre el heroe y el villano
        let distancia = model.position.distanceTo(heroe.position);

        //Si la distancia esta en el area del heroe y el villano no a disparado, disparar...
        dirVillain.shoot = distancia <= 5 && !dirVillain.shoot && model.visible ? true : dirVillain.shoot;

        //Si el villano a disparado, incrementar el retraso del siguiente disparo de la nave enemiga
        dirVillain.shootRecall += dirVillain.shoot ? 0.01 : 0.0;

        //Si el villano a disparado y el retradso de la bala esta completado...
        if (dirVillain.shoot && dirVillain.shootRecall >= 1)
            //Recorre las balas del enemigo
            bulletsVillain.map((bulletInfo) => {
                //Si la bala esta recien creada
                if (bulletInfo.recentCreated) {
                    /*
                    igualamos el contador de la posicion de la bala al contador de posicion de la nave,
                    ponemos la bandera recien creada en falso para que ya no entre a este if,
                    establecemos la variable de la bala que se esta moviendo,
                    añadimos la bala a la escena...
                    */
                    bulletInfo.count = i;
                    bulletInfo.recentCreated = false;
                    bulletInfo.onMovement = true;
                    bulletInfo.bullet.position.y = model.position.y;
                    scene.add(bulletInfo.bullet);
                }

                //Valida si la bala esta en movimiento
                if (bulletInfo.onMovement) {
                    //Mueve la bala
                    bulletInfo.bullet.position.z = 10 * Math.sin(MathUtils.degToRad(bulletInfo.count));
                    bulletInfo.bullet.position.x = 10 * Math.cos(MathUtils.degToRad(bulletInfo.count));
                    //Si la bala se mueve hacia arriba
                    if (bulletInfo.up)
                        bulletInfo.bullet.position.y += 0.01;
                    //Si la bala se mueve hacia bajo
                    else if (bulletInfo.down)
                        bulletInfo.bullet.position.y -= 0.01;

                    //Incrementa o decrementa el cotnador de posicion de la bala si va a la derecha o a lzquierda
                    bulletInfo.count = bulletInfo.left ? bulletInfo.count + 0.3 : (bulletInfo.right ? bulletInfo.count - 0.3 : bulletInfo.count);
                    //Aumentar contador de grados de la bala
                    bulletInfo.countPosition = bulletInfo.left ? bulletInfo.countPosition + 0.3 : (bulletInfo.right ? bulletInfo.countPosition - 0.3 : bulletInfo.countPosition);

                    /*
                    Eliminar bala cuando llegue a un limite,
                    establece la variable de movimiento de la bala en falso,
                    remueve de la escena la bala,
                    libera la geometria y material del modelo,
                    establece la bala en null
                    */
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

                    //Define el limite de grados de la bala en los dos contadores
                    bulletInfo.count = bulletInfo.count >= 360 ? 0 : (bulletInfo.count <= -360 ? 0 : bulletInfo.count);
                    bulletInfo.countPosition = bulletInfo.countPosition >= 360 ? 0 : (bulletInfo.countPosition <= -360 ? 0 : bulletInfo.countPosition);
                }
            });

        if (model.visible) {
            //Obtiene las balas que estan actualmente en la escena del heroe
            bullets = bullets.filter((bulletInfo) => bulletInfo.bullet !== null);
            //Recorre el arreglo de las balas
            bullets.map((bulletInfo) => {
                //Si la bala del heroe esta en movimiento
                if (bulletInfo.onMovement) {
                    //Crea un box alrededor de la bala del heroe y del villano
                    let boxBullet = new Box3().setFromObject(bulletInfo.bullet);
                    let boxVillain = new Box3().setFromObject(model);

                    //Si las cajas colisionan 
                    if (boxBullet.intersectsBox(boxVillain)) {
                        bulletInfo.onMovement = false;
                        scene.remove(bulletInfo.bullet);
                        bulletInfo.bullet.geometry.dispose();
                        bulletInfo.bullet.material.dispose();
                        bulletInfo.bullet = null;
                        model.visible = false;
                    }
                    //Establece las cajas en null
                    boxBullet = null;
                    boxVillain = null;
                }
            });
        }

        /*
        Si no tiene balas la ristra del villano, 
        establece la variable de balas en falso, 
        establece el disparo del villano en falso, 
        establece el arreglo de las balas en vacio
        y establece el contador del shoot recall en 0
       */
        const bulletsFIlter = bulletsVillain.filter((bulletInfo) => bulletInfo.bullet !== null);

        if (bulletsFIlter.length <= 0) {
            scene.remove(!model.visible ? model : null);
            dirVillain.bullets = false;
            dirVillain.shoot = false;
            bulletsVillain = [];
            dirVillain.shootRecall = 0;
        }

        //Controla los grados del contador de movimiento del villano
        i = i >= 360 ? 0 : (i <= -360 ? 0 : i);
    }

    return model;
}

export { setupModelHeroe, setupModelVillain };