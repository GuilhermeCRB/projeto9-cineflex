import { useNavigate } from "react-router-dom";

export default function SuccessScreen({ buyingInformation }) {
    const navigate = useNavigate();

    function resetInformation() {
        console.log("entrei")
        buyingInformation.movieSeats = [];
        navigate("/");
    }

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
                <p>CPF: {
                    buyingInformation.movieBuyerCPF
                        .replace(/(\d{3})(\d)/, '$1.$2')
                        .replace(/(\d{3})(\d)/, '$1.$2')
                        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                }</p>
            </div>
            <button onClick={() => {resetInformation()}} >Voltar para Home</button>
        </section>
    );
}