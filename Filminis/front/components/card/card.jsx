import { Link } from "react-router-dom";
import "./card.css";

export default function Card({ idFilme }) {
    return(
        <Link to={`/filme?id=${idFilme}`} className="botao-acessar">
            Acessar
        </Link>
    )
}