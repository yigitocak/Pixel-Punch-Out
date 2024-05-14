import "./LoginForm.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";

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
    } catch (error) {
      console.error("Login failed: ", error);
      if (error.response.status) {
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

  return (
    <form className="login__form" onSubmit={handleSubmit}>
      <label className="login__label">
        Email
        <input
          placeholder="Enter your email"
          type="text"
          className="login__input"
          autoComplete="email"
          value={emailState}
          onChange={(e) => setEmailState(e.target.value)}
        />
      </label>

      <label className="login__label">
        Password
        <input
          placeholder="Enter your password"
          type="password"
          className="login__input"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label className="login__remember-label">
        <input
          type="checkbox"
          className="login__checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <span className="login__remember">Remember me</span>
      </label>
      <button className="login__button">Login</button>
      <NavLink className="login__signup" to="/signup">
        Sign Up now!
      </NavLink>
    </form>
  );
};
