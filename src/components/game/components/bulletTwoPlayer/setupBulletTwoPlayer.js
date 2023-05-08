import { MathUtils } from "three";
import { villainsArray, bulletHeroeToDelete, villainsToDelete, infoGame, infoVillain, bulletTwoPlayerToDelete, infoHeroe } from "../../helpers/helpers";
import { Box3 } from "three";
import { colisionVillain } from "../event";

function setupBulletTwoPlayer(
    data,
    scene,
    twoPlayerPos,
    twoPlayerCountDegrees,
    twoPlayerLeft,
    twoPlayerRight,
    up,
    down,
    loop
) {
    let bulletTwoPlayer = null;
    if (data.scene === undefined)
        bulletTwoPlayer = data;
    else bulletTwoPlayer = data.scene.children[0]

    let distance = 10;
    let limitBullet = 100;
    let countDegrees = twoPlayerCountDegrees;
    let countDistanceBullet = 0;
    let rotation = 90;
    let scale = 0.003;
    let speedBullet = 1;
    let speedBulletY = 0.0095;
    let countUp = twoPlayerPos.y;
    let countDown = twoPlayerPos.y;
    let indexVillainsToDelete = [];

    bulletTwoPlayer.position.x = twoPlayerPos.x;
    bulletTwoPlayer.position.y = twoPlayerPos.y;
    bulletTwoPlayer.position.z = twoPlayerPos.z;

    bulletTwoPlayer.rotation.z = MathUtils.degToRad(rotation);

    bulletTwoPlayer.scale.set(scale, scale, scale);

    bulletTwoPlayer.tick = (delta) => {
        //////////////////////////////////////////////////////////////////////////////
        //                                MOVE BULLET                               //
        //////////////////////////////////////////////////////////////////////////////
        //INCREMENT COUNT DEGREES
        if (twoPlayerLeft) {
            countDegrees += speedBullet;
            countDistanceBullet += speedBullet;
        }
        else if (twoPlayerRight) {
            countDegrees -= speedBullet;
            countDistanceBullet -= speedBullet;
        }

        //LIMIT BULLET
        if ((twoPlayerLeft && countDistanceBullet >= limitBullet) ||
            (twoPlayerRight && countDistanceBullet <= -limitBullet)) {
            bulletTwoPlayerToDelete.push(bulletTwoPlayer);
            countUp = 0;
            countDown = 0;
        }

        //MOVE BULLET
        bulletTwoPlayer.position.x = distance * Math.cos(MathUtils.degToRad(countDegrees));
        bulletTwoPlayer.position.z = distance * Math.sin(MathUtils.degToRad(countDegrees));

        if (up) {
            countUp += speedBulletY;
            bulletTwoPlayer.position.y = countUp;
        } else if (down) {
            countDown -= speedBulletY;
            bulletTwoPlayer.position.y = countDown;
        }

        //////////////////////////////////////////////////////////////////////////////
        //                          COLISION WITH HEROE                             //
        //////////////////////////////////////////////////////////////////////////////

        let boxBulletTwoPlayer = new Box3().setFromObject(bulletTwoPlayer);
        let boxHeroe = new Box3().setFromObject(infoHeroe.model);

        if (boxHeroe.intersectsBox(boxBulletTwoPlayer)) {

            bulletTwoPlayerToDelete.push(bulletTwoPlayer);

            infoHeroe.lifes--;

            if (infoHeroe.lifes <= 0) {
                scene.remove(infoHeroe.model);
                loop.stop();
            }
        }
    };

    return bulletTwoPlayer;
}

export { setupBulletTwoPlayer };