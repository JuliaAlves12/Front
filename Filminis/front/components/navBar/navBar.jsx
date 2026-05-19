import { Link } from "react-router-dom";


export default function NavBar({logOut}) {
    return (
        <div>
            <header>
                <Link to='/'>
                    <h1>CineList</h1>
                </Link>
                <p>Seu catálogo de filmes favoritos.</p>
                <Link to='/login'>
                    <p>Login</p>
                </Link>

                <button onClick={logOut}>LogOut</button>
            </header>
        </div>
    )
}

