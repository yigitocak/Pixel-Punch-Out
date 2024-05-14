import "./Header.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import search from "../../assets/images/search.svg";
import { useState } from "react";

export const Header = ({ isLoggedIn, username }) => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  const [link, setLink] = useState(query);

  if (link) {
    setInput(query);
    setLink("");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "" || input.trim() === "") return;
    navigate(`/search?query=${input}`);
  };

  return (
    <header className="header">
      <ul className="header__list">
        <li className="header__item">
          <NavLink className="header__link" to="/">
            Home
          </NavLink>
        </li>

        <li className="header__item">
          <form className="header__search-bar" onSubmit={handleSubmit}>
            <input
              type="search"
              className="header__input"
              placeholder="Find a player..."
              name="inputBar"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="header__input-button">
              <img src={search} alt="person search" />
            </button>
          </form>
        </li>

        <div className="header__wrapper">
          <li className="header__item header__leaderboard">
            <NavLink className="header__link" to="/leaderboard">
              Leaderboard
            </NavLink>
          </li>

          <li className="header__item">
            {isLoggedIn ? (
              <NavLink className="header__link" to={`/profiles/${username}`}>
                Profile
              </NavLink>
            ) : (
              <NavLink className="header__link" to="/login">
                Login
              </NavLink>
            )}
          </li>
        </div>
      </ul>
    </header>
  );
};
