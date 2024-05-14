import "./VerifyModal.scss";
import { useState } from "react";

export const VerifyModal = ({ show, handleConfirm, title, text }) => {
  const [verificationCode, setVerificationCode] = useState("");

  if (!show) return null;

  return (
    <div className="verify">
      <div className="verify__content">
        <h2 className="verify__title">{title}</h2>
        <p className="verify__body">{text}</p>
        <input
          type="text"
          className="verify__input"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="Verification Code"
        />
        <div className="verify__actions">
          <button
            className="verify__button verify__button--confirm"
            onClick={() => handleConfirm(verificationCode)}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};
