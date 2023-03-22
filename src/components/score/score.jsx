import React from 'react';
import './score.css';
import { useNavigate } from 'react-router-dom';

export default function Score() {
    const navigate = useNavigate();
    return (
        <div className='score-background d-flex flex-column justify-content-center align-items-center container-fluid'>

            <div className='row w-100 h-75 pt-2'>
                <div className='col-2 fs-2 text-white text-center'>Pos</div>
                <div className='col-8 fs-2 text-white text-center'>Nombre del jugador</div>
                <div className='col-2 fs-2 text-white text-center'>Puntuacion</div>

                <div className='col-2 fs-2 text-white text-center'>Pos</div>
                <div className='col-8 fs-2 text-white text-center'>Nombre del jugador</div>
                <div className='col-2 fs-2 text-white text-center'>Puntuacion</div>

                <div className='col-2 fs-2 text-white text-center'>Pos</div>
                <div className='col-8 fs-2 text-white text-center'>Nombre del jugador</div>
                <div className='col-2 fs-2 text-white text-center'>Puntuacion</div>

                <div className='col-2 fs-2 text-white text-center'>Pos</div>
                <div className='col-8 fs-2 text-white text-center'>Nombre del jugador</div>
                <div className='col-2 fs-2 text-white text-center'>Puntuacion</div>

                <div className='col-2 fs-2 text-white text-center'>Pos</div>
                <div className='col-8 fs-2 text-white text-center'>Nombre del jugador</div>
                <div className='col-2 fs-2 text-white text-center'>Puntuacion</div>

                <div className='col-2 fs-2 text-white text-center'>Pos</div>
                <div className='col-8 fs-2 text-white text-center'>Nombre del jugador</div>
                <div className='col-2 fs-2 text-white text-center'>Puntuacion</div>
            </div>
            <div className='row w-100 d-flex justify-content-end'>
                <button
                    onClick={() => navigate('/')}
                    className='btn-gray-background btn text-white fs-3 w-100'>Volver</button>
            </div>
        </div>
    );
}