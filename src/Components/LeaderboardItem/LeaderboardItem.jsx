import "./LeaderboardItem.scss"
import {NavLink} from "react-router-dom";

export const LeaderboardItem = ({wins,losses,username, winrate, id}) => {
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
                    to={`/profiles/${id}`}
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
            {losses}
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