import React, { useState } from "react";
import "./GameHealthBar.scss";
import { useNavigate } from "react-router-dom";

export const HealthBar = ({ socket, username }) => {
  const [enemyName, setEnemyName] = useState("");
  socket.on("names", (nameData) => {
    if (!nameData) {
      setTimeout(() => {
        socket.emit("getNames");
      }, 1000);
    } else {
      const enemyPlayer = nameData.find((name) => name.id !== socket.id);
      setEnemyName(enemyPlayer.name);
    }
  });

  socket.emit("getNames");
  return (
    <>
      <div className="health__username">{username}</div>
      <div className="health__enemy">{enemyName}</div>
      <div className="health__small-container-div">
        <div className="health__player-health">
          <div className="health__player-health-bg"></div>
          <div
            id="playerHealth"
            className="health__player-health-indicator"
          ></div>
        </div>

        <div id="timer" className="health__timer"></div>

        <div className="health__enemy-health">
          <div className="health__enemy-health-bg"></div>
          <div
            id="enemyHealth"
            className="health__enemy-health-indicator"
          ></div>
        </div>
        <div></div>
      </div>
      <div id="displayText" className="health__text">
        Tie
      </div>
    </>
  );
};
