import "./ProfileForm.scss";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";

export const ProfileForm = ({ username, profileId, reRender, comments }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (comment === "" || comment.trim() === "")
      return setError("Comment can't be empty.");

    try {
      const response = await axios.post(
        `${BASE_URL}profiles/${profileId}/comments`,
        {
          commentUsername: username,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setComment("");
      reRender();
    } catch (error) {
      console.error("Comment submission failed: ", error);
      if (error.response && error.response.status === 400) {
        setError("Unable to post comment.");
      } else if (error.response && error.response.status === 401) {
        setError("Unauthorized. Please login to comment.");
      } else {
        setError("Comment submission failed. Please try again later.");
      }
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
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>
      <button className="profile__button">Comment</button>
      {error && <div className="profile__error">{error}</div>}
    </form>
  );
};
