import { Box3, MathUtils } from "three";
import { infoGame, infoHeroe, infoTwoPlayer } from "../../../helpers/helpers";
import { AudioListener, AudioLoader, Audio } from "three";

function setupShieldItem(data, scene, socket) {
    let distanceModel = 10;
    let degreesPositionModel = 90;
    let positionYModel = 15;
    let countPositionYModel = 0;
    let factorPositionYModel = 0.02;
    let degreesRotationModel = 0;
    let scaleModel = 0.01;

    const shieldItem = data.scene.children[0];

    shieldItem.position.set(
        distanceModel * Math.cos(MathUtils.degToRad(degreesPositionModel)),
        positionYModel,
        distanceModel * Math.sin(MathUtils.degToRad(degreesPositionModel)));

    shieldItem.rotation.z = MathUtils.degToRad(degreesRotationModel);

    shieldItem.scale.set(scaleModel, scaleModel, scaleModel);

    const listener = new AudioListener();

    scene.add(listener);
    const audioLoader = new AudioLoader();
    const audio = new Audio(listener);

    shieldItem.tick = (delta) => {
        //GIRAR BULLET
        degreesRotationModel += 1;
        shieldItem.rotation.z = MathUtils.degToRad(degreesRotationModel);

        if (countPositionYModel <= -positionYModel)
            countPositionYModel = positionYModel;
        else
            countPositionYModel -= factorPositionYModel;

        shieldItem.position.y = countPositionYModel;

        /////////////////////////////////////////////////////////////
        //                   COLISION WITH HEROE                   //
        /////////////////////////////////////////////////////////////
        let boxHeroe = new Box3().setFromObject(infoHeroe.model);
        let boxShieldItem = new Box3().setFromObject(shieldItem);

        if (boxHeroe.intersectsBox(boxShieldItem)) {
            audio.stop();

            audioLoader.load('sounds/item.mp3', (buffer) => {
                audio.setBuffer(buffer);
                audio.setLoop(false);
                audio.setVolume(infoGame.volume);
                audio.play();

            });
            infoHeroe.hasShield = true;
            countPositionYModel = positionYModel;
        }

        if (socket !== null) {
            let boxTwoPlayer = new Box3().setFromObject(infoTwoPlayer.model);
            let boxShieldItem = new Box3().setFromObject(shieldItem);

            if (boxTwoPlayer.intersectsBox(boxShieldItem)) {
                audio.stop();

                audioLoader.load('sounds/item.mp3', (buffer) => {
                    audio.setBuffer(buffer);
                    audio.setLoop(false);
                    audio.setVolume(infoGame.volume);
                    audio.play();

                });

                infoTwoPlayer.hasShield = true;
                countPositionYModel = positionYModel;
            }
        }
    };

    return shieldItem;
}

export { setupShieldItem };