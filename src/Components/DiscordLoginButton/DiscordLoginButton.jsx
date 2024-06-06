import "./DiscordLoginButton.scss";
import discordLogo from "../../assets/logos/discord-white.svg";
import { BASE_URL } from "../../utils/utils";

export const DiscordLoginButton = () => {
  const handleDiscordLogin = (e) => {
    e.preventDefault();
    window.location.href = `${BASE_URL}discord/oauth/login`;
  };

  return (
    <button onClick={handleDiscordLogin} className="discord-login-button">
      <img src={discordLogo} alt="Discord Logo" className="discord-logo" />
      Login with Discord
    </button>
  );
};
