import "./HomePage.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const HomePage = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const zamaz = () => {
    navigate("/play");
  };

  if (!isLoggedIn) {
    return (
      <div className="home__login">You must login to see the content!</div>
    );
  }

  return (
    <>
      <button onClick={zamaz}>play</button>
    </>
  );
};
