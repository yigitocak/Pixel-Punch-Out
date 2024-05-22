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
import { NotAvailable } from "./Components/NotAvailable/NotAvailable";
import { FlashMessage } from "./Components/FlashMessage/FlashMessage";
import { MaintenancePage } from "./pages/MaintenancePage/MaintenancePage";
import { ResetPage } from "./pages/ResetPage/ResetPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

const MAINTENANCE = true;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [flashMessage, setFlashMessage] = useState("");
  const [flashSuccess, setFlashSuccess] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [backgroundId, setBackgroundId] = useState(null);
  const AUTH_TOKEN_KEY = "authToken";
  const AUTH_ENDPOINT = "auth";
  const [windowWidth, setWindowWidth] = useState(window.innerWidth < 1200);

  console.log(process.env.REACT_APP_CLIENT_ID);

  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}${AUTH_ENDPOINT}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.success ? response.data.decoded.username : null;
    } catch (err) {
      console.error(
        "Error verifying token:",
        err.response ? err.response.data : err.message,
      );
      if (err.response && err.response.data && err.response.data.message) {
        setFlashMessage("You have been logged out! Please login again.");
        setFlashSuccess(false);
        setShowSnackbar(true);
      }
      return null;
    }
  };

  const authenticateToken = async () => {
    let username = null;

    if (token) {
      username = await verifyToken(token);

      if (!username) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
      }
    }
    setIsLoggedIn(!!username);
    setUsername(username);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    authenticateToken();
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth < 1200);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (MAINTENANCE) {
    return <MaintenancePage />;
  }

  if (windowWidth) {
    return <NotAvailable setWindowWidth={setWindowWidth} />;
  }

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} username={username} />
        <FlashMessage
          flashMessage={flashMessage}
          flashSuccess={flashSuccess}
          showSnackbar={showSnackbar}
          setShowSnackbar={setShowSnackbar}
        />
        <Footer
          setFlashSuccess={setFlashSuccess}
          setFlashMessage={setFlashMessage}
          setShowSnackbar={setShowSnackbar}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                isLoggedIn={isLoggedIn}
                setBackgroundId={setBackgroundId}
                setFlashSuccess={setFlashSuccess}
                setFlashMessage={setFlashMessage}
                setShowSnackbar={setShowSnackbar}
              />
            }
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
                setFlashSuccess={setFlashSuccess}
                setFlashMessage={setFlashMessage}
                setShowSnackbar={setShowSnackbar}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignUpPage
                isLoggedIn={isLoggedIn}
                username={username}
                setFlashSuccess={setFlashSuccess}
                setFlashMessage={setFlashMessage}
                setShowSnackbar={setShowSnackbar}
              />
            }
          />
          <Route
            path="/profiles/:profileId"
            element={
              <ProfilePage
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                username={username}
                setFlashSuccess={setFlashSuccess}
                setFlashMessage={setFlashMessage}
                setShowSnackbar={setShowSnackbar}
                isAuthenticating={isAuthenticated}
              />
            }
          />
          <Route path="/privacy-policy" element={<PoliciesPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route
            path="/reset"
            element={
              <ResetPage
                setFlashSuccess={setFlashSuccess}
                setFlashMessage={setFlashMessage}
                setShowSnackbar={setShowSnackbar}
              />
            }
          />
          z
          <Route
            path="/play"
            element={
              <GamePage
                isLoggedIn={isLoggedIn}
                username={username}
                backgroundId={backgroundId}
                setFlashSuccess={setFlashSuccess}
                setFlashMessage={setFlashMessage}
                setShowSnackbar={setShowSnackbar}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
