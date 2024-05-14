import "./FlashMessage.scss";
import { useEffect } from "react";

export const FlashMessage = ({
  showSnackbar,
  flashSuccess,
  flashMessage,
  setShowSnackbar,
}) => {
  useEffect(() => {
    if (showSnackbar) {
      const timer = setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSnackbar, setShowSnackbar]);

  return (
    <section className={`snackbar ${showSnackbar ? "show" : ""}`}>
      <div className={flashSuccess ? "snackbar__success" : "snackbar__fail"}>
        <span className="snackbar__message">{flashMessage}</span>
      </div>
    </section>
  );
};
