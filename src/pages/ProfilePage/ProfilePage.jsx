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
import { Helmet } from "react-helmet";
import discordLogo from "../../assets/logos/discord-white.svg";
import editPen from "../../assets/images/editPen.svg";
import { ChangeName } from "../../Components/ChangeName/ChangeName";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import { Spinner } from "../../Components/Spinner/Spinner";
import { ProfileSpinner } from "../../Components/ProfileSpinner/ProfileSpinner";

export const ProfilePage = ({
  isLoggedIn,
  username,
  setIsLoggedIn,
  setFlashMessage,
  setFlashSuccess,
  setShowSnackbar,
  isAuthenticating,
}) => {
  const { profileId } = useParams();
  const token = localStorage.getItem("authToken");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [discordUsername, setDiscordUsername] = useState("");
  const [changeName, setChangeName] = useState("");
  const [userFound, setUserFound] = useState(null);
  const [loading, setLoading] = useState(true);
  const [photoLoading, setPhotoLoading] = useState(false);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}profiles/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(response.data.profile);
    } catch (e) {}
  };

  useEffect(() => {
    getCurrentUser();
  }, [username]);

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}profiles/${profileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.profile);
      setComments(response.data.profile.comments);
      setUserFound(true);
    } catch (err) {
      if (err.response.status === 400) {
        setUserFound(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn && !isAuthenticating) {
      navigate("/login");
      setFlashMessage("You have to login to see the content!.");
      setFlashSuccess(false);
      setShowSnackbar(true);
    } else {
      getUser();
    }
  }, [isLoggedIn, isAuthenticating, navigate, profileId]);

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

    setPhotoLoading(true);

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
      setFlashMessage("Failed to upload photo.");
      setFlashSuccess(false);
      setShowSnackbar(true);
    } finally {
      setPhotoLoading(false);
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
      setFlashMessage("Failed to delete profile.");
      setFlashSuccess(false);
      setShowSnackbar(true);
    }
  };

  const handleUsername = async () => {
    if (changeName === "") {
      setFlashMessage("Please fill out the field!");
      setFlashSuccess(false);
      return setShowSnackbar(true);
    }

    const invalidCharacters = /[^a-zA-Z0-9]/;
    if (changeName.includes(" ") || invalidCharacters.test(changeName)) {
      setFlashMessage("Username can't contain space or special characters!");
      setFlashSuccess(false);
      return setShowSnackbar(true);
    }

    try {
      const response = await axios.post(
        `${BASE_URL}profiles/username`,
        { newUsername: changeName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      localStorage.setItem("authToken", response.data.token);
      setShowNameModal(false);
      navigate(`/profiles/${changeName}`);
      setFlashMessage(response.data.message);
      setFlashSuccess(true);
      setShowSnackbar(true);
    } catch (e) {
      if (e.response.status === 400) {
        setFlashMessage(e.response.data.message + "!");
        setFlashSuccess(false);
        setShowSnackbar(true);
        return setShowNameModal(false);
      }
      setFlashMessage("Something went wrong!");
      setFlashSuccess(false);
      setShowSnackbar(true);
      setShowNameModal(false);
    }
  };

  const handleDiscordVerify = () => {
    const baseUrl = `${BASE_URL}discord/verify`;
    const queryParams = new URLSearchParams({ user_id: currentUser.username });
    window.location.href = `${baseUrl}?${queryParams}`;
  };

  const fetchDiscordUsername = async (userId) => {
    try {
      const response = await axios.post(`${BASE_URL}discord/getuserdata`, {
        discordId: userId,
      });
      return response.data.username;
    } catch (err) {}
  };

  useEffect(() => {
    const getDiscordUsername = async () => {
      if (user?.discordID) {
        const username = await fetchDiscordUsername(user.discordID);
        setDiscordUsername(username);
      }
    };
    getDiscordUsername();
  }, [user]);

  if (loading) {
    return <Spinner />;
  }

  if (!userFound) {
    return <NotFoundPage />;
  }

  return (
    <section className="profile">
      <Helmet>
        <title>{`${user?.username || "Loading..."}'s Profile | Pixel Punch-Out`}</title>
        <meta
          name="description"
          content={`Checkout ${user?.username}'s Pixel Punch-Out Profile`}
        />
      </Helmet>
      <div className="profile__container">
        {location.pathname === `/profiles/${username}` ? (
          <img
            alt="logout icon"
            src={logout}
            className="profile__logout"
            onClick={handleClick}
          />
        ) : (
          ""
        )}
        <div className="profile__user">
          <div className="profile__picture-wrapper">
            {photoLoading ? (
              <ProfileSpinner />
            ) : user?.photoUrl ? (
              <img
                className="profile__picture"
                src={user.photoUrl}
                alt="profile pic"
              />
            ) : (
              <div className="profile__picture-placeholder">
                <ProfileSpinner />
              </div>
            )}
            {location.pathname === `/profiles/${username}` && !photoLoading ? (
              <label className="profile__upload-label">
                <input
                  type="file"
                  accept="image/*"
                  className="profile__upload"
                  onChange={onFileUpload}
                />
                <img
                  src={camera}
                  className="profile__upload-camera"
                  alt="upload"
                />
              </label>
            ) : (
              ""
            )}
          </div>
          <span
            className={
              user?.admin ? "profile__username--admin" : "profile__username"
            }
          >
            {user?.username}
            {user?.admin ? (
              <div className="tooltip">
                The red username indicates that this user is an admin.
              </div>
            ) : (
              <></>
            )}
            {location.pathname === `/profiles/${username}` ? (
              <>
                <img
                  className="profile__edit-pen"
                  src={editPen}
                  alt="edit pen"
                  onClick={() => setShowNameModal(true)}
                />
                <ChangeName
                  show={showNameModal}
                  handleClose={() => setShowNameModal(false)}
                  setChangeName={setChangeName}
                  changeName={changeName}
                  handleConfirm={handleUsername}
                />
              </>
            ) : null}
          </span>
        </div>
        {location.pathname === `/profiles/${username}` && !user?.discordID && (
          <button
            onClick={handleDiscordVerify}
            className="verify-discord-button"
          >
            <img
              src={discordLogo}
              alt="Discord Logo"
              className="discord-logo"
            />
            Verify Discord
          </button>
        )}
        {user?.discordID && (
          <span className="verify-discord-button">
            <img
              src={discordLogo}
              alt="Discord Logo"
              className="discord-logo"
            />
            Verified
            <span className="tooltip">
              This user verified their account. {<br />}
              They are known as {discordUsername}
            </span>
          </span>
        )}
        <div className="profile__info-wrapper">
          <span className="profile__info">Wins: {user?.wins}</span>
          <span className="profile__info">Losses: {user?.losses}</span>
        </div>
        {user && (
          <>
            <ProfileForm
              username={username}
              profileId={profileId}
              reRender={getUser}
              comments={comments}
              userPhoto={currentUser?.photoUrl}
              setFlashSuccess={setFlashSuccess}
              setFlashMessage={setFlashMessage}
              setShowSnackbar={setShowSnackbar}
            />
            <ProfileCommentList
              comments={comments}
              username={username}
              reRender={getUser}
              profileId={profileId}
              user={user}
              setFlashSuccess={setFlashSuccess}
              setFlashMessage={setFlashMessage}
              setShowSnackbar={setShowSnackbar}
            />
          </>
        )}
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
        ) : null}
      </div>
    </section>
  );
};
