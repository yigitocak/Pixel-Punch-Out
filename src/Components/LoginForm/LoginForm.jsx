import "./LoginForm.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import { ForgotModal } from "../ForgotModal/ForgotModal";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";
import { DiscordLoginButton } from "../DiscordLoginButton/DiscordLoginButton";

export const LoginForm = ({
  setEmail,
  setShowVerifyModal,
  setIsLoggedIn,
  renderUsername,
  setFlashMessage,
  setFlashSuccess,
  setShowSnackbar,
}) => {
  const [emailState, setEmailState] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const AUTH_TOKEN_KEY = "authToken";
  const navigate = useNavigate();

  const handleForgotPassword = async (email) => {
    if (email === "" || email.trim() === "") {
      setFlashMessage("Fields can't be empty!");
      setFlashSuccess(false);
      return setShowSnackbar(true);
    }

    try {
      await axios.post(`${BASE_URL}auth/reset`, { email });
      setFlashMessage("A password reset link has been sent to your email.");
      setFlashSuccess(true);
      setShowSnackbar(true);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "oAuth2"
      ) {
        setFlashMessage(
          "Password reset is not available for this account because it uses OAuth2 authentication.",
        );
        setFlashSuccess(false);
        return setShowSnackbar(true);
      }

      setFlashMessage("Failed to send password reset link. Please try again.");
      setFlashSuccess(false);
      setShowSnackbar(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailState || !password) {
      setFlashMessage("Please fill out the fields!");
      setFlashSuccess(false);
      setShowSnackbar(true);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}auth/login`, {
        email: emailState,
        password,
        rememberMe,
      });

      // Check if the response indicates a pending user
      if (
        response.data.message &&
        response.data.message.includes("verification code")
      ) {
        setEmail(emailState);
        setShowVerifyModal(true);
        return;
      }

      localStorage.setItem("authToken", response.data.token);
      setIsLoggedIn(true);
      renderUsername(response.data.username);
      setFlashMessage("You've successfully logged in!");
      setFlashSuccess(true);
      setShowSnackbar(true);
      sessionStorage.setItem("signUser", "");
      sessionStorage.setItem("signEmail", "");
    } catch (error) {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "oAuth2 Required"
      ) {
        setFlashMessage(
          "Please log in using the method you used to create your account.",
        );
        setFlashSuccess(false);
        return setShowSnackbar(true);
      }

      if (error.response && error.response.status === 401) {
        setFlashMessage("Sorry, your email or password was incorrect.");
        setFlashSuccess(false);
        setShowSnackbar(true);
      } else {
        setFlashMessage("Login failed. Please try again later.");
        setFlashSuccess(false);
        setShowSnackbar(true);
      }
    }
  };

  const handleGoogleLoginSuccess = (data) => {
    const { token, username } = data;

    // Save the token and update the login state
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    setIsLoggedIn(true);
    renderUsername(username);
    navigate(`/profiles/${username}`);
  };

  const handleGoogleLoginFailure = (error) => {
    setFlashMessage("Google sign-in failed. Please try again.");
    setFlashSuccess(false);
    setShowSnackbar(true);
  };

  return (
    <>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__label">
          Email
          <input
            placeholder="Enter your email"
            type="email"
            className="login__input"
            id="email"
            autoComplete="email"
            value={emailState}
            onChange={(e) => {
              setEmailState(e.target.value);
            }}
          />
        </label>

        <label className="login__label">
          Password
          <input
            placeholder="Enter your password"
            id="password"
            type="password"
            className="login__input"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <span
          className="login__forgot"
          onClick={() => setShowForgotModal(true)}
        >
          Forgot my password!
        </span>
        <label className="login__remember-label">
          <input
            type="checkbox"
            className="login__checkbox"
            id="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span className="login__remember">Remember me</span>
        </label>
        <button className="login__button">Login</button>
        <div className="login__signup-wrapper">
          <span className="login__signup-text">Don't have an account?</span>
          <NavLink className="login__signup" to="/signup">
            Sign Up now!
          </NavLink>
        </div>
        <div className="login__or-container">
          <span className="login__or-bar"></span>
          <span className="login__or">or</span>
          <span className="login__or-bar"></span>
        </div>
        <div className="login__button-container">
          <GoogleLoginButton
            onLoginSuccess={handleGoogleLoginSuccess}
            onLoginFailure={handleGoogleLoginFailure}
          />
          <DiscordLoginButton />
        </div>
      </form>
      <ForgotModal
        show={showForgotModal}
        handleClose={() => setShowForgotModal(false)}
        handleConfirm={handleForgotPassword}
        setFlashSuccess={setFlashSuccess}
        setFlashMessage={setFlashMessage}
        setShowSnackbar={setShowSnackbar}
      />
    </>
  );
};
