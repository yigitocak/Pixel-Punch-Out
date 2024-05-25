import "./GamePage.scss";
import React, { useState, useEffect } from "react";
import { GameCanvas } from "../../Components/GameCanvas/GameCanvas";
import io from "socket.io-client";
import { WEBSOCKET } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

export const GamePage = ({
  isLoggedIn,
  username,
  backgroundId,
  setShowSnackbar,
  setFlashSuccess,
  setFlashMessage,
}) => {
  const [socket, setSocket] = useState(null);
  const [isOnGamePage, setIsOnGamePage] = useState(false);
  const navigate = useNavigate();

  const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };

  useEffect(() => {
    setIsOnGamePage(true); // Set true when component mounts
    return () => setIsOnGamePage(false); // Set false when component unmounts
  }, []);

  useEffect(() => {
    if (isOnGamePage) {
      if (isMobile()) {
        setFlashMessage("Mobile gameplay is not yet supported!");
        setFlashSuccess(false);
        setShowSnackbar(true);
        navigate("/");
      } else if (!backgroundId) {
        navigate("/");
        setFlashMessage("You must choose a background!");
        setFlashSuccess(false);
        setShowSnackbar(true);
      } else {
        const newSocket = io(WEBSOCKET);
        newSocket.on("connect", () => {
          newSocket.on("ConnectionRefused", (message) => {
            setFlashMessage(message);
            setFlashSuccess(false);
            setShowSnackbar(true);
          });
          newSocket.on("SameUserError", (message) => {
            setFlashMessage(message);
            setFlashSuccess(false);
            setShowSnackbar(true);
            newSocket.disconnect();
            navigate("/");
          });
          newSocket.emit("setName", { id: newSocket.id, name: username });
        });
        setSocket(newSocket);
      }
    }
  }, [isOnGamePage]);

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
          username={username}
          backgroundId={backgroundId}
        />
      )}
    </>
  );
};
