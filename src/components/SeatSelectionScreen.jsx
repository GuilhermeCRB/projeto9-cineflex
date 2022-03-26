import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import styled from "styled-components";

export default function SeatSelectionScreen() {
    const [seats, setSeats] = useState(null);
    const { sessionID } = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionID}/seats`);
        promise.then(displaySeats); promise.catch(warnError);
    }, []);

    function warnError(error) {
        alert("Sorry an error has occured, try again later.");
    }

    function displaySeats(response) {
        setSeats(response.data);
    }

    return (
        <section className="seat-screen">
            <h2>Selecione o(s) assento(s)</h2>
            {seats &&
                <>
                    <div className="seat-screen_room">
                        <Seats
                            room={seats}
                        // setSelected={setSelected}
                        // selected={selected}
                        />
                    </div>
                    <Legend />
                    <Form />
                    {/* <Footer /> */}
                </>
            }
        </section>
    );
}

function Seats({ room }) {
    const { seats } = room;

    return (
        seats.map((seat, index) => {
            return (
                <Seat key={index} isAvailable={seat.isAvailable} index={index} name={seat.name} />
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

function Form() {
    return (
        <form action="">
            <label for="form_buyer-name">Nome do comprador:</label>
            <input type="text" id="form_buyer-name" placeholder="Digite seu CPF..." />
            <label for="form_buyer-cpf">CPF do comprador:</label>
            <input type="text" id="form_buyer-cpf" placeholder="Digite seu CPF..." />
            <button>Reservar assento(s)</button>
        </form>
    );
}

function Seat({isAvailable, index, name}) {
    const [selected, setSelected] = useState();
    
    return (
        <SeatStyle
            isAvailable={isAvailable}
            selected={selected}
            index={index}
            onClick={() => setSelected(index)}
            className="seat-screen_seat"
        >
            <p>{name}</p>
        </SeatStyle>
    );
}

// function Footer(){
//     return (
//         <footer>
//             <div className="img-frame"><img src={sessions.posterURL} alt="" /></div>
//             <h3>{sessions.title}</h3>
//         </footer>
//     );
// }

function checkAvailability(isAvailable, selected, index, element) {
    if (isAvailable) {
        if (selected === index) {
            return element === "border" ? "var(--selected-seat-border)" : "var(--selected-seat)";
        } else {
            return element === "border" ? "var(--available-seat-border)" : "var(--available-seat)";
        }
    } else {
        return element === "border" ? "var(--unavailable-seat-border)" : "var(--unavailable-seat)";
    }
}

const SeatStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 7px 18px 0;
    border: 1px solid ${({ isAvailable, selected, index }) => checkAvailability(isAvailable, selected, index, "border")};
    background-color: ${({ isAvailable, selected, index }) => checkAvailability(isAvailable, selected, index, "background")};

    p{
        font-size: 12px;
        color: var(--seat-color);
    }
`