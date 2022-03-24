import { useParams } from "react-router-dom";

export default function SessionScreen(){
    const {movieID} = useParams();

    return <p>sessao da tarde {movieID}</p>;
}