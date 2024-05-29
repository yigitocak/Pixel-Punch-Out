import "./ChangeName.scss";

export const ChangeName = ({
  show,
  handleClose,
  handleConfirm,
  setChangeName,
  changeName,
}) => {
  if (!show) return null;

  return (
    <div className="change-name">
      <div className="change-name__content">
        <h2 className="change-name__title">Change your username</h2>
        <p className="change-name__body">
          Are you sure you want to change your username? You will NOT be able to
          change it another 15 days.
        </p>
        <input
          type="text"
          className="change-name__input"
          value={changeName}
          onChange={(e) => setChangeName(e.target.value)}
          placeholder="New username"
        />
        <div className="change-name__actions">
          <button className="change-name__button" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="change-name__button change-name__button--danger"
            onClick={handleConfirm}
          >
            Change username
          </button>
        </div>
      </div>
    </div>
  );
};
