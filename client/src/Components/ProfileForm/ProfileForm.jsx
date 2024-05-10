import './ProfileForm.scss'
import {useState} from "react";
import axios from "axios";
import {BASE_URL} from "../../utils/utils";

export const ProfileForm = ({username}) => {
    const [comment, setComment] = useState("")
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("");

        try {
            const response = await axios.post(`${BASE_URL}comments`, {
                username,
                comment
            });

            setComment("");
        } catch (error) {
            console.error("Comment submission failed: ", error);
            if (error.response && error.response.status === 400) {
                setError("Unable to post comment. Please check your input.");
            } else if (error.response && error.response.status === 401) {
                setError("Unauthorized. Please login to comment.");
            } else {
                setError("Comment submission failed. Please try again later.");
            }
        }
    }

    return (
        <form
            className="profile__form"
            onSubmit={handleSubmit}
        >
            <label
                className="profile__label"
            >
                {/*comment number*/}Comments
                <input
                    placeholder="Add a comment"
                    type="text"
                    className="profile__input"
                    autoComplete="email"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                />
            </label>
            <button
                className="profile__button"
            >
                Comment
            </button>
            {error && <div className="profile__error">{error}</div>}
        </form>
    )
}