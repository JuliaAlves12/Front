import { Link } from "react-router-dom";
import "./navBar.css"

export default function NavBar({ logOut }) {
    return (
        <header>

            <div className="left-navbar">
                <Link to='/'>
                    <h1>CineList</h1>
                </Link>

                <p className="frase">
                    Seu catálogo de filmes favoritos.
                </p>
            </div>

            <div className="right-navbar">
                <Link to='/login'>
                    <p>Login</p>
                </Link>

                <button onClick={logOut}>
                    LogOut
                </button>
            </div>

        </header>
    )
}

