import { MathUtils } from "three";
import { infoBulletVillain } from "../../helpers/helpers";
import { setupBulletVillain } from "../bulletVillain/setupBulletVillain";

function setupVillain(scene, loop, data, _left, _right, _countDegrees, _posY) {
    let villain = null;
    if (data.scene === undefined)
        villain = data;
    else villain = data.scene.children[0]

    let distance = 10;
    let countDegrees = _countDegrees;
    let posY = _posY;
    let scale = 0.09;
    let left = _left;
    let right = _right;
    let speed = 0.2;
    let timeToCreateBullet = 0;
    let limitToCreateBullet = 160;

    //POSICIONAR VILLAIN
    villain.position.x = distance * Math.cos(MathUtils.degToRad(countDegrees));
    villain.position.y = posY;
    villain.position.z = distance * Math.sin(MathUtils.degToRad(countDegrees));

    //SCALE VILLAIN
    villain.scale.set(scale, scale, scale);

    villain.tick = (delta) => {

        ///////////////////////////////////////////////////////////
        //                     CREATE BULLETS                    //
        ///////////////////////////////////////////////////////////

        timeToCreateBullet += 0.5;

        if (timeToCreateBullet >= limitToCreateBullet) {

            const cloneBulletVillain = infoBulletVillain.bullet.scene.children[0].clone();
            const bulletVillain = setupBulletVillain(
                cloneBulletVillain,
                scene,
                villain.position,
                countDegrees,
                left,
                right,
                false,
                false);

            scene.add(bulletVillain);
            loop.updatables.push(bulletVillain);

            timeToCreateBullet = 0;
        }

        ///////////////////////////////////////////////////////////
        //                     MOVE VILLAIN                      //
        ///////////////////////////////////////////////////////////

        if (left) {
            countDegrees += speed;
        } else if (right) {
            countDegrees -= speed;
        }

        villain.position.x = distance * Math.cos(MathUtils.degToRad(countDegrees));
        villain.position.z = distance * Math.sin(MathUtils.degToRad(countDegrees));
    };

    return villain;
}

export { setupVillain };