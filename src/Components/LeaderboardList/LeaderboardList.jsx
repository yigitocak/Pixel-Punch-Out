import "./LeaderboardList.scss"
import {useEffect, useState} from "react";
import axios from "axios";
import {LeaderboardItem} from "../LeaderboardItem/LeaderboardItem";
import {BASE_URL} from "../../utils/utils";

export const LeaderboardList = () => {
    const [data, setData] = useState([])

    const getInfo = async () => {
        const response = await axios.get(`${BASE_URL}leaderboard`)
        setData(response.data)
    }

    useEffect(() => {
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