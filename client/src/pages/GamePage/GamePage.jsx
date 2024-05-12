import "./GamePage.scss";
import React, { useState, useEffect, useRef } from "react";
import { GameCanvas } from "../../Components/GameCanvas/GameCanvas";
import io from "socket.io-client";
import { WEBSOCKET } from "../../utils/utils";

export const GamePage = ({ isLoggedIn, username }) => {
  const [socket, setSocket] = useState(null);
  const [isOnGamePage, setIsOnGamePage] = useState(false);

  const backgroundData = {};

  useEffect(() => {
    setIsOnGamePage(true); // Set true when component mounts
    return () => setIsOnGamePage(false); // Set false when component unmounts
  }, []);

  useEffect(() => {
    if (isLoggedIn && isOnGamePage) {
      // Create a new socket connection if the user is logged in and on the GamePage
      const newSocket = io(WEBSOCKET);
      newSocket.on("connect", () => {
        newSocket.emit("checkBackground");
        console.log("Connected to websocket");
      });

      newSocket.on("backgroundStatus", (status) =>
        setUpBackground(status, newSocket),
      );

      setSocket(newSocket);
      newSocket.emit("startConnection");

      // Clean up the socket connection when the component unmounts or the user logs out
      return () => {
        newSocket.off("connect");
        newSocket.off("backgroundStatus");
        newSocket.off("backgroundData");
        newSocket.close();
      };
    } else {
      setSocket(null);
    }
  }, [isLoggedIn, isOnGamePage]); // This effect runs when isLoggedIn or isOnGamePage changes

  const setUpBackground = (status, socket) => {
    if (status) {
      requestBackgroundData("chosen", socket);
    } else {
      console.log("Sending request for background");
      requestBackgroundData("1", socket);
    }
  };

  const requestBackgroundData = (backgroundId, socket) => {
    socket.on("backgroundData", (serverBackgroundData) => {
      Object.assign(backgroundData, serverBackgroundData);
    });
    socket.emit("getBackground", backgroundId);
  };

  if (!isLoggedIn) {
    return (
      <div className="home__login">You must login to see the content!</div>
    );
  }
  return (
    <>
      {socket && (
        <GameCanvas
          socket={socket}
          backgroundData={backgroundData}
          username={username}
        />
      )}
    </>
  );
};
