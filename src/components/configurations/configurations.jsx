import React from 'react';
import { useState } from 'react';
import './configurations.css';
import { useNavigate } from 'react-router-dom';

export default function Configurations() {
    const [dificultitySelector, setDificultity] = useState('easy');
    const [lifes, setLifes] = useState(3);
    const [volume, setVolume] = useState(5);

    const navigate = useNavigate();

    return (
        <div className='background-configurations d-flex flex-column justify-content-center align-items-center container-fluid'>
            <div className='row w-50 h-50'>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                    <h5 className='text-white fs-2 p-0 m-0'>Volumen</h5>
                    <div onClick={() => setVolume(5)} className={`image-vol5 ${volume != 4 ? 'd-none' : null}`}></div>
                    <div onClick={() => setVolume(4)} className={`image-vol4 ${volume != 3 ? 'd-none' : null}`}></div>
                    <div onClick={() => setVolume(3)} className={`image-vol3 ${volume != 2 ? 'd-none' : null}`}></div>
                    <div onClick={() => setVolume(2)} className={`image-vol2 ${volume != 1 ? 'd-none' : null}`}></div>
                    <div onClick={() => setVolume(1)} className={`image-vol1 ${volume != 0 ? 'd-none' : null}`}></div>
                    <div onClick={() => setVolume(0)} className={`image-vol0 ${volume != 5 ? 'd-none' : null}`}></div>
                </div>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                    <h5 className='text-white fs-2 pe-2 m-0'>Dificultad</h5>
                    <h5
                        onClick={() => setDificultity('easy')}
                        className={`point text-white pe-2 m-0 ${dificultitySelector == 'easy' ? 'color-yellow' : null}`}>Facil</h5>
                    <h5
                        onClick={() => setDificultity('medium')}
                        className={`point text-white pe-2 m-0 ${dificultitySelector == 'medium' ? 'color-yellow' : null}`}>Media</h5>
                    <h5
                        onClick={() => setDificultity('hard')}
                        className={`point text-white pe-2 m-0 ${dificultitySelector == 'hard' ? 'color-yellow' : null}`}>Dificil</h5>
                </div>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                    <h5 className='text-white fs-2 p-0 m-0'>Vidas</h5>
                    <div onClick={() => setLifes(3)} className={`image-life3 ${lifes != 1 ? 'd-none' : null}`}></div>
                    <div onClick={() => setLifes(2)} className={`image-life2 ${lifes != 3 ? 'd-none' : null}`}></div>
                    <div onClick={() => setLifes(1)} className={`image-life1 ${lifes != 2 ? 'd-none' : null}`}></div>
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