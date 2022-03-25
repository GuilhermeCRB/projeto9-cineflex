import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SessionScreen(){
    const [sessions, setSessions] = useState();
    const {movieID} = useParams();
    

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieID}/showtimes`);
        promise.then(displaySessions); promise.catch(errorWarn); 
    }, []);

    function errorWarn(error) {
        alert("Sorry an error has occured, try again later.");
    }

    function displaySessions(response) {
        console.log(response.data)
        setSessions(response.data);
    }

    function displayTimes(showtimes){
        return(
            showtimes.map((time) =>{
                return(
                    <div className="session-screen_time_box">
                        <p>{time.name}</p>
                    </div>
                );
            })
        );
    }

    return (
        <section className="session-screen">
            <h2>Selecione o horário</h2>
            <div className="session-screen_day">
                {sessions.days.map((session) => {
                    const {weekday, date, showtimes} = session;
                    return(
                        <>
                            <p>{`${weekday} - ${date}`}</p>
                            <div className="session-screen_time">
                                {displayTimes(showtimes)}
                            </div>
                        </>
                    );
                })}
            </div>
            <footer>
                <div className="session-screen_img-frame"><img src={sessions.posterURL} alt="" /></div>
                <h3>{sessions.title}</h3>
            </footer>
        </section>
    );
}