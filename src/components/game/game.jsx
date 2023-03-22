import { React, useEffect } from "react";
import './game.css';
import { World } from './world/world.js';

async function main() {
    const container = document.querySelector('#scene-container');
    const world = new World(container);
    await world.init();

    world.start();
}

export default function Game() {

    useEffect(() => {
        main().catch((err) => {
            console.error(err);
        });
    }, []);

    return (
        <>
            <div className="game-background" id='scene-container'></div>
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