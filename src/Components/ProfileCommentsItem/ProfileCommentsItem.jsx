import "./ProfileCommentsItem.scss";
import trash from "../../assets/images/trash.svg";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";

export const ProfileCommentsItem = ({
  comment,
  user,
  timestamp,
  username,
  id,
  profileId,
  reRender,
  photoUrl,
  setFlashMessage,
  setFlashSuccess,
  setShowSnackbar,
}) => {
  const location = useLocation();
  const token = localStorage.getItem("authToken");

  const handleClick = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}profiles/${profileId}/comments/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setFlashMessage("Comment deleted!");
      setFlashSuccess(true);
      setShowSnackbar(true);
      reRender();
    } catch (err) {
      console.error(err);
      setFlashMessage("Something went wrong!");
      setFlashSuccess(false);
      setShowSnackbar(true);
    }
  };

  const localeTimeComment = new Date(timestamp).toLocaleDateString();
  return (
    <li className="comment__item">
      <div className="comment__user-wrapper">
        <img
          src={photoUrl}
          className="comment__photo"
          alt="user profile picture"
        />
        <Link to={`/profiles/${user}`} className="comment__user-link">
          <span className="comment__user">{user}</span>
        </Link>
      </div>
      <span className="comment__info">{comment}</span>
      <span className="comment__timestamp">{localeTimeComment}</span>
      {location.pathname === `/profiles/${username}` || user === username ? (
        <img
          className="comment__trash"
          src={trash}
          alt="trash icon"
          onClick={handleClick}
        />
      ) : (
        ""
      )}
    </li>
  );
};
