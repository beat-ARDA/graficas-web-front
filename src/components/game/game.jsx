import { React, useEffect, useState } from "react";
import './game.css';
import { World } from './world/world.js';
import { colisionDispatcher } from "./components/event";
import { infoGame, infoHeroe, infoTwoPlayer, keyboards } from "./helpers/helpers";

async function main() {
    const container = document.querySelector('#scene-container');
    const world = new World(container);
    await world.init();
    world.start();
    return world;
}

export default function Game() {
    const [lifes, setLifes] = useState(infoHeroe.lifes);
    const [lifesTwoPlayer, setLifesTwoPlayer] = useState(infoTwoPlayer.lifes);
    const [score, setScore] = useState(infoGame.score);
    const [modal, setModal] = useState(false);
    const [loopWorld, setLoopWorld] = useState();

    useEffect(() => {
        main().then((world) => {
            document.addEventListener("keydown", async function pause(event) {
                var keyCode = event.which;
                if (keyCode === keyboards.esc) {
                    world.stop();
                    setModal(true);
                }
            }, false);
            setLoopWorld(world);
        }).catch((err) => {
            console.error(err);
        });

        colisionDispatcher.addEventListener('colisionHeroe', function (event) {
            setLifes(event.data);
        });

        colisionDispatcher.addEventListener('colisionVillain', function (event) {
            setScore(event.data);
        });

        colisionDispatcher.addEventListener('lifesTwoPlayer', function (event) {
            setLifesTwoPlayer(event.data);
        });

    }, []);

    return (
        <>
            <div className="game-background" id='scene-container'>
                <h5 class="life-scene gui-text">Lifes: </h5>
                <img className={`${lifes >= 3 ? 'img-lifes img-pos' : 'img-none'}`} src="images/0v.png" />
                <img className={`${lifes === 2 ? 'img-lifes img-pos' : 'img-none'}`} src="images/1v.png" />
                <img className={`${lifes === 1 ? 'img-lifes img-pos' : 'img-none'}`} src="images/2v.png" />
                <img className={`${lifes === 0 ? 'img-lifes img-pos' : 'img-none'}`} src="images/3v.png" />
                <small className={`${lifes > 3 ? 'extra-life-scene gui-text' : 'img-none'}`}>+ {lifes - 3} extra</small>

                <div className={`${infoGame.mode === 'TwoPlayers' ? '' : 'd-none'}`}>
                    <h5 class="life-two-player gui-text">Lifes player 2: </h5>
                    <img className={`${lifesTwoPlayer >= 3 ? 'img-lifes  img-pos-two-player' : 'img-none'}`} src="images/0v.png" />
                    <img className={`${lifesTwoPlayer === 2 ? 'img-lifes img-pos-two-player' : 'img-none'}`} src="images/1v.png" />
                    <img className={`${lifesTwoPlayer === 1 ? 'img-lifes img-pos-two-player' : 'img-none'}`} src="images/2v.png" />
                    <img className={`${lifesTwoPlayer === 0 ? 'img-lifes img-pos-two-player' : 'img-none'}`} src="images/3v.png" />
                    <small className={`${lifesTwoPlayer > 3 ? 'extra-life-scene-two-player gui-text' : 'img-none'}`}>+ {lifesTwoPlayer - 3} extra</small>
                </div>

                <h5 class={`score-scene gui-text ${infoGame.mode === 'OnePlayer' ? '' : 'd-none'}`}>Score: {score}</h5>
            </div>

            <div id="myModal" className={`${modal ? 'modal show-modal' : 'modal hide-modal'}`} tabindex="-1">
                <div className="modal-dialog bs-dark">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="w-100 modal-title text-center">Pausa</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex flex-column">
                            <button onClick={() => { loopWorld.start(); setModal(false); }} type="button" className="btn btn-secondary mt-2" data-bs-dismiss="modal">Reaunudar</button>
                            <button onClick={() => { setModal(false); window.location.href = '/' }} type="button" className="btn btn-primary mt-2 " data-bs-dismiss="modal">Salir</button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}