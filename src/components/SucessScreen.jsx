export default function SuccessScreen(){
    return(
        <section className="success-screen">
            <h2>Pedido feito com sucesso!</h2>
            <div className="success-screen_section">
                <h3>Filme e sessão</h3>
                <p>nome do filme</p>
                <p>dia e horário</p>
            </div>
            <div className="success-screen_section">
                <h3>Ingressos</h3>
                <p>Assento 1</p>
                <p>Assento 2</p>
            </div>
            <div className="success-screen_section">
                <h3>Comprador</h3>
                <p>Nome: </p>
                <p>CPF: </p>
            </div>
        </section>
    );
}