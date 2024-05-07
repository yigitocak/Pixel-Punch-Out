import "./LeaderboardList.scss"
import {useEffect, useState} from "react";
import axios from "axios";
import {LeaderboardItem} from "../LeaderboardItem/LeaderboardItem";

export const LeaderboardList = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const getInfo = async () => {
            const response = await axios.get("http://localhost:8080/leaderboard")
            const {data} = response
            setData(data)
        }
        getInfo()
    }, [])


    return (
        <ul
            className="leaderboard__list"
        >
            {data.map(data => <LeaderboardItem
                key={data.username}
                username={data.username}
                wins={data.wins}
                loses={data.losses}
                winrate={data.winrate}
                id={data.username}
            />)}
        </ul>
    )
}