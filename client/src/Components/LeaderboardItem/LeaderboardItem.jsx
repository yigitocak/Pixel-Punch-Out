import "./LeaderboardItem.scss"
import {NavLink} from "react-router-dom";

export const LeaderboardItem = ({wins,loses,username, winrate, id}) => {
    return (
        <>
            <li
                className="leaderboard__item"
            >
            <span
                className="leaderboard__info leaderboard__username"
            >
                <NavLink
                    className="leaderboard__username"
                    to={`/profile/${id}`}
                >
                    {username}
                </NavLink>
            </span>
                <span
                    className="leaderboard__total"
                >
            {wins}
            </span>
                <span
                    className="leaderboard__total"
                >
            {loses}
            </span>
            <span
                    className="leaderboard__info"
                >
            {winrate}
            </span>
            </li>
            <hr/>
        </>
    )
}