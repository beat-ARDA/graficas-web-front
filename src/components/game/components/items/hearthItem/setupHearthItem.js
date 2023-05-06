import { Box3, MathUtils } from "three";
import { infoHeroe } from "../../../helpers/helpers";
import { colisionHeroe } from "../../event";
import { AudioListener, AudioLoader, Audio } from "three";
import { infoGame } from "../../../helpers/helpers";

function setupHearthItem(data, scene) {
    let distanceModel = 10;
    let degreesPositionModel = 45;
    let positionYModel = 15;
    let countPositionYModel = 0;
    let factorPositionYModel = 0.02;
    let degreesRotationModel = 0;
    let scaleModel = 0.004;

    const hearthItem = data.scene.children[0];

    hearthItem.position.set(
        distanceModel * Math.cos(MathUtils.degToRad(degreesPositionModel)),
        positionYModel,
        distanceModel * Math.sin(MathUtils.degToRad(degreesPositionModel)));

    hearthItem.rotation.z = MathUtils.degToRad(degreesRotationModel);

    hearthItem.scale.set(scaleModel, scaleModel, scaleModel);

    const listener = new AudioListener();

    scene.add(listener);
    const audioLoader = new AudioLoader();
    const audio = new Audio(listener);

    hearthItem.tick = (delta) => {

        /////////////////////////////////////////////////////////////
        //                      MOVE ITEM HEART                    //
        /////////////////////////////////////////////////////////////
        degreesRotationModel += 1;
        hearthItem.rotation.z = MathUtils.degToRad(degreesRotationModel);

        if (countPositionYModel <= -positionYModel)
            countPositionYModel = positionYModel;
        else
            countPositionYModel -= factorPositionYModel;

        hearthItem.position.y = countPositionYModel;

        /////////////////////////////////////////////////////////////
        //                   COLISION WITH HEROE                   //
        /////////////////////////////////////////////////////////////

        let boxHeroe = new Box3().setFromObject(infoHeroe.model);
        let boxHearthItem = new Box3().setFromObject(hearthItem);

        if (boxHeroe.intersectsBox(boxHearthItem)) {
            audio.stop();

            audioLoader.load('sounds/item.mp3', (buffer) => {
                audio.setBuffer(buffer);
                audio.setLoop(false);
                audio.setVolume(infoGame.volume);
                audio.play();

            });
            infoHeroe.lifes++;
            colisionHeroe();
            countPositionYModel = positionYModel;
        }
    };

    return hearthItem;
}

export { setupHearthItem };