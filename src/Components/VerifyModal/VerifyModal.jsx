import "./VerifyModal.scss";
import { useState } from "react";

export const VerifyModal = ({ show, handleConfirm, title, text }) => {
  const [verificationCode, setVerificationCode] = useState("");

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    handleConfirm(verificationCode);
  };

  return (
    <div className="verify">
      <div className="verify__content">
        <h2 className="verify__title">{title}</h2>
        <p className="verify__body">{text}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="verify__input"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Verification Code"
          />
          <div className="verify__actions">
            <button
              type="submit"
              className="verify__button verify__button--confirm"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
