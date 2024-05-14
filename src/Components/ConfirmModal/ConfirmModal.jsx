import "./ConfirmModal.scss";

export const ConfirmModal = ({ show, handleClose, handleConfirm }) => {
  if (!show) return null;

  return (
    <div className="confirm-modal">
      <div className="confirm-modal__content">
        <h2 className="confirm-modal__title">Delete Profile</h2>
        <p className="confirm-modal__body">
          Are you sure you want to delete your profile? This action cannot be
          undone.
        </p>
        <div className="confirm-modal__actions">
          <button className="confirm-modal__button" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="confirm-modal__button confirm-modal__button--danger"
            onClick={handleConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
