import "./SignUpPage.scss";
import { SignUpForm } from "../../Components/SignUpForm/SignUpForm";
import { VerifyModal } from "../../Components/VerifyModal/VerifyModal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import { Helmet } from "react-helmet";

export const SignUpPage = ({
  isLoggedIn,
  username,
  setFlashMessage,
  setFlashSuccess,
  setShowSnackbar,
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  if (isLoggedIn) {
    navigate(`/profiles/${username}`);
  } else {
    const handleVerification = async (code) => {
      try {
        const response = await axios.post(`${BASE_URL}auth/verify`, {
          email,
          code,
        });
        setFlashMessage(response.data.message);
        setFlashSuccess(true);
        setShowSnackbar(true);
        navigate("/login");
      } catch (error) {
        console.error("Verification failed: ", error);
        setFlashMessage("Verification failed. Please try again.");
        setFlashSuccess(false);
        setShowSnackbar(true);
      }
    };

    return (
      <section className="signup">
        <Helmet>
          <title>Sign Up | Pixel Punch-Out</title>
          <meta
            name="description"
            content="Join Pixel Punch-Out today and become a champion! Sign up now to create your fighter, unlock arenas, and battle against friends and players from around the globe in this action-packed browser game. No downloads required!"
          />
        </Helmet>
        <SignUpForm
          setEmail={setEmail}
          setShowVerifyModal={setShowVerifyModal}
          setFlashMessage={setFlashMessage}
          setFlashSuccess={setFlashSuccess}
          setShowSnackbar={setShowSnackbar}
        />
        <VerifyModal
          show={showVerifyModal}
          handleConfirm={handleVerification}
          text="Please enter the verification code sent to your email."
          title="Enter Your Verification Code"
        />
      </section>
    );
  }
};
