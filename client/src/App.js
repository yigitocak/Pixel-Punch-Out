import "./App.css";
import "./styles/partials/globals.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header/Header";
import { HomePage } from "./pages/HomePage/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { LeaderboardPage } from "./pages/LeaderboardPage/LeaderboardPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { PoliciesPage } from "./pages/PoliciesPage/PoliciesPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/utils";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import { SearchResultsPage } from "./pages/SearchResultsPage/SearchResultsPage";
import { Footer } from "./Components/Footer/Footer";
import { GamePage } from "./pages/GamePage/GamePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [username, setUsername] = useState("");

  const token = localStorage.getItem("authToken");

  const authenticateToken = async () => {
    if (!token) {
      setIsLoggedIn(false);
      setIsAuthenticating(false);
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}auth`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setIsLoggedIn(response.data.success);
      setUsername(response.data.decoded.username);
    } catch (err) {
      console.log(err);
    } finally {
    }
    setIsAuthenticating(false);
  };

  useEffect(() => {
    authenticateToken();
  }, [token]);

  return (
    <>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} username={username} />
        <Footer />
        <Routes>
          <Route
            path="/"
            element={<HomePage isLoggedIn={isLoggedIn} username={username} />}
          />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route
            path="/login"
            element={
              <LoginPage
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                username={username}
                renderUsername={setUsername}
              />
            }
          />
          <Route
            path="/signup"
            element={<SignUpPage isLoggedIn={isLoggedIn} username={username} />}
          />
          <Route
            path="/profiles/:profileId"
            element={
              <ProfilePage
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                username={username}
              />
            }
          />
          <Route path="/privacy-policy" element={<PoliciesPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route
            path="/play"
            element={<GamePage isLoggedIn={isLoggedIn} username={username} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
