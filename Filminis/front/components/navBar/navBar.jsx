import { Link } from "react-router-dom";
import "./navBar.css";

export default function NavBar({ logOut, funcaoContraste, estaAtivo }) {
    return (
        <header className="header-nav">

            <div className="left-navbar">
                <Link to='/'>
                    <h1>CineList</h1>
                </Link>
                <p className="frase">
                    Seu catálogo de filmes favoritos.
                </p>
            </div>

            <div className="right-navbar">
                <button className="botao-contraste" onClick={funcaoContraste}>
                    {estaAtivo ? "Modo Normal" : "Alto Contraste"}
                </button>

                <Link to='/login'>
                    <p>Login</p>
                </Link>

                <button className="botao-logout" onClick={logOut}>
                    LogOut
                </button>
            </div>

        </header>
    );
}