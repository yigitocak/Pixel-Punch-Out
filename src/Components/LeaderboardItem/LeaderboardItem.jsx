import React from "react";
import { NavLink } from "react-router-dom";
import "./LeaderboardItem.scss";

export const LeaderboardItem = ({
  wins,
  losses,
  username,
  winrate,
  id,
  index,
}) => {
  const getClassForRank = (rank) => {
    if (rank === 0) return "golden-effect";
    if (rank === 1) return "silver-effect";
    if (rank === 2) return "bronze-effect";
    return "";
  };

  const rankClass = getClassForRank(index);

  return (
    <>
      <li className={`leaderboard__item ${rankClass}`}>
        <span className="leaderboard__index">{index + 1}. </span>
        <span className="leaderboard__info leaderboard__username">
          <NavLink className="leaderboard__username" to={`/profiles/${id}`}>
            {username}
          </NavLink>
        </span>
        <span className="leaderboard__total">{wins}</span>
        <span className="leaderboard__total">{losses}</span>
        <span className="leaderboard__info">{winrate}</span>
      </li>
      <hr />
    </>
  );
};
