import "./ProfileCommentsItem.scss";
import trash from "../../assets/images/trash.svg";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const ProfileCommentsItem = ({
  comment,
  timestamp,
  username,
  commentId,
  id,
  profileId,
  reRender,
  setFlashMessage,
  setFlashSuccess,
  setShowSnackbar,
  user,
}) => {
  const location = useLocation();
  const token = Cookies.get("authToken");
  const [commentUser, setCommentUser] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  const getCommentUserData = async () => {
    const response = await axios.get(`${BASE_URL}profiles/id/${id}`);
    setCommentUser(response.data.profile.username);
    setPhotoUrl(response.data.profile.photoUrl);
  };

  useEffect(() => {
    getCommentUserData();
  }, [user]);

  const handleClick = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}profiles/${profileId}/comments/${commentId}`,
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
        <Link to={`/profiles/${commentUser}`} className="comment__user-link">
          <span className="comment__user">{commentUser}</span>
        </Link>
      </div>
      <span className="comment__info">{comment}</span>
      <span className="comment__timestamp">{localeTimeComment}</span>
      {location.pathname === `/profiles/${username}` ||
      commentUser === username ? (
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
