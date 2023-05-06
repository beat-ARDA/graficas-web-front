import { React, useEffect, useState } from "react";
import './game.css';
import { World } from './world/world.js';
import { colisionDispatcher } from "./components/event";
import { infoGame, infoHeroe } from "./helpers/helpers";

async function main() {
    const container = document.querySelector('#scene-container');
    const world = new World(container);
    await world.init();

    world.start();
}

export default function Game() {

    const [lifes, setLifes] = useState(infoHeroe.lifes);
    const [score, setScore] = useState(infoGame.score);

    useEffect(() => {
        main().then(() => {

        }).catch((err) => {
            console.error(err);
        });

        colisionDispatcher.addEventListener('colisionHeroe', function (event) {
            setLifes(event.data);
        });

        colisionDispatcher.addEventListener('colisionVillain', function (event) {
            setScore(event.data);
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
                <h5 class="score-scene gui-text">Score: {score}</h5>
            </div>
            <div id="myModal" class="modal" tabindex="-1">
                <div class="modal-dialog bs-dark">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="w-100 modal-title text-center">Pausa</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body d-flex flex-column">
                            <button type="button" class="btn btn-secondary mt-2" data-bs-dismiss="modal">Reaunudar</button>
                            <button type="button" class="btn btn-primary mt-2 " data-bs-dismiss="modal">Salir</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}