import React from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';
import { infoGame, userData, infoHeroe, infoCamera, infoTwoPlayer } from '../game/helpers/helpers';
import { useState } from 'react';
import socketIO from 'socket.io-client';

export default function Menu() {

    const navigate = useNavigate();

    const [nameUser, setNameUser] = useState('');
    const [waitin, setWating] = useState(false);

    function connectSocket() {
        infoGame.socket = socketIO.connect(process.env.REACT_APP_PATH_SOCKET_API);

        infoGame.socket.on('socketId', (socketId) => {

            localStorage.setItem('socketId', socketId.socketId);

            if (socketId.posUser === 1) {
                infoHeroe.pos = 1;
                infoHeroe.countDegrees = 120;
                infoCamera.countDegrees = 120;
                infoTwoPlayer.countDegrees = 300;
            } else if (socketId.posUser === 2) {
                infoHeroe.pos = 2;
                infoHeroe.countDegrees = 300;
                infoCamera.countDegrees = 300;
                infoTwoPlayer.countDegrees = 120;
            }

            infoGame.socket.removeListener('socketId');
        });

        infoGame.socket.on('sessionReady', () => {
            infoGame.socket.emit('newUser', { "nameUser": nameUser, "socketId": localStorage.getItem('socketId') });
            infoGame.mode = 'TwoPlayers';
            navigate('game');
        });

        infoGame.socket.on('newUser', (infoUser) => {
            console.log('JALA');
            if (infoUser.socketId !== localStorage.getItem('socketId'))
                infoTwoPlayer.nameUser = infoUser.nameUser;
        });
    }

    return (
        <div className='menu-background'>
            <div className={`${waitin ? 'd-none' : 'd-flex justify-content-center align-items-center container-fluid w-100 h-100'}`}>
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
                            if (nameUser === '')
                                alert('Debes de ingresar un userName primero!');
                            else {
                                userData.user_name = nameUser;
                                connectSocket();
                                setWating(true);
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
            <div className={`${!waitin ? 'd-none' : 'd-flex justify-content-center align-items-center container-fluid w-100 h-100'}`}>
                <h1 className='dark text-white fs-2'>Esperando al segundo jugador...</h1>
            </div>
        </div>
    );
}