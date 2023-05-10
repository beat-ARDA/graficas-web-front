import { EventDispatcher } from "three";
import { infoGame, infoHeroe, infoTwoPlayer } from "../helpers/helpers";

const colisionDispatcher = new EventDispatcher();

function colisionHeroe() {
    colisionDispatcher.dispatchEvent({ type: 'colisionHeroe', data: infoHeroe.lifes });
}

function lifesTwoPlayer() {
    colisionDispatcher.dispatchEvent({ type: 'lifesTwoPlayer', data: infoTwoPlayer.lifes });
}

function colisionVillain() {
    colisionDispatcher.dispatchEvent({ type: 'colisionVillain', data: infoGame.score });
}

function winner() {
    colisionDispatcher.dispatchEvent({ type: 'winner', data: infoGame.winner });
}

export { colisionDispatcher, colisionHeroe, colisionVillain, lifesTwoPlayer, winner }