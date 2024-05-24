import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { LeaderboardItem } from "../LeaderboardItem/LeaderboardItem";
import "./LeaderboardList.scss";
import { BASE_URL } from "../../utils/utils";

const fetchLeaderboardData = async () => {
  const { data } = await axios.get(`${BASE_URL}leaderboard`);
  return data;
};

export const LeaderboardList = () => {
  const { data, error, isLoading } = useQuery(
    "leaderboardData",
    fetchLeaderboardData,
    {
      staleTime: 300000, // 5 minutes
      cacheTime: 600000, // 10 minutes
    },
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <ul className="leaderboard__list">
      {data.map((dataItem, index) => (
        <LeaderboardItem
          index={index}
          key={dataItem.username}
          username={dataItem.username}
          wins={dataItem.wins}
          losses={dataItem.losses}
          winrate={dataItem.winrate}
          id={dataItem.username}
        />
      ))}
    </ul>
  );
};
