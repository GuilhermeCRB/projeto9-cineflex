import { Link } from "react-router-dom";

export default function SuccessScreen({ buyingInformation }) {
    console.log(buyingInformation);
    return (buyingInformation.movieSeats !== [] &&
        <section className="success-screen">
            <h2>Pedido feito com sucesso!</h2>
            <div className="success-screen_section">
                <h3>Filme e sessão</h3>
                <p>{buyingInformation.movieName}</p>
                <p>{buyingInformation.movieDay} {buyingInformation.movieTime}</p>
            </div>
            <div className="success-screen_section">
                <h3>Ingressos</h3>
                {buyingInformation.movieSeats.map(seat => {
                    return <p>Assento {seat}</p>
                })
                }
            </div>
            <div className="success-screen_section">
                <h3>Comprador</h3>
                <p>Nome: {buyingInformation.movieBuyerName}</p>
                <p>CPF: {buyingInformation.movieBuyerCPF}</p>
            </div>
            <Link to={"/"}>
                <button>Voltar para Home</button>
            </Link>
        </section>
    );
}