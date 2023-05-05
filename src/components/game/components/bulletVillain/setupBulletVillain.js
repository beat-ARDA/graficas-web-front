import { Box3, MathUtils } from "three";
import { infoHeroe, bulletVillainToDelete } from "../../helpers/helpers";
import { colisionHeroe } from "../event";

function setupBulletVillain(
    data,
    scene,
    villainPos,
    villainCountDegrees,
    villainLeft,
    villainRight
) {
    let bulletVillain = null;
    if (data.scene === undefined)
        bulletVillain = data;
    else bulletVillain = data.scene.children[0]

    let distance = 10;
    let limitBullet = 100;
    let countDegrees = villainCountDegrees;
    let countDistanceBullet = 0;
    let rotation = 90;
    let scale = 0.06;
    let speedBullet = 0.4;

    bulletVillain.position.x = villainPos.x;
    bulletVillain.position.y = villainPos.y;
    bulletVillain.position.z = villainPos.z;

    bulletVillain.rotation.z = MathUtils.degToRad(rotation);

    bulletVillain.scale.set(scale, scale, scale);

    bulletVillain.tick = (delta) => {
        //////////////////////////////////////////////////////////////////////////////
        //                                MOVE BULLET                               //
        //////////////////////////////////////////////////////////////////////////////
        //INCREMENT COUNT DEGREES
        if (villainLeft) {
            countDegrees += speedBullet;
            countDistanceBullet += speedBullet;
        }
        else if (villainRight) {
            countDegrees -= speedBullet;
            countDistanceBullet -= speedBullet;
        }

        //LIMIT BULLET
        if ((villainLeft && countDistanceBullet >= limitBullet) ||
            (villainRight && countDistanceBullet <= -limitBullet)) {
            bulletVillainToDelete.push(bulletVillain);
        }

        //MOVE BULLET
        bulletVillain.position.x = distance * Math.cos(MathUtils.degToRad(countDegrees));
        bulletVillain.position.z = distance * Math.sin(MathUtils.degToRad(countDegrees));

        //////////////////////////////////////////////////////////////////////////////
        //                     COLISION BULLET WITH HEROE                           //
        //////////////////////////////////////////////////////////////////////////////

        let boxHeroe = new Box3().setFromObject(infoHeroe.model);
        let boxBulletVillain = new Box3().setFromObject(bulletVillain);

        if (boxBulletVillain.intersectsBox(boxHeroe)) {
            if (!infoHeroe.hasShield) {
                infoHeroe.lifes--;
                colisionHeroe();
            }
            bulletVillainToDelete.push(bulletVillain);
        }
    };

    return bulletVillain;
}

export { setupBulletVillain };