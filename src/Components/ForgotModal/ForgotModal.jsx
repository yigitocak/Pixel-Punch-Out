import "./ForgotModal.scss";
import { useState } from "react";

export const ForgotModal = ({ show, handleClose, handleConfirm }) => {
  const [email, setEmail] = useState("");

  if (!show) return null;

  return (
    <div className="forgot">
      <div className="forgot__content">
        <h2 className="forgot__title">Forgot My Password</h2>
        <p className="forgot__body">Please enter your email:</p>
        <input
          type="email"
          className="forgot__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <div className="forgot__actions">
          <button
            className="forgot__button forgot__button--cancel"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="forgot__button forgot__button--confirm"
            onClick={() => {
              handleConfirm(email);
              handleClose();
            }}
          >
            Submit!
          </button>
        </div>
      </div>
    </div>
  );
};
