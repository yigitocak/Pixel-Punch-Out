import "./ProfileForm.scss";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";

export const ProfileForm = ({
  username,
  profileId,
  reRender,
  comments,
  userPhoto,
  setFlashSuccess,
  setFlashMessage,
  setShowSnackbar,
}) => {
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (comment === "" || comment.trim() === "") {
      setFlashMessage("Comment can't be empty.");
      setFlashSuccess(false);
      setShowSnackbar(true);
      return;
    }

    if (comment.length > 150) {
      setFlashMessage("Comment can't be more than 150 characters.");
      setFlashSuccess(false);
      setShowSnackbar(true);
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}profiles/${profileId}/comments`,
        {
          commentUsername: username,
          comment,
          commentPhoto: userPhoto,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setFlashMessage("Comment sent!");
      setFlashSuccess(true);
      setShowSnackbar(true);
      reRender();
      setComment("");
    } catch (error) {
      console.error("Comment submission failed: ", error);
      if (error.response && error.response.status === 400) {
        setFlashMessage("Unable to post comment.");
        setFlashSuccess(false);
        setShowSnackbar(true);
      } else if (error.response && error.response.status === 401) {
        setFlashMessage("Unauthorized. Please login to comment.");
        setFlashSuccess(false);
        setShowSnackbar(true);
      } else {
        setFlashMessage("Comment submission failed. Please try again later.");
        setFlashSuccess(false);
        setShowSnackbar(true);
      }
      setComment("");
    }
  };

  return (
    <form className="profile__form" onSubmit={handleSubmit}>
      <label className="profile__label">
        {comments.length} Comments
        <input
          placeholder="Add a comment"
          type="text"
          className="profile__input"
          autoComplete="email"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      <button className="profile__button">Comment</button>
    </form>
  );
};
