import "./ProfileCommentsItem.scss";
import trash from "../../assets/images/trash.svg";
import { useLocation } from "react-router-dom";
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
}) => {
  const location = useLocation();
  const token = localStorage.getItem("authToken");

  const handleClick = async () => {
    const response = await axios.delete(
      `${BASE_URL}profiles/${profileId}/comments/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    reRender();
  };

  const localeTimeComment = new Date(timestamp).toLocaleDateString();
  return (
    <li className="comment__item">
      <span className="comment__user">{user}</span>
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
