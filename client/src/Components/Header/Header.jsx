import './Header.scss'
import {NavLink} from "react-router-dom";

export const Header = ({isLoggedIn, username}) => {
    return(
        <header className="header">
            <ul
                className="header__list"
            >
                <li
                    className="header__item"
                >
                    <NavLink
                        className="header__link"
                        to="/"
                    >
                        Home
                    </NavLink>
                </li>
                <div
                    className="header__wrapper"
                >
                    <li
                        className="header__item"
                    >
                        <NavLink
                            className="header__link"
                            to="/leaderboard"
                        >
                            Leaderboard
                        </NavLink>
                    </li>

                    <li
                        className="header__item"
                    >
                        {isLoggedIn ?
                            (<NavLink
                                className="header__link"
                                to={`/profiles/${username}`}
                            >
                                Profile
                            </NavLink>)
                             :
                            (<NavLink
                                className="header__link"
                                to="/login"
                            >
                                Login
                            </NavLink>)
                        }
                    </li>
                </div>
            </ul>
        </header>
    )
}