import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const WEBSOCKET = process.env.REACT_APP_WEBSOCKET;
export const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
export const DISCORD_URL = process.env.REACT_APP_DISCORD_URL;
export const BOT_ID = process.env.REACT_APP_DISCORD_BOT_ID;

export const fetchUserData = async (userId) => {
  const botToken = BOT_ID;
  const url = `https://discord.com/api/v10/users/${userId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bot ${botToken}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
