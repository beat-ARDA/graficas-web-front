import { Routes, Route } from 'react-router-dom';
import Configurations from './components/configurations/configurations.jsx';
import Game from './components/game/game.jsx';
import Menu from './components/menu/menu.jsx';
import Score from './components/score/score.jsx';

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Menu />} />
            <Route path='/score' element={<Score />} />
            <Route path='/configurations' element={<Configurations />} />
            <Route path='/game' element={<Game />} />
        </Routes>
    );
}