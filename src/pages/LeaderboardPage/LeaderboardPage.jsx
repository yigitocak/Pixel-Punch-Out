import "./LeaderboardPage.scss";
import { LeaderboardList } from "../../Components/LeaderboardList/LeaderboardList";
import helmet, { Helmet } from "react-helmet";

export const LeaderboardPage = () => {
  return (
    <section className="leaderboard">
      <Helmet>
        <title>Leaderboard | Pixel Punch-Out</title>
        <meta
          name="description"
          content="Explore the Pixel Punch-Out leaderboard to see the top fighters! Track your progress, challenge friends, and compete against players worldwide in this exciting browser-based multiplayer fighting game."
        />
      </Helmet>
      <h1 className="leaderboard__top">Top 10</h1>
      <div className="leaderboard__container">
        <div className="leaderboard__wrapper">
          <h2 className="leaderboard__title">Username</h2>
          <h2 className="leaderboard__title">Wins</h2>
          <h2 className="leaderboard__title">Losses</h2>
          <h2 className="leaderboard__title">Win Rate</h2>
        </div>
        <LeaderboardList />
      </div>
    </section>
  );
};
