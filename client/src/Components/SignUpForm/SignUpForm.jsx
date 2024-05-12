import "./SignUpForm.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import validator from "validator";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";

export const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !confirmPassword) {
      return setError("All fields must be filled.");
    }
    if (username.includes(" ") || password.includes(" ")) {
      return setError("Spaces are not allowed in username or password.");
    }
    if (password.length < 8 || password.length > 64) {
      return setError("Password must be between 8 and 64 characters.");
    }
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (username.length < 3 || username.length > 15) {
      return setError(
        "Username must be at least 3 characters and no more than 15 characters long.",
      );
    }
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(username)) {
      return setError("Username should not contain special characters.");
    }
    if (!validator.isEmail(email)) {
      return setError("Invalid email format.");
    }
    if (
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)
    ) {
      return setError(
        "Password must include at least one uppercase letter and one special character.",
      );
    }
    if (!isChecked) {
      return setError("You must agree to the privacy policy.");
    }

    try {
      const response = await axios.post(`${BASE_URL}auth/signup`, {
        email,
        username,
        password,
      });
      history("/login");
    } catch (error) {
      console.error("Signup failed: ", error);
      if (error.response.status === 409)
        setError("Username or email already exists.");
      else setError("Signup failed. Please try again later.");
    }
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
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="signup__label">
        Username
        <input
          placeholder="Enter your username"
          type="text"
          className="signup__input"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <label className="signup__label">
        Password
        <input
          placeholder="Enter your password"
          type="password"
          className="signup__input"
          autoComplete="new-password"
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
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <span className="signup__remember">
          I have read
          <NavLink to="/privacy-policy" className="signup__link">
            Privacy Policy
          </NavLink>
        </span>
      </label>
      {error && <div className="signup__error">{error}</div>}
      <button className="signup__button" type="submit">
        Sign Up
      </button>
      <NavLink className="signup__back" to="/login">
        Back to Login
      </NavLink>
    </form>
  );
};
