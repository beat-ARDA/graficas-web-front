import { MathUtils } from "three";
import { infoBulletVillain, infoGame, infoVillain } from "../../helpers/helpers";
import { setupBulletVillain } from "../bulletVillain/setupBulletVillain";
import { AnimationMixer } from "three";

function setupVillain(scene, loop, data, _left, _right, _countDegrees, _posY, animations) {
    let villain = null;
    if (data.scene === undefined)
        villain = data;
    else villain = data.scene.children[0];

    let distance = 10;
    let countDegrees = _countDegrees;
    let posY = _posY;
    let countPosY = 0;
    let scale = 0.09;
    let left = _left;
    let right = _right;
    let speed = 0.3;
    let timeToCreateBullet = 0;
    let limitToCreateBullet = 110;
    let up = true;
    let down = false;

    //POSICIONAR VILLAIN
    villain.position.x = distance * Math.cos(MathUtils.degToRad(countDegrees));
    villain.position.y = posY;
    villain.position.z = distance * Math.sin(MathUtils.degToRad(countDegrees));

    //SCALE VILLAIN
    villain.scale.set(scale, scale, scale);
    const mixer = new AnimationMixer(villain);
    if (animations !== null) {
        const clip = animations;
        const action = mixer.clipAction(clip);
        action.play();
    }

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
            if (animations !== null)
                mixer.update(delta);
        } else if (right) {
            countDegrees -= speed;
            if (animations !== null)
                mixer.update(delta);
        }

        if (infoGame.dificulty === 'medium') {
            if (up) {
                countPosY += 0.05;
                posY += 0.05;
                villain.position.y = posY;
            }
            else if (down) {
                countPosY -= 0.05;
                posY -= 0.05;
                villain.position.y = posY;
            }

            if (countPosY >= 2.5) {
                down = true;
                up = false;
            } else if (countPosY <= -2.5) {
                down = false;
                up = true;
            }
        }

        if (right)
            villain.rotation.y = -distance * Math.sin(MathUtils.degToRad((180 + countDegrees) * 0.102));
        else if (left)
            villain.rotation.y = -distance * Math.sin(MathUtils.degToRad(countDegrees * 0.108));

        villain.position.x = distance * Math.cos(MathUtils.degToRad(countDegrees));
        villain.position.z = distance * Math.sin(MathUtils.degToRad(countDegrees));
    };

    return villain;
}

export { setupVillain };