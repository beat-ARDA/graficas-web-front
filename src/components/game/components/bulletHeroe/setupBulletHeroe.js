import { MathUtils } from "three";
import { villainsArray, bulletHeroeToDelete, villainsToDelete, infoGame, infoVillain, infoTwoPlayer } from "../../helpers/helpers";
import { Box3 } from "three";
import { colisionVillain, lifesTwoPlayer } from "../event";

function setupBulletHeroe(
    data,
    scene,
    heroePos,
    heroeCountDegrees,
    heroeLeft,
    heroeRight,
    up,
    down,
    socket,
    loop
) {
    let bulletHeroe = null;
    if (data.scene === undefined)
        bulletHeroe = data;
    else bulletHeroe = data.scene.children[0]

    let distance = 10;
    let limitBullet = 100;
    let countDegrees = heroeCountDegrees;
    let countDistanceBullet = 0;
    let rotation = 90;
    let scale = 0.003;
    let speedBullet = 1;
    let speedBulletY = 0.0095;
    let countUp = heroePos.y;
    let countDown = heroePos.y;
    let indexVillainsToDelete = [];

    bulletHeroe.position.x = heroePos.x;
    bulletHeroe.position.y = heroePos.y;
    bulletHeroe.position.z = heroePos.z;

    bulletHeroe.rotation.z = MathUtils.degToRad(rotation);

    bulletHeroe.scale.set(scale, scale, scale);

    bulletHeroe.tick = (delta) => {
        //////////////////////////////////////////////////////////////////////////////
        //                                MOVE BULLET                               //
        //////////////////////////////////////////////////////////////////////////////
        //INCREMENT COUNT DEGREES
        if (heroeLeft) {
            countDegrees += speedBullet;
            countDistanceBullet += speedBullet;
        }
        else if (heroeRight) {
            countDegrees -= speedBullet;
            countDistanceBullet -= speedBullet;
        }

        //LIMIT BULLET
        if ((heroeLeft && countDistanceBullet >= limitBullet) ||
            (heroeRight && countDistanceBullet <= -limitBullet)) {
            bulletHeroeToDelete.push(bulletHeroe);
            countUp = 0;
            countDown = 0;
        }

        //MOVE BULLET
        bulletHeroe.position.x = distance * Math.cos(MathUtils.degToRad(countDegrees));
        bulletHeroe.position.z = distance * Math.sin(MathUtils.degToRad(countDegrees));

        if (up) {
            countUp += speedBulletY;
            bulletHeroe.position.y = countUp;
        } else if (down) {
            countDown -= speedBulletY;
            bulletHeroe.position.y = countDown;
        }

        //////////////////////////////////////////////////////////////////////////////
        //                          COLISION WITH VILLAINS                          //
        //////////////////////////////////////////////////////////////////////////////

        if (socket === null) {
            //DETECT COLISION
            villainsArray.forEach((villain, index) => {
                let boxBulletHeroe = new Box3().setFromObject(bulletHeroe);
                let boxVillain = new Box3().setFromObject(villain);

                if (boxVillain.intersectsBox(boxBulletHeroe)) {
                    bulletHeroeToDelete.push(bulletHeroe);
                    villainsToDelete.push(villain);
                    indexVillainsToDelete.push(index);

                    infoGame.villainsDeleted++;
                    infoGame.score += infoVillain.score;
                    colisionVillain();

                    if (infoGame.villainsDeleted === 6) {
                        infoGame.level = 2;
                        infoGame.createdVillains = false;
                    }
                    else if (infoGame.villainsDeleted === 15) {
                        infoGame.level = 3;
                        infoGame.createdVillains = false;
                    }
                }
            });

            indexVillainsToDelete.forEach((index) => {
                villainsArray.splice(index, 1);
            });

            indexVillainsToDelete = [];
        } else {
            let boxBulletHeroe = new Box3().setFromObject(bulletHeroe);
            let boxTwoPlayer = new Box3().setFromObject(infoTwoPlayer.model);

            if (boxTwoPlayer.intersectsBox(boxBulletHeroe)) {
                bulletHeroeToDelete.push(bulletHeroe);

                infoTwoPlayer.lifes--;
                lifesTwoPlayer();

                if (infoTwoPlayer.lifes <= 0) {
                    scene.remove(infoTwoPlayer.model);
                    loop.stop();
                }
            }
        }
    };

    return bulletHeroe;
}

export { setupBulletHeroe };