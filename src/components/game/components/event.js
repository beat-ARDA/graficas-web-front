import { EventDispatcher } from "three";
import { infoGame, infoHeroe } from "../helpers/helpers";

const colisionDispatcher = new EventDispatcher();

function colisionHeroe() {
    colisionDispatcher.dispatchEvent({ type: 'colisionHeroe', data: infoHeroe.lifes });
}

function colisionVillain() {
    colisionDispatcher.dispatchEvent({ type: 'colisionVillain', data: infoGame.score });
}

export { colisionDispatcher, colisionHeroe, colisionVillain }