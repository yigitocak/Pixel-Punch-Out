import "./ProfilePage.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import { ProfileForm } from "../../Components/ProfileForm/ProfileForm";
import { ProfileCommentList } from "../../Components/ProfileCommentList/ProfileCommentList";
import camera from "../../assets/images/camera.svg";
import logout from "../../assets/images/logout.svg";

export const ProfilePage = ({
  isLoggedIn,
  username,
  setIsLoggedIn,
  isAuthenticating,
}) => {
  const { profileId } = useParams();
  const token = localStorage.getItem("authToken");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticating) {
      // Only consider redirection if authentication check is done
      if (!isLoggedIn) {
        navigate("/login");
      } else {
        getUser(); // Fetch user data only when logged in and not authenticating
      }
    }
  }, [isLoggedIn, isAuthenticating, navigate, profileId]);

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
      setErrorMessage("No file selected.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("Invalid file type. Only JPG and PNG are allowed.");
      return;
    }

    if (file.size > maxSize) {
      setErrorMessage("File is too large. Maximum size is 1 MB.");
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
      setErrorMessage("");
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to upload photo.");
    }
  };

  const handleClick = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/login");
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
        {errorMessage && <div className="profile__error">{errorMessage}</div>}
        <div className="profile__info-wrapper">
          <span className="profile__info">Wins:{user.wins}</span>
          <span className="profile__info">Losses:{user.losses}</span>
        </div>
        <ProfileForm
          username={username}
          profileId={profileId}
          reRender={getUser}
          comments={comments}
        />
        <ProfileCommentList
          comments={comments}
          username={username}
          reRender={getUser}
          profileId={profileId}
        />
      </div>
    </section>
  );
};
