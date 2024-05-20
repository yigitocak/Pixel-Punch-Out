import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/utils";
import { Helmet } from "react-helmet";

export const HomePage = ({ isLoggedIn, setBackgroundId }) => {
  const [selectedMap, setSelectedMap] = useState(null);
  const navigate = useNavigate();
  const [isOnHomePage, setIsOnHomepage] = useState(false);

  useEffect(() => {
    setIsOnHomepage(true); // Set true when component mounts
    return () => setIsOnHomepage(false); // Set false when component unmounts
  }, []);

  useEffect(() => {
    if (isOnHomePage) {
      setSelectedMap(null);
      setBackgroundId(null);
    }
  }, [isOnHomePage, setBackgroundId]);

  const handleMapClick = (map) => {
    setSelectedMap(map);
    if (map === "dojo") setBackgroundId(1);
    else if (map === "leaf") setBackgroundId(2);
    else if (map === "dragon") setBackgroundId(3);
  };

  if (!isLoggedIn) {
    return (
      <section className="home">
        <Helmet>
          <title>Welcome | Pixel Punch-Out</title>
          <meta
            name="description"
            content="Pixel Punch-Out is a multiplayer web platform fighting game. Engage in real-time combat with friends or players worldwide. No downloads or high-end hardware needed. Select arenas, and start the action now!"
          />
        </Helmet>
        <div className="home__wrapper">
          <h1 className="home__title">Welcome to Pixel Punch-Out!</h1>
          <p className="home__info">
            Pixel Punch-Out is a multiplayer web platform fighting game that
            allows you to engage in combat with friends or people from all
            around the world. You can select from various arenas. It's a fun,
            straightforward game that anyone with a browser can jump into, with
            no heavy downloads or high-end hardware needed.
          </p>
          <h2 className="home__sub-title">How to Play:</h2>
          <ul className="home__list">
            <li className="home__item">
              <div className="home__instruction">
                Use <strong className="home__strong">A</strong> to move left,
              </div>
              <img
                className="home__gif"
                src={`${BASE_URL}img/gifs/left.gif`}
                alt="character goes left"
              />
            </li>
            <li className="home__item">
              <div className="home__instruction">
                use <strong className="home__strong">W</strong> to jump,
              </div>
              <img
                className="home__gif-jump"
                src={`${BASE_URL}img/gifs/jump.gif`}
                alt="character jumps"
              />
            </li>
            <li className="home__item">
              <div className="home__instruction">
                and <strong className="home__strong">D</strong> to move your
                character to the right.
              </div>
              <img
                className="home__gif"
                src={`${BASE_URL}img/gifs/right.gif`}
                alt="character goes to right"
              />
            </li>
            <li className="home__item">
              <div className="home__instruction">
                Press the <strong className="home__strong">space bar</strong> to
                attack.
              </div>
              <img
                className="home__gif"
                src={`${BASE_URL}img/gifs/attack.gif`}
                alt="character attacks"
              />
            </li>
          </ul>
          <p className="home__info">
            Pixel Punch-Out requires a minimum of 2 players. You can invite your
            friends to join. Ready to start the action? Click below to create
            your account and join the fight!
          </p>
          <div>
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="home__signup-button"
            >
              Sign Up Now!
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="home">
      <Helmet>
        <title>Home | Pixel Punch-Out</title>
        <meta
          name="description"
          content="Pixel Punch-Out is a multiplayer web platform fighting game. Engage in real-time combat with friends or players worldwide. No downloads or high-end hardware needed. Select arenas, and start the action now!"
        />
      </Helmet>
      <div className="home__wrapper">
        <h1 className="home__title">Welcome Back to Pixel Punch-Out!</h1>
        <p className="home__info">
          Ready to start playing? Select a map and press start to jump into the
          action. You can also view the leaderboard or visit your profile to see
          your stats and customize your character.
        </p>
        <div className="home__actions">
          <img
            className={`home__map ${selectedMap === "dragon" ? "home__map--selected" : ""}`}
            src={`${BASE_URL}img/gifs/dragon.gif`}
            alt="dragon map"
            onClick={() => handleMapClick("dragon")}
          />
          <img
            className={`home__map ${selectedMap === "leaf" ? "home__map--selected" : ""}`}
            src={`${BASE_URL}img/gifs/leaf.gif`}
            alt="leaf map"
            onClick={() => handleMapClick("leaf")}
          />
          <img
            className={`home__map ${selectedMap === "dojo" ? "home__map--selected" : ""}`}
            src={`${BASE_URL}img/gifs/dojo.gif`}
            alt="dojo map"
            onClick={() => handleMapClick("dojo")}
          />
          <button
            onClick={() => {
              navigate("/play");
            }}
            className="home__button"
          >
            Play
          </button>
        </div>
      </div>
    </section>
  );
};
