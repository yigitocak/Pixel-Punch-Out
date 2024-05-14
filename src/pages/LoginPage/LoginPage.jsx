import "./LoginPage.scss";
import { LoginForm } from "../../Components/LoginForm/LoginForm";
import { VerifyModal } from "../../Components/VerifyModal/VerifyModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";

export const LoginPage = ({
  isLoggedIn,
  setIsLoggedIn,
  username,
  renderUsername,
  setFlashMessage,
  setFlashSuccess,
  setShowSnackbar,
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(`/profiles/${username}`);
    }
  }, [isLoggedIn, username, navigate]); // Dependency array ensures this only runs when these values change

  const handleVerification = async (code) => {
    try {
      const response = await axios.post(`${BASE_URL}auth/verify`, {
        email,
        code,
      });
      setFlashMessage("Your account is now verified. You can now login!");
      setFlashSuccess(true);
      setShowSnackbar(true);
      setIsLoggedIn(false);
      setShowVerifyModal(false);
      navigate(`/login`);
    } catch (error) {
      console.error("Verification failed: ", error);
      setFlashMessage("Verification failed. Please try again.");
      setFlashSuccess(false);
      setShowSnackbar(true);
    }
  };

  return (
    <section className="login">
      <LoginForm
        setEmail={setEmail}
        setShowVerifyModal={setShowVerifyModal}
        setIsLoggedIn={setIsLoggedIn}
        renderUsername={renderUsername}
        setFlashSuccess={setFlashSuccess}
        setFlashMessage={setFlashMessage}
        setShowSnackbar={setShowSnackbar}
      />
      <VerifyModal
        show={showVerifyModal}
        handleConfirm={handleVerification}
        text="Please enter the new verification code sent to your email."
        title="Your account is not verified!"
      />
    </section>
  );
};