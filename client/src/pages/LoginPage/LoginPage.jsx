import "./LoginPage.scss";
import { LoginForm } from "../../Components/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const LoginPage = ({
  isLoggedIn,
  setIsLoggedIn,
  username,
  renderUsername,
  setNumber,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(`/profiles/${username}`);
    }
  }, [isLoggedIn, username, navigate]); // Dependency array ensures this only runs when these values change

  return (
    <section className="login">
      <LoginForm
        setIsLoggedIn={setIsLoggedIn}
        renderUsername={renderUsername}
      />
    </section>
  );
};
