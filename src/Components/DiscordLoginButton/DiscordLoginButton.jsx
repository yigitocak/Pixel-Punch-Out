import React from "react";
import { useNavigate } from "react-router-dom";

export const DiscordLoginButton = () => {
  const navigate = useNavigate();
  const URL = "http://localhost:8080";

  const handleDiscordLogin = () => {
    window.location.href = `${URL}/discord/oauth/login`;
  };

  return (
    <button onClick={handleDiscordLogin} className="discord-login-button">
      Login with Discord
    </button>
  );
};
