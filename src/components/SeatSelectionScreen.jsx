import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Seat from "./Seat"
import Form from "./Form";

export default function SeatSelectionScreen({ seatsNumber, buyingInformation }) {
    const [seats, setSeats] = useState(null);
    const { sessionID } = useParams();
    buyingInformation.moviSeats = [];

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`);
        promise.then(displaySeats); promise.catch(warnError);
    }, []);

    function warnError(error) {
        alert("Parece que algo de errado não está certo. Por favor, tente novamente mais tarde.");
    }

    function displaySeats(response) {
        setSeats(response.data);
    }

    return (
        <section className="seat-screen">
            <h2>Selecione o(s) assento(s)</h2>
            {seats && //necessary to force code to wait for the promise to be answered before load the page
                <>
                    <div className="seat-screen_room">
                        <Seats room={seats} seatsNumber={seatsNumber} buyingInformation={buyingInformation} />
                    </div>
                    <Legend />
                    <Form seatsNumber={seatsNumber} buyingInformation={buyingInformation} />
                    <Footer
                        title={seats.movie.title}
                        posterURL={seats.movie.posterURL}
                        day={seats.day.weekday}
                        time={seats.name}
                        date={seats.day.date}
                        buyingInformation={buyingInformation}
                    />
                </>
            }
        </section>
    );
}

function Seats({ room, seatsNumber, buyingInformation }) {
    const { seats } = room;

    return (
        seats.map((seat, index) => {
            return (
                <Seat
                    key={index}
                    isAvailable={seat.isAvailable}
                    SeatID={seat.id}
                    index={index}
                    name={seat.name}
                    seatsNumber={seatsNumber}
                    buyingInformation={buyingInformation}
                />
            )
        })
    )
}

function Legend() {
    return (
        <div className="seat-screen_legend">
            <div className="seat-screen_legend_box">
                <div className="seat-screen_legend_selected_seat seat-screen_seat"></div>
                <p>Selecionado</p>
            </div>
            <div className="seat-screen_legend_box">
                <div className="seat-screen_legend_available_seat seat-screen_seat"></div>
                <p>Disponível</p>
            </div>
            <div className="seat-screen_legend_box">
                <div className="seat-screen_legend_unvailable_seat seat-screen_seat"></div>
                <p>Indisponível</p>
            </div>
        </div>
    );
}

function Footer({ title, posterURL, day, time, date, buyingInformation }) {
    buyingInformation.movieName = title;
    buyingInformation.movieDay = date;
    buyingInformation.movieTime = time;

    return (
        <footer>
            <div className="img-frame"><img src={posterURL} alt="" /></div>
            <div>
                <h3>{title}</h3>
                <p>{`${day} - ${time}`}</p>
            </div>
        </footer>
    );
}