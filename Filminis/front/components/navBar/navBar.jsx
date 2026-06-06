import { Link } from "react-router-dom";
import "./navBar.css";

export default function NavBar({ funcaoContraste, estaAtivo }) {
    return (
        <header className="header-nav">
            <div className="left-navbar">
                <Link to="/">
                    <h1>Cinelist</h1>
                </Link>
                <p className="frase">Seu catálogo de filmes favoritos.</p>
            </div>

            <div className="right-navbar">
                <button 
                    className="botao-contraste" 
                    onClick={funcaoContraste}
                >
                    {estaAtivo ? "Modo Padrão" : "Alto Contraste"}
                </button>
                
                <Link to="/add-movie" className="botao-adicionar">
                    Adicionar Filme
                </Link>
            </div>
        </header>
    );
}