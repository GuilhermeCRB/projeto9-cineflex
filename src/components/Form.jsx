import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function Form({ seatsNumber, buyingInformation }) {
    const [buyerName, setBuyerName] = useState("");
    const [buyerCPF, setBuyerCPF] = useState("");
    const navigate = useNavigate();

    function validateRequest(e) {
        e.preventDefault();
        const seatsValidation = testSeats();
        const nameRequirements = testBuyerName();
        const cpfRequirements = testBuyerCPF();

        if (nameRequirements && cpfRequirements && seatsValidation) {
            saveInformation();
            sendRequest();
        }
    }

    function testSeats() {
        if (seatsNumber.length < 1) {
            alert("Por favor, selecione um assento para continuar.")
            return false;
        } else {
            return true;
        }
    }

    function testBuyerName() {
        let isAllLetters = true;

        if (buyerName.length === 0) {
            isAllLetters = false;
            alert("Por favor, preencha seu nome corretamente.");
            return isAllLetters;
        }

        for (let i = 0; i < buyerName.length; i++) {
            if (!/[a-z]/.test(buyerName[i].toLowerCase())) {
                isAllLetters = false;
                alert("Por favor, preencha seu nome corretamente.")
                break;
            }
        }

        return isAllLetters;
    }


    function testBuyerCPF() {
        let isCpfFormat = true;

        if (buyerCPF.length !== 11) {
            isCpfFormat = false;
            alert("Por favor, preencha seu CPF corretamente.")
            return isCpfFormat;
        }

        for (let i = 0; i < buyerCPF.length; i++) {
            if (!/[0-9]/.test(buyerCPF[i])) {
                isCpfFormat = false;
                alert("Por favor, preencha seu CPF corretamente.")
                break;
            }
        }

        return isCpfFormat;
    }

    function saveInformation(){
        buyingInformation.movieBuyerName = buyerName;
        buyingInformation.movieBuyerCPF = buyerCPF;
    }

    function sendRequest() {
        const promise = axios.post(
            "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",
            {ids: seatsNumber, name: buyerName, cpf: buyerCPF}
        );
        promise.then(navigate("/sucesso")); promise.catch(warnError);

        function warnError(error) {
            alert("Parece que algo de errado não está certo. Por favor, tente novamente mais tarde.");
        }
    }

    return (
        <form onSubmit={validateRequest}>
            <label for="form_buyer-name">Nome do comprador:</label>
            <input
                type="text"
                id="form_buyer-name"
                placeholder="Digite seu nome..."
                value={buyerName}
                onChange={(e) => { setBuyerName(e.target.value) }}
            />
            <label for="form_buyer-cpf">CPF do comprador:</label>
            <input
                type="text"
                id="form_buyer-cpf"
                placeholder="Digite seu CPF..."
                value={buyerCPF}
                onChange={(e) => { setBuyerCPF(e.target.value) }}
            />
            <button type="submit">Reservar assento(s)</button>
        </form>
    );
}