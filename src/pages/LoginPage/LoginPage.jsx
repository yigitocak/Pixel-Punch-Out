import "./LoginPage.scss";
import { LoginForm } from "../../Components/LoginForm/LoginForm";
import { VerifyModal } from "../../Components/VerifyModal/VerifyModal";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import { Helmet } from "react-helmet";
import Cookies from "js-cookie";

export const LoginPage = ({
  isLoggedIn,
  setIsLoggedIn,
  username,
  renderUsername,
  setFlashMessage,
  setFlashSuccess,
  setShowSnackbar,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const AUTH_TOKEN_KEY = "authToken";

  useEffect(() => {
    if (isLoggedIn) {
      navigate(`/profiles/${username}`);
    }
  }, [isLoggedIn, username, navigate]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const usernameQuery = query.get("username");
    const errorQuery = query.get("error");

    if (errorQuery === "discordConflict") {
      setFlashMessage("This Discord account is already linked to an account.");
      setFlashSuccess(false);
      setShowSnackbar(true);
    } else if (errorQuery === "unexpected") {
      setFlashMessage(
        "An unexpected error has occurred. If this issue persists, contact support on our Discord server.",
      );
      setFlashSuccess(false);
      setShowSnackbar(true);
    }

    if (token) {
      // Save the token in cookies
      Cookies.set(AUTH_TOKEN_KEY, token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      setIsLoggedIn(true);
      // Optionally, navigate to a different page
      navigate(`/profiles/${usernameQuery}`);
    }
  }, [
    location.search,
    setIsLoggedIn,
    navigate,
    setFlashMessage,
    setFlashSuccess,
    setShowSnackbar,
  ]);

  const handleVerification = async (code) => {
    try {
      await axios.post(`${BASE_URL}auth/verify`, {
        email,
        code,
      });
      setFlashMessage("Your account is now verified. You can now login!");
      setFlashSuccess(true);
      setShowSnackbar(true);
      setIsLoggedIn(false);
      setShowVerifyModal(false);
      navigate(`/login`);
    } catch (error) {
      if (error.response.status === 401) {
        setFlashMessage("Verification code is not correct!");
        setFlashSuccess(false);
        return setShowSnackbar(true);
      }
      setFlashMessage("Verification failed. Please try again.");
      setFlashSuccess(false);
      setShowSnackbar(true);
    }
  };

  return (
    <section className="login">
      <Helmet>
        <title>Login | Pixel Punch-Out</title>
        <meta
          name="description"
          content="Log in to Pixel Punch-Out to join the battle! Access your account, track your progress, and compete with friends and players worldwide."
        />
      </Helmet>
      <LoginForm
        setEmail={setEmail}
        setShowVerifyModal={setShowVerifyModal}
        setIsLoggedIn={setIsLoggedIn}
        renderUsername={renderUsername}
        setFlashSuccess={setFlashSuccess}
        setFlashMessage={setFlashMessage}
        setShowSnackbar={setShowSnackbar}
      />
      <VerifyModal
        show={showVerifyModal}
        handleConfirm={handleVerification}
        text="Please enter the new verification code sent to your email."
        title="Your account is not verified!"
      />
    </section>
  );
};

export default LoginPage;
