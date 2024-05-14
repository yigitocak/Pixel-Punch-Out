import "./ProfilePage.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import { ProfileForm } from "../../Components/ProfileForm/ProfileForm";
import { ProfileCommentList } from "../../Components/ProfileCommentList/ProfileCommentList";
import camera from "../../assets/images/camera.svg";
import logout from "../../assets/images/logout.svg";
import { ConfirmModal } from "../../Components/ConfirmModal/ConfirmModal";

export const ProfilePage = ({
  isLoggedIn,
  username,
  setIsLoggedIn,
  isAuthenticating,
  setFlashMessage,
  setFlashSuccess,
  setShowSnackbar,
}) => {
  const { profileId } = useParams();
  const token = localStorage.getItem("authToken");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticating && !isLoggedIn) {
      navigate("/login");
      setFlashMessage("You have to login to see the content!.");
      setFlashSuccess(false);
      setShowSnackbar(true);
    } else {
      getUser();
    }
  }, [isLoggedIn, isAuthenticating, navigate, profileId]);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}profiles/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(response.data.profile);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [username]);

  const getUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}profiles/${profileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.profile);
      setComments(response.data.profile.comments);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [profileId]);

  const onFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setFlashMessage("No file selected.");
      setFlashSuccess(false);
      setShowSnackbar(true);
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setFlashMessage("Invalid file type. Only JPG and PNG are allowed.");
      setFlashSuccess(false);
      setShowSnackbar(true);
      return;
    }

    if (file.size > maxSize) {
      setFlashMessage("File is too large. Maximum size is 1 MB.");
      setFlashSuccess(false);
      setShowSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await axios.post(
        `${BASE_URL}profiles/${username}/uploadPhoto`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setUser({ ...user, photoUrl: response.data.photoUrl });
      setFlashMessage("Picture uploaded!");
      setFlashSuccess(true);
      setShowSnackbar(true);
    } catch (err) {
      console.error(err);
      setFlashMessage("Failed to upload photo.");
      setFlashSuccess(true);
      setShowSnackbar(true);
    }
  };

  const handleClick = () => {
    try {
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      setFlashMessage("You've logged out!");
      setFlashSuccess(true);
      setShowSnackbar(true);
      navigate("/login");
    } catch (err) {
      setFlashMessage("Something went wrong!");
      setFlashSuccess(false);
      setShowSnackbar(true);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}profiles/${profileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      navigate("/login");
      setFlashMessage("You've deleted your profile!");
      setFlashSuccess(true);
      setShowSnackbar(true);
    } catch (err) {
      console.error(err);
      setFlashMessage("Failed to delete profile.");
      setFlashSuccess(false);
      setShowSnackbar(true);
    }
  };

  return (
    <section className="profile">
      <div className="profile__container">
        {location.pathname === `/profiles/${username}` ? (
          <img src={logout} className="profile__logout" onClick={handleClick} />
        ) : (
          ""
        )}
        <div className="profile__user">
          <div className="profile__picture-wrapper">
            <img
              className="profile__picture"
              src={user.photoUrl}
              alt="user profile picture"
            />
            {location.pathname === `/profiles/${username}` ? (
              <label className="profile__upload-label">
                <input
                  type="file"
                  accept="/image/*"
                  className="profile__upload"
                  onChange={onFileUpload}
                />
                <img
                  src={camera}
                  className="profile__upload-camera"
                  alt="profile picture upload"
                />
              </label>
            ) : (
              ""
            )}
          </div>
          <span className="profile__username">{user.username}</span>
        </div>
        <div className="profile__info-wrapper">
          <span className="profile__info">Wins:{user.wins}</span>
          <span className="profile__info">Losses:{user.losses}</span>
        </div>
        <ProfileForm
          username={username}
          profileId={profileId}
          reRender={getUser}
          comments={comments}
          userPhoto={currentUser.photoUrl}
          setFlashSuccess={setFlashSuccess}
          setFlashMessage={setFlashMessage}
          setShowSnackbar={setShowSnackbar}
        />
        <ProfileCommentList
          comments={comments}
          username={username}
          reRender={getUser}
          profileId={profileId}
          setFlashSuccess={setFlashSuccess}
          setFlashMessage={setFlashMessage}
          setShowSnackbar={setShowSnackbar}
        />
        {location.pathname === `/profiles/${username}` ? (
          <div className="profile__delete">
            <button
              className="profile__delete-button"
              onClick={() => setShowModal(true)}
            >
              Delete Profile
            </button>
            <ConfirmModal
              show={showModal}
              handleClose={() => setShowModal(false)}
              handleConfirm={handleDelete}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};