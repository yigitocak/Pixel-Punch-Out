import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, SECRET_KEY } from "../../utils/utils";
import "./ResetPage.scss";

export const ResetPage = ({
  setFlashMessage,
  setFlashSuccess,
  setShowSnackbar,
}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const email = queryParams.get("email");
  const code = queryParams.get("code");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function validateCode(email, code) {
    try {
      const response = await axios.post(`${BASE_URL}auth/validateReset`, {
        email,
        code,
      });
      return response.status === 200;
    } catch (error) {
      console.error("Error validating code:", error);
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (newPassword === "" || confirmPassword === "") {
      setFlashMessage("Please fill out the fields!");
      setFlashSuccess(false);
      setShowSnackbar(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setFlashMessage("Passwords doesn't match!");
      setFlashSuccess(false);
      setShowSnackbar(true);
      return;
    }

    if (
      !/[A-Z]/.test(newPassword) ||
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newPassword)
    ) {
      setFlashMessage(
        "Password must include at least one uppercase letter and one special character.",
      );
      setFlashSuccess(false);
      setShowSnackbar(true);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}auth/resetPassword`, {
        email,
        newPassword,
        secret: SECRET_KEY,
      });
      if (response.status === 200) {
        navigate("/login");
        setFlashMessage("Your password has been reset!");
        setFlashSuccess(true);
        setShowSnackbar(true);
      } else {
        setFlashMessage("Error resetting password!");
        setFlashSuccess(false);
        setShowSnackbar(true);
      }
    } catch (err) {
      console.error("Error resetting password:", err);
      setFlashMessage("Error resetting password!");
      setFlashSuccess(false);
      setShowSnackbar(true);
    }
  }

  useEffect(() => {
    async function checkValid() {
      if (!email || !code) {
        navigate("/");
        setFlashMessage("You can't access this page!");
        setFlashSuccess(false);
        setShowSnackbar(true);
        return;
      }
      const isValid = await validateCode(email, code);
      if (!isValid) {
        navigate("/");
        setFlashMessage("This link has expired.");
        setFlashSuccess(false);
        setShowSnackbar(true);
      }
    }
    checkValid();
  }, [
    email,
    code,
    navigate,
    setFlashMessage,
    setFlashSuccess,
    setShowSnackbar,
  ]);

  return (
    <section className="reset">
      <form className="reset__form" onSubmit={handleSubmit}>
        <h1 className="reset__title">Reset my password</h1>
        <label className="reset__label">
          New password:
          <input
            className="reset__input"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            type="password"
            autoComplete="new-password"
          />
        </label>
        <label className="reset__label">
          Confirm new password:
          <input
            className="reset__input"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            type="password"
            autoComplete="new-password"
          />
        </label>
        <div className="reset__wrapper">
          <button className="reset__button" type="submit">
            Change my password
          </button>
        </div>
      </form>
    </section>
  );
};
