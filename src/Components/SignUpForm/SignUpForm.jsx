import "./SignUpForm.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import validator from "validator";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";

export const SignUpForm = ({
  setEmail,
  setShowVerifyModal,
  setFlashMessage,
  setFlashSuccess,
  setShowSnackbar,
  setIsLoggedIn,
  renderUsername,
}) => {
  const [email, setEmailState] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const signEmail = sessionStorage.getItem("signEmail");
  const signUser = sessionStorage.getItem("signUser");

  const AUTH_TOKEN_KEY = "authToken";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setFlashSuccess(false);
      setFlashMessage("All fields must be filled.");
      return setShowSnackbar(true);
    }
    if (username.includes(" ") || password.includes(" ")) {
      setFlashMessage("Spaces are not allowed in username or password.");
      setFlashSuccess(false);
      return setShowSnackbar(true);
    }
    if (password.length < 8 || password.length > 64) {
      setFlashMessage("Password must be between 8 and 64 characters.");
      setFlashSuccess(false);
      return setShowSnackbar(true);
    }
    if (password !== confirmPassword) {
      setFlashMessage("Passwords do not match.");
      setFlashSuccess(false);
      return setShowSnackbar(true);
    }
    if (username.length < 3 || username.length > 15) {
      setFlashMessage(
        "Username must be at least 3 characters and no more than 15 characters long.",
      );
      setFlashSuccess(false);
      return setShowSnackbar(true);
    }
    if (/[!@#$%^&*()_+\-=\\[]{};':"\\|,.<>\/?]+/.test(username)) {
      setFlashMessage("Username should not contain special characters.");
      setFlashSuccess(false);
      return setShowSnackbar(true);
    }
    if (!validator.isEmail(email)) {
      setFlashMessage("Invalid email format.");
      setFlashSuccess(false);
      return setShowSnackbar(true);
    }
    if (
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*()_+\-=\\[]{};':"\\|,.<>\/?]+/.test(password)
    ) {
      setFlashMessage(
        "Password must include at least one uppercase letter and one special character.",
      );
      setFlashSuccess(false);
      return setShowSnackbar(true);
    }
    if (!isChecked) {
      setFlashMessage("You must agree to the privacy policy.");
      setFlashSuccess(false);
      return setShowSnackbar(true);
    }

    try {
      await axios.post(`${BASE_URL}auth/signup`, {
        email,
        username,
        password,
      });
      setEmail(email);
      setShowVerifyModal(true);
      sessionStorage.setItem("signUser", "");
      sessionStorage.setItem("signEmail", "");
      sessionStorage.setItem("loginEmail", "");
    } catch (error) {
      console.error("Signup failed: ", error);
      if (error.response.status === 409) {
        setFlashMessage("Username or email already exists.");
        setFlashSuccess(false);
        setShowSnackbar(true);
      } else {
        setFlashMessage("Signup failed. Please try again later.");
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
    console.error("Google sign-in failed: ", error);
    setFlashMessage("Google sign-in failed. Please try again.");
    setFlashSuccess(false);
    setShowSnackbar(true);
  };

  return (
    <form className="signup__form" onSubmit={handleSubmit}>
      <label className="signup__label">
        Email
        <input
          placeholder="Enter your email"
          type="text"
          className="signup__input"
          autoComplete="email"
          id="signup-email"
          name="email"
          value={signEmail}
          onChange={(e) => {
            setEmailState(e.target.value);
            sessionStorage.setItem("signEmail", e.target.value);
          }}
        />
      </label>

      <label className="signup__label">
        Username
        <input
          placeholder="Enter your username"
          type="text"
          className="signup__input"
          autoComplete="username"
          id="signup-username"
          value={signUser}
          onChange={(e) => {
            setUsername(e.target.value);
            sessionStorage.setItem("signUser", e.target.value);
          }}
        />
      </label>

      <label className="signup__label">
        Password
        <input
          placeholder="Enter your password"
          type="password"
          className="signup__input"
          autoComplete="new-password"
          id="signup-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <label className="signup__label">
        Confirm Password
        <input
          placeholder="Re-enter your password"
          type="password"
          className="signup__input"
          id="confirm-password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>

      <label className="signup__remember-label">
        <input
          type="checkbox"
          className="signup__checkbox"
          name="checkbox"
          id="checkbox-signup"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <span className="signup__remember">
          I have read the
          <NavLink to="/privacy-policy" className="signup__link">
            Privacy Policy
          </NavLink>
        </span>
      </label>
      <button className="signup__button" type="submit">
        Sign Up
      </button>
      <div className="signup__or-container">
        <span className="signup__or-bar"></span>
        <span className="signup__or">or</span>
        <span className="signup__or-bar"></span>
      </div>

      <div>
        <GoogleLoginButton
          onLoginSuccess={handleGoogleLoginSuccess}
          onLoginFailure={handleGoogleLoginFailure}
        />
      </div>
      <NavLink className="signup__back" to="/login">
        Back to Login
      </NavLink>
    </form>
  );
};
