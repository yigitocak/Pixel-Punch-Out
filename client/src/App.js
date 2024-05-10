import './App.css';
import "./styles/partials/globals.scss"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "./Components/Header/Header";
import {HomePage} from "./pages/HomePage/HomePage";
import {NotFoundPage} from "./pages/NotFoundPage/NotFoundPage";
import {LeaderboardPage} from "./pages/LeaderboardPage/LeaderboardPage";
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {SignUpPage} from "./pages/SignUpPage/SignUpPage";
import {PoliciesPage} from "./pages/PoliciesPage/PoliciesPage";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "./utils/utils";
import {ProfilePage} from "./pages/ProfilePage/ProfilePage";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("")

    const token= localStorage.getItem("authToken")
    const authenticateToken = async () => {
        try {
            const response = await axios.get(`${BASE_URL}auth`, {
                headers: {authorization: `Bearer ${token}`}
            })
            setIsLoggedIn(response.data.success)
            setUsername(response.data.decoded.username)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        authenticateToken()
    },[token])

  return (
    <>
      <BrowserRouter>
          <Header isLoggedIn={isLoggedIn} username={username}/>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/leaderboard" element={<LeaderboardPage />}/>
          <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username} renderUsername={setUsername}/>}/>
          <Route path="/signup" element={<SignUpPage isLoggedIn={isLoggedIn} username={username}/>}/>
          <Route path="/profiles/:profileId" element={<ProfilePage isLoggedIn={isLoggedIn} username={username}/>}/>
          <Route path="/privacy-policy" element={<PoliciesPage />}/>
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
