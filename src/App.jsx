import MovieScreen from "./components/MovieScreen.jsx";

import "./assets/reset.css"
import "./assets/style.css"
import "./assets/movie-screen.css"

export default function App() {
    return (
        <>
            <header>
                <h1>CINEFLEX</h1>
            </header>
            <MovieScreen />
        </>
    );
}