import React from 'react';
import "./GameHealthBar.scss"

export const HealthBar = () => {
    return (
        <>
            <div
            className="health__small-container-div"
        >
            <div
                className="health__player-health"
            >
                <div className="health__player-health-bg"></div>
                <div
                    id="playerHealth"
                    className="health__player-health-indicator"
                ></div>
            </div>

            <div
                id="timer"
                className="health__timer"
            >

            </div>

            <div
                className="health__enemy-health"
            >
                <div className="health__enemy-health-bg"></div>
                <div
                    id="enemyHealth"
                    className="health__enemy-health-indicator"
                ></div>
            </div>
            <div></div>
        </div>
        <div
            id="displayText"
            className="health__text"
        >
            Tie
        </div>
        </>
    );
};
