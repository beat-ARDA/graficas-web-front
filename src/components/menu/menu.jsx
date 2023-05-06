import React from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';

export default function Menu() {

    const navigate = useNavigate();

    return (
        <div className='menu-background d-flex justify-content-center align-items-center container-fluid'>
            <div className='row w-50 h-50'>
                <div className='col-12 d-flex justify-content-center'>
                    <button onClick={() => navigate('game')} className='background-boton-menu btn btn dark text-white fs-2'>One player</button>
                </div>
                <div className='col-12 d-flex justify-content-center'>
                    <button onClick={() => navigate('')} className='background-boton-menu btn btn dark text-white fs-2'>TwoPlayers</button>
                </div>
                <div className=' col-12 d-flex justify-content-center'>
                    <button onClick={() => navigate('score')} className='background-boton-menu btn btn dark text-white fs-2'>High scores</button>
                </div>
                <div className='col-12 d-flex justify-content-center '>
                    <button onClick={() => navigate('configurations')} className='background-boton-menu btn btn dark text-white fs-2'>Settings</button>
                </div>
            </div>
        </div>
    );
}