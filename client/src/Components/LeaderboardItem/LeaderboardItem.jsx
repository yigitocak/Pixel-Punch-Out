import "./LeaderboardItem.scss"

export const LeaderboardItem = ({wins,loses,username}) => {
    return (
        <li>
            <span>Username:{username}</span>
            <br/>
            <span>Wins:{wins}</span>
            <span>Losses:{loses}</span>
            <br/>
            <br/>
        </li>
    )
}