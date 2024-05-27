import React from "react";
import { useNavigate } from "react-router-dom";
import "./DiscordLoginButton.scss";
import discordLogo from "../../assets/logos/discord-white.svg";

export const DiscordLoginButton = () => {
  const navigate = useNavigate();
  const URL = "http://localhost:8080";

  const handleDiscordLogin = () => {
    window.location.href = `${URL}/discord/oauth/login`;
  };

  return (
    <button onClick={handleDiscordLogin} className="discord-login-button">
      <img src={discordLogo} alt="Discord Logo" className="discord-logo" />
      Login with Discord
    </button>
  );
};
