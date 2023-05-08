import React from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';
import { infoGame, userData } from '../game/helpers/helpers';
import { useState } from 'react';

export default function Menu() {

    const navigate = useNavigate();

    const [nameUser, setNameUser] = useState('');

    return (
        <div className='menu-background d-flex justify-content-center align-items-center container-fluid'>
            <div className='row w-50 h-50'>
                <div className='col-12 d-flex justify-content-center'>
                    <button onClick={() => {
                        if (nameUser === '') {
                            alert('Debes de ingresar un userName primero!');
                        } else {
                            userData.user_name = nameUser;
                            infoGame.mode = 'OnePlayer';
                            navigate('game');
                        }
                    }} className='background-boton-menu btn btn dark text-white fs-2'>One player</button>
                </div>
                <div className='col-12 d-flex justify-content-center'>
                    <button onClick={() => {
                        if (nameUser === '') {
                            alert('Debes de ingresar un userName primero!');
                        } else {
                            infoGame.mode = 'TwoPlayers';
                            navigate('game');
                        }
                    }} className='background-boton-menu btn btn dark text-white fs-2'>TwoPlayers</button>
                </div>
                <div className=' col-12 d-flex justify-content-center'>
                    <button onClick={() => navigate('score')} className='background-boton-menu btn btn dark text-white fs-2'>High scores</button>
                </div>
                <div className='col-12 d-flex justify-content-center '>
                    <button onClick={() => navigate('configurations')} className='background-boton-menu btn btn dark text-white fs-2'>Settings</button>
                </div>
                <div className='col-12 d-flex justify-content-center align-items-center'>
                    <small className='text-white fs-5 me-2'>User name: </small>
                    <input onChange={(e) => { setNameUser(e.target.value); }} type='text' name='nameUser' value={nameUser} />
                </div>
            </div>
        </div>
    );
}