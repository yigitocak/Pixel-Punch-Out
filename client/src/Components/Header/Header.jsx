import './Header.scss'

export const Header = () => {
    return(
        <header className="header">
            <ul
                className="header__list"
            >
                <div
                    className="header__wrapper"
                >
                    <li
                        className="header__item"
                    >
                        Home
                    </li>
                    <li
                        className="header__item"
                    >
                        Leaderboard
                    </li>
                </div>
                <div
                    className="header__wrapper"
                >
                    <li
                        className="header__item"
                    >
                        <input/>
                    </li>
                    <li
                        className="header__item"
                    >
                        Profile
                    </li>
                </div>

            </ul>
        </header>
    )
}