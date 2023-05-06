import React from 'react';
import { useState } from 'react';
import './configurations.css';
import { useNavigate } from 'react-router-dom';
import { infoGame, infoHeroe } from '../game/helpers/helpers';

export default function Configurations() {

    const [dificultitySelector, setDificultity] = useState('easy');
    const [lifes, setLifes] = useState(infoHeroe.lifes);
    const [volume, setVolume] = useState(infoGame.volume);
    const [scenes, setScenes] = useState(infoGame.scene);

    const navigate = useNavigate();

    return (
        <div className='background-configurations d-flex flex-column justify-content-center align-items-center container-fluid'>
            <div className='row w-50 h-50 font-pixel'>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                    <h5 className='text-white fs-2 p-0 m-0 align-self-end'>Volumen</h5>
                    <div onClick={() => { infoGame.volume = 0.8; setVolume(0.8); }} className={` ${volume === 1 ? 'image-vol5' : 'd-none'}`}></div>
                    <div onClick={() => { infoGame.volume = 0.6; setVolume(0.6); }} className={` ${volume === 0.8 ? 'image-vol4' : 'd-none'}`}></div>
                    <div onClick={() => { infoGame.volume = 0.4; setVolume(0.4); }} className={` ${volume === 0.6 ? 'image-vol3' : 'd-none'}`}></div>
                    <div onClick={() => { infoGame.volume = 0.2; setVolume(0.2); }} className={` ${volume === 0.4 ? 'image-vol2' : 'd-none'}`}></div>
                    <div onClick={() => { infoGame.volume = 0.0; setVolume(0.0); }} className={` ${volume === 0.2 ? 'image-vol1' : 'd-none'}`}></div>
                    <div onClick={() => { infoGame.volume = 1; setVolume(1); }} className={` ${volume === 0.0 ? 'image-vol0' : 'd-none'}`}></div>
                </div>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                    <h5 className='text-white fs-2 p-0 me-4'>Escenario</h5>
                    <button
                        onClick={() => {
                            infoGame.scene = 1;
                            setScenes(1);
                        }}
                        className={`${scenes === 1 ? 'scene-selected' : ''} btn text-white fs-3 w-25`}>1</button>
                    <button
                        onClick={() => {
                            infoGame.scene = 2;
                            setScenes(2);
                        }}
                        className={`${scenes === 2 ? 'scene-selected' : ''} btn text-white fs-3 w-25`}>2</button>
                    <button
                        onClick={() => {
                            infoGame.scene = 3;
                            setScenes(3);
                        }}
                        className={`${scenes === 3 ? 'scene-selected' : ''} btn text-white fs-3 w-25`}>3</button>
                </div>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                    <h5 className='text-white fs-2 p-0 me-4'>Dificultad</h5>
                    <h5
                        onClick={() => { infoGame.dificulty = 'easy'; setDificultity('easy'); }}
                        className={`point text-white pe-2 m-0 ${dificultitySelector == 'easy' ? 'color-yellow' : null}`}>Facil</h5>
                    <h5
                        onClick={() => { infoGame.dificulty = 'medium'; setDificultity('medium') }}
                        className={`point text-white pe-2 m-0 ${dificultitySelector == 'medium' ? 'color-yellow' : null}`}>Media</h5>
                </div>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                    <h5 className='text-white fs-2 p-0 m-0'>Vidas</h5>
                    <div onClick={() => { infoHeroe.lifes = 2; setLifes(2); }} className={` ${lifes === 3 ? 'image-life3' : 'd-none'}`}></div>
                    <div onClick={() => { infoHeroe.lifes = 1; setLifes(1); }} className={` ${lifes === 2 ? 'image-life2' : 'd-none'}`}></div>
                    <div onClick={() => { infoHeroe.lifes = 3; setLifes(3); }} className={` ${lifes === 1 ? 'image-life1' : 'd-none'}`}></div>
                </div>
            </div>
            <div className='row w-100 d-flex justify-content-end'>
                <button
                    onClick={() => navigate('/')}
                    className='btn text-white fs-3 w-100'>Volver</button>
            </div>
        </div>
    );
}