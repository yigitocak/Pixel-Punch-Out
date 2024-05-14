import "./LeaderboardPage.scss"
import {LeaderboardList} from "../../Components/LeaderboardList/LeaderboardList";

export const LeaderboardPage = () => {
    return (
        <section
            className="leaderboard"
        >
            <h1
                className="leaderboard__top"
            >
                Top 10
            </h1>
            <div
                className="leaderboard__container"
            >
                <div
                    className="leaderboard__wrapper"
                >
                    <h2
                        className="leaderboard__title"
                    >
                        Username
                    </h2>
                    <h2
                        className="leaderboard__title"
                    >
                        Wins
                    </h2>
                    <h2
                        className="leaderboard__title"
                    >
                        Losses
                    </h2>
                    <h2
                        className="leaderboard__title"
                    >
                        Win Rate
                    </h2>
                </div>
                <LeaderboardList/>
            </div>
        </section>
    )
}