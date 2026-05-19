import MovieList from "./pages/MovieList/MovieList" // Traz a página da vitrine
import { BrowserRouter, Routes, Route, Link } from "react-router-dom" // Ferramentas de navegação
import "./App.css" // Estilo global do site
import Movie from "./pages/Movie/Movie" // Traz a página de detalhes
import Login from "./pages/Login/Login" // Traz a página de login
import { useEffect, useState } from "react"

function App() {

  const [token, setToken] = useState(null)
  const [role, setRole] = useState(null)

  useEffect(() => {
    const tokenSalvo = localStorage.getItem("access_token")
    const roleSalvo = localStorage.getItem("user_role")

    if (tokenSalvo && roleSalvo) {
      setToken(tokenSalvo)
      setRole(roleSalvo)
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    setToken(null)
    setRole(null)
  }

  return (
    // 1. BrowserRouter: O "vigia". Ele fica olhando a barra de endereço do navegador.
    <BrowserRouter>
      {/* 3. Routes: O "trocador de palcos". Só uma dessas rotas aparece por vez. */}
      <Routes>

        {token ? (
          <>
            {/* Se o endereço for "/" (vazio), mostre a vitrine (MovieList) */}
            <Route path="/" element={
              <MovieList logOut={handleLogout} />} />
            {/* Se o endereço tiver "/filme", mostre os detalhes (Movie) */}
            <Route path="/filme" element={<Movie />} />
            {/* Se o endereço tiver "/login", mostre o formulário (Login) */}
            <Route path="/login" element={
              <Login setRole={setRole} setToken={setToken} />} />
          </>
        ) : (
          <>
            <Route path="/" element={<MovieList />} />
            <Route path="/login" element={
              <Login setRole={setRole} setToken={setToken} />} />
          </>
        )}

      </Routes>

    </BrowserRouter>

  )
}

export default App;