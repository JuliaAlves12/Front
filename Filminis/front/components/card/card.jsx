import { Link } from "react-router-dom";
import "./card.css"; // Isso é obrigatório para o estilo funcionar!

export default function Card({ idFilme }) {
    return (
        <Link to={`/movie?id=${idFilme}`} className="botao-acessar">
            Acessar Filme
        </Link>
    );
}