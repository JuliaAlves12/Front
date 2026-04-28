import MovieList from "./components/MovieList/MovieList"
import Movie from "./components/MovieList/Movie"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <header>
        <h1>Cinelist</h1>
        <p>Seu catálogo de filmes favoritos.</p>
      </header>
      <Routes>
        <Route path="/" elemment={<MovieList />}/>
        <Route path="/filme" element={<Movie />}/>
      </Routes>
      <MovieList />

    </div>
    </BrowserRouter>
    
  )
}

export default App;