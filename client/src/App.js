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

function App() {
  return (
    <>
      <BrowserRouter>
          <Header />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/leaderboard" element={<LeaderboardPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element={<SignUpPage />}/>
          <Route path="/policies" element={<PoliciesPage />}/>
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
