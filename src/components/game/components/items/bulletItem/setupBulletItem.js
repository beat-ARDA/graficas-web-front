import { Box3, MathUtils } from "three";
import { infoGame, infoHeroe } from "../../../helpers/helpers";
import { AudioListener, AudioLoader, Audio } from "three";

function setupBulletItem(data, scene) {
    let distanceModel = 10;
    let degreesPositionModel = 180;
    let positionYModel = 15;
    let countPositionYModel = 0;
    let factorPositionYModel = 0.02;
    let degreesRotationModel = 0;
    let scaleModel = 0.1;

    const bulletItem = data.scene.children[0];

    bulletItem.position.set(
        distanceModel * Math.cos(MathUtils.degToRad(degreesPositionModel)),
        positionYModel,
        distanceModel * Math.sin(MathUtils.degToRad(degreesPositionModel)));

    bulletItem.rotation.z = MathUtils.degToRad(degreesRotationModel);

    bulletItem.scale.set(scaleModel, scaleModel, scaleModel);

    const listener = new AudioListener();

    scene.add(listener);
    const audioLoader = new AudioLoader();
    const audio = new Audio(listener);

    bulletItem.tick = (delta) => {
        //GIRAR BULLET
        degreesRotationModel += 1;
        bulletItem.rotation.z = MathUtils.degToRad(degreesRotationModel);

        if (countPositionYModel <= -positionYModel)
            countPositionYModel = positionYModel;
        else
            countPositionYModel -= factorPositionYModel;

        bulletItem.position.y = countPositionYModel;

        /////////////////////////////////////////////////////////////
        //                   COLISION WITH HEROE                   //
        /////////////////////////////////////////////////////////////
        let boxHeroe = new Box3().setFromObject(infoHeroe.model);
        let boxBulletItem = new Box3().setFromObject(bulletItem);

        if (boxHeroe.intersectsBox(boxBulletItem)) {
            audio.stop();
            audioLoader.load('sounds/item.mp3', (buffer) => {
                audio.setBuffer(buffer);
                audio.setLoop(false);
                audio.setVolume(infoGame.volume);
                audio.play();

            });
            infoHeroe.hasBullet = true;
            countPositionYModel = positionYModel;
        }
    };

    return bulletItem;
}

export { setupBulletItem };