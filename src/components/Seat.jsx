import { useState } from "react";
import styled from "styled-components";

export default function Seat({ isAvailable, SeatID, index, name, seatsNumber, buyingInformation }) {
    const [selected, setSelected] = useState(false);

    return (
        <SeatStyle
            isAvailable={isAvailable}
            selected={selected}
            onClick={() => { setSelected(!selected) }}
            index={index}
            SeatID={SeatID}
            seatsNumber={seatsNumber}
            buyingInformation={buyingInformation}
            className="seat-screen_seat"
        >
            <p>{name}</p>
        </SeatStyle>
    );
}

function checkAvailability(isAvailable, selected, index, SeatID, seatsNumber, buyingInformation, element) {
    if (isAvailable) {
        if (selected) {
            if (element === "border") { //statement is necessary to not save the seat in seatsNumber array twice, since function is being called 2 times per click
                seatsNumber.push(SeatID);
                buyingInformation.movieSeats.push(index+1);
            }
            return element === "border" ? "var(--selected-seat-border)" : "var(--selected-seat)";
        } else {
            // if(element === "border") dropSeat(SeatID, seatsNumber);
            return element === "border" ? "var(--available-seat-border)" : "var(--available-seat)";
        }
    } else if (selected) {
        alert("Este assento não está disponível");
        return element === "border" ? "var(--unavailable-seat-border)" : "var(--unavailable-seat)";
    } else {
        return element === "border" ? "var(--unavailable-seat-border)" : "var(--unavailable-seat)";
    }
}

// function dropSeat(SeatID, seatsNumber){
//     if(seatsNumber.length !== 0){
//         seatsNumber = seatsNumber.filter((seat) => {
//             if(seat === SeatID){
//                 return false;
//             }else{
//                 return true;
//             }
//         })
//     }
// }


const SeatStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 7px 18px 0;
    border: 1px solid ${({ isAvailable, selected, index, SeatID, seatsNumber, buyingInformation }) => checkAvailability(isAvailable, selected, index, SeatID, seatsNumber, buyingInformation, "border")};
    background-color: ${({ isAvailable, selected, index, SeatID, seatsNumber, buyingInformation }) => checkAvailability(isAvailable, selected, index, SeatID, seatsNumber, buyingInformation, "background")};

    p{
        font-size: 12px;
        color: var(--seat-color);
    }
`