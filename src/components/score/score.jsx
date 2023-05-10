import React, { useEffect, useState } from 'react';
import './score.css';
import { useNavigate } from 'react-router-dom';
import { getScoreOnePlayer, getScoreTwoPlayer } from '../../services/services';

export default function Score() {

    const navigate = useNavigate();
    const [scoresOnePlayer, setScoresOnePlayer] = useState();
    const [scoresTwoPlayer, setScoresTwoPlayer] = useState();
    const [showOnePlayer, setShowOnePlayer] = useState(true);

    useEffect(() => {
        if (showOnePlayer)
            getScoreOnePlayer().then((data) => {
                setScoresOnePlayer(data.data);
            });
    }, []);

    if (scoresOnePlayer || scoresTwoPlayer) {
        return (
            <div className='score-background d-flex flex-column justify-content-center align-items-center container-fluid'>
                <label for="scores">Selecciona el score:</label>
                <select id="scores" name="scores" onChange={(e) => {
                    if (e.target.value === 'one_player') {
                        setShowOnePlayer(true)
                    }
                    else {
                        getScoreTwoPlayer().then((data) => {

                            setScoresTwoPlayer(data.data);
                            setShowOnePlayer(false)
                        });
                    }

                }}>
                    <option value="one_player">Un jugador</option>
                    <option value="two_player">Multijugador</option>
                </select>

                {/* ONE PLAYER SCORES */}
                <div className={`row w-100 d-flex justify-content-center table-responsive h-50`}>
                    <table className="table text-white fw-bold text-center w-75">
                        <thead>
                            {
                                showOnePlayer ?
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre jugador</th>
                                        <th>Score</th>
                                    </tr> :
                                    <tr>
                                        <th>#</th>
                                        <th>Jugador1: </th>
                                        <th>Jugador2: </th>
                                        <th>Ganador: </th>
                                    </tr>
                            }
                        </thead>
                        <tbody>
                            {
                                showOnePlayer ?
                                    scoresOnePlayer.map((scoreData, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index}</td>
                                                <td>{scoreData.user_name}</td>
                                                <td>{scoreData.score}</td>
                                            </tr>
                                        );
                                    }) : scoresTwoPlayer.map((scoreData, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index}</td>
                                                <td>{scoreData.user_name_one}</td>
                                                <td>{scoreData.user_name_two}</td>
                                                <td>{scoreData.winer === 1 ? scoreData.user_name_one : scoreData.user_name_two}</td>
                                            </tr>
                                        );
                                    })
                            }
                        </tbody>
                    </table>
                </div>
                {/* <div className={`${!showOnePlayer ? 'row w-100 d-flex justify-content-center table-responsive h-50' : 'd-none'}`}>
                    <table className="table text-white fw-bold text-center w-75">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Jugador 1: </th>
                                <th>Jugador 2: </th>
                                <th>Ganador: </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                scoresOnePlayer.map((scoreData, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{scoreData.user_name}</td>
                                            <td>{scoreData.score}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div> */}
                <div className='row w-100 d-flex justify-content-end'>
                    <button
                        onClick={() => navigate('/')}
                        className='btn-gray-background btn text-white fs-3 w-100'>Volver</button>
                </div>
            </div>
        );
    }
}