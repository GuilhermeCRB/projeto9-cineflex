import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export default function SessionScreen() {
    const [sessions, setSessions] = useState(null);
    const { movieID } = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieID}/showtimes`);
        promise.then(displaySessions); promise.catch(warnError)
    }, []);

    function warnError(error) {
        alert("Parece que algo de errado não está certo. Por favor, tente novamente mais tarde.");
    }

    function displaySessions(response) {
        setSessions(response.data);
    }

    function displayTimes(showtimes) {
        return (
            showtimes.map((time, index) => {
                return (
                    <Link key={index} to={`/assentos/${time.id}`}>
                        <div className="session-screen_time_box">
                            <p>{time.name}</p>
                        </div>
                    </Link>
                );
            })
        );
    }

    return (
        <section className="session-screen">
            <h2>Selecione o horário</h2>
            {sessions && //necessary to force code to wait for the promise to be answered before load the page
                <>
                    <div className="session-screen_day">
                        <Sessions sessions={sessions} displayTimes={displayTimes} />
                    </div>
                    < Footer sessions={sessions} />
                </>
            }
        </section>
    );
}

function Sessions({ sessions, displayTimes }) {
    return (
        sessions.days.map((session) => {
            const { weekday, date, showtimes } = session;
            return (
                <>
                    <p>{`${weekday} - ${date}`}</p>
                    <div className="session-screen_time">
                        {displayTimes(showtimes)}
                    </div>
                </>
            );
        })
    );
}

function Footer({ sessions }) {
    return (
        <footer>
            <div className="img-frame"><img src={sessions.posterURL} alt="" /></div>
            <h3>{sessions.title}</h3>
        </footer>
    );
}