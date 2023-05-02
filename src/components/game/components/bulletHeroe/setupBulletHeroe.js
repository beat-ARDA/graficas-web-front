import { MathUtils } from "three";
import { villainsArray, bulletHeroeToDelete, villainsToDelete, infoGame } from "../../helpers/helpers";
import { Box3 } from "three";

function setupBulletHeroe(
    data,
    scene,
    heroePos,
    heroeCountDegrees,
    heroeLeft,
    heroeRight,
    up,
    down
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

        //DETECT COLISION
        villainsArray.forEach((villain, index) => {
            let boxBulletHeroe = new Box3().setFromObject(bulletHeroe);
            let boxVillain = new Box3().setFromObject(villain);

            if (boxVillain.intersectsBox(boxBulletHeroe)) {
                bulletHeroeToDelete.push(bulletHeroe);
                villainsToDelete.push(villain);
                indexVillainsToDelete.push(index);

                infoGame.villainsDeleted++;

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
    };

    return bulletHeroe;
}

export { setupBulletHeroe };