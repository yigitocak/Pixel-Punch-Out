import "./MobileHeader.scss";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import search from "../../assets/images/search.svg";
import menuIcon from "../../assets/images/menu.svg";
import closeIcon from "../../assets/images/close.svg";
import logo from "../../assets/logos/logo.jpg";
import { useState } from "react";

export const MobileHeader = ({ isLoggedIn, username }) => {
  const [input, setInput] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="mobile-header">
      <span className="mobile-header__title">Pixel Punch-Out</span>
      <img src={logo} alt="ppo logo" className="mobile-header__image" />
      <button className="mobile-header__menu-button" onClick={toggleMobileMenu}>
        <img
          className="mobile-header__menu-image"
          src={mobileMenuOpen ? closeIcon : menuIcon}
          alt="menu"
        />
      </button>

      {mobileMenuOpen && (
        <div className="mobile-header__menu">
          <ul className="mobile-header__list">
            <li className="mobile-header__item mobile-header__item-search">
              <form
                className="mobile-header__search-bar"
                onSubmit={handleSubmit}
              >
                <input
                  type="search"
                  className="mobile-header__input"
                  placeholder="Find a player..."
                  name="inputBar"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button className="mobile-header__input-button">
                  <img src={search} alt="person search" />
                </button>
              </form>
            </li>
            <li className="mobile-header__item">
              {isLoggedIn ? (
                <NavLink
                  className="mobile-header__link"
                  to="/"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  Start playing!
                </NavLink>
              ) : (
                <NavLink
                  className="mobile-header__link"
                  to="/"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  Learn to play!
                </NavLink>
              )}
            </li>

            <li className="mobile-header__item">
              <NavLink
                className="mobile-header__link"
                to="/leaderboard"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                Leaderboard
              </NavLink>
            </li>

            <li className="mobile-header__item">
              {isLoggedIn ? (
                <NavLink
                  className="mobile-header__link"
                  to={`/profiles/${username}`}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  Profile
                </NavLink>
              ) : (
                <NavLink
                  className="mobile-header__link"
                  to="/login"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
