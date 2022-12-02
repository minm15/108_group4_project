import React from "react";
import { calculate_time } from '../time';

const GameTimer = () => {
    const [gameTime, setGameTime] = React.useState(calculate_time().game_day);
    const time_change = () => {
        setGameTime(calculate_time().game_day);
    }
    setInterval(time_change, 10000);
    return (
        <div className="game-time">
            {gameTime}
        </div>
    )
}

export default GameTimer;