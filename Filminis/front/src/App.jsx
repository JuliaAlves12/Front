import MovieList from "./components/MovieList";
import "./App.css"

function App(){
  return(
    <div className="container">
      <header>
        <h1>Cinelist</h1>
        <p>Seu catálogo de filmes favoritos.</p>
      </header>

      <MovieList />

    </div>
  )
}

export default App;