import MovieList from "./components/MovieList/MovieList"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import "./App.css"
import Movie from "./components/Movie/Movie"
import Login from "./components/Login/Login"

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header>
          <Link to='/'>
            <h1>Cinelist</h1>
          </Link>
          <p>Seu catálogo de filmes favoritos.</p>
          <Link to="/login">
            <p>Login</p>
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/filme" element={<Movie />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </div>
    </BrowserRouter>

  )
}

export default App;