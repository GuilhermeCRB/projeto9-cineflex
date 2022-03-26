import { useParams } from "react-router-dom";

export default function SeatSelectionScreen() {

    const { sessionID } = useParams();

    return (
        <section className="seat-screen">
            <h2>Selecione o(s) assento(s)</h2>
            <div className="seat-screen_room">
                <Seats />
            </div>
            <Legend />
            <Form />
            {/* <Footer /> */}
        </section>
    );
}

function Seats() {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        array.map((num) => {
            return (
                <div className="seat-screen_room_seat seat-screen_seat">
                    <p>{num}</p>
                </div>
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

// function Footer(){
//     return (
//         <footer>
//             <div className="img-frame"><img src={sessions.posterURL} alt="" /></div>
//             <h3>{sessions.title}</h3>
//         </footer>
//     );
// }