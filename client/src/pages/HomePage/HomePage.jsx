import './HomePage.scss'
import React from 'react';
import {GameCanvas} from '../../Components/GameCanvas/GameCanvas';
import {HealthBar} from '../../Components/GameHealthBar/GameHealthBar';
import io from 'socket.io-client';
const socket = io('ws://localhost:5050');

export const HomePage = () => {
    return (
        <>
            <HealthBar/>
            <GameCanvas socket={socket} />
        </>
    );
}