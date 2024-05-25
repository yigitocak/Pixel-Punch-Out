import "./SearchResultsItem.scss";
import arrow from "../../assets/images/arrow.svg";
import { useNavigate } from "react-router-dom";

export const SearchResultsItem = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profiles/${user.username}`);
  };
  return (
    <li className="result__item" key={user.id}>
      <img className="result__picture" src={user.photoUrl} alt="user profile" />
      <span className="result__username">{user.username}</span>
      <span className="result__wins">Wins: {user.wins}</span>
      <span className="result__losses">Losses: {user.losses}</span>
      <img
        className="result__link"
        src={arrow}
        alt="link"
        onClick={handleClick}
      />
    </li>
  );
};
