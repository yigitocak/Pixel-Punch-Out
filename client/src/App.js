import './App.css';
import "./styles/partials/globals.scss"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "./Components/Header/Header";

function App() {
  return (
    <>
      <BrowserRouter>
          <Header />
        <Routes>
          <Route path="/" element=""/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
