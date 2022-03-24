import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import axios from "axios";

export default function MovieScreen() {

    const [movies, setMovies] = useState([1]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then(displayMovies); promise.catch(errorWarn);
    }, []);

    function errorWarn(error) {
        alert("Sorry an error has occured, try again later");
    }

    function displayMovies(response) {
        setMovies(response.data);
    }

    return (
        <div className="movie-screen">
            <p>Selecione o filme</p>
            <ul>
                {movies.map((movie) => {
                    const { id, title, posterURL } = movie;
                    return (
                        <Link to={`/sessoes/${id}`}>
                            <div className="movie-screen_movie-frame">
                                <li><img src={posterURL} alt={title} /></li>
                            </div>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
}