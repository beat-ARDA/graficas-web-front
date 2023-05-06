import { React, useEffect, useState } from "react";
import './game.css';
import { World } from './world/world.js';
import { colisionDispatcher } from "./components/event";
import { infoGame, infoHeroe, keyboards } from "./helpers/helpers";
import { useNavigate } from "react-router-dom";

async function main() {
    const container = document.querySelector('#scene-container');
    const world = new World(container);
    await world.init();
    world.start();
    return world;
}

export default function Game() {

    const [lifes, setLifes] = useState(infoHeroe.lifes);
    const [score, setScore] = useState(infoGame.score);
    const [modal, setModal] = useState(false);
    const [loopWorld, setLoopWorld] = useState();
    const navigate = useNavigate();

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