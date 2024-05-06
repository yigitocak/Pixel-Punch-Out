import "./LeaderboardPage.scss"
import axios from "axios";
import {useEffect, useState} from "react";
import {LeaderboardItem} from "../../Components/LeaderboardItem/LeaderboardItem";

export const LeaderboardPage = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const getInfo = async () => {
            const response = await axios.get("http://localhost:8080/leaderboard", {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ6YW1heiIsImVtYWlsIjoiemJhYkBnbWFpbC5jb20iLCJpYXQiOjE3MTUwMjY4NDgsImV4cCI6MTcxNTYzMTY0OH0.FdkY9FNpPFXG0FsDZ4FF7-jafDPulFz2_Bc1CA9dHmo`
                }
            })
            const {status, data} = response
            setData(data)
        }
        getInfo()



    }, [])


    return (
        <section
            className="leaderboard"
        >
            <ul
                className="leaderboard__div"
            >
                {data.map(data => <LeaderboardItem key={data.username} username={data.username} wins={data.wins} loses={data.losses}/>)}
            </ul>

        </section>
    )
}