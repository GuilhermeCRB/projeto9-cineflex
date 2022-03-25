import { BrowserRouter, Routes, Route } from "react-router-dom";

import MovieScreen from "./components/MovieScreen.jsx";
import SessionScreen from "./components/SessionScreen.jsx";

import "./assets/reset.css";
import "./assets/style.css";
import "./assets/movie-screen.css";
import "./assets/session-screen.css"

export default function App() {
    return (
        <BrowserRouter>
            <header>
                <h1>CINEFLEX</h1>
            </header>
            <Routes>
                <Route path="/" element={<MovieScreen />} />
                <Route path="/sessoes/:movieID" element={<SessionScreen />} />
            </Routes>
        </BrowserRouter>
    );
}