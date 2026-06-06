import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import MovieList from "./pages/MovieList/MovieList"; 
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AddMovie from "./pages/AdicionarMovie/AddMovie"; 
import AdminPainel from "./pages/AdminPainel/AdminPainel"; 

export default function App() {
  // Puxa do localStorage na inicialização
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("user_role")); 

  const logOut = () => {
    localStorage.clear();
    setToken(null);
    setUserRole(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieList logOut={logOut} />} />
        
        {/* CORREÇÃO AQUI: Passando as funções com o nome exato que o Login.jsx espera */}
        <Route path="/login" element={<Login setToken={setToken} setRole={setUserRole} />} />
        
        <Route path="/register" element={<Register />} />
        
        {/* Passando o AddMovie corretamente */}
        <Route 
          path="/add-movie" 
          element={token ? <AddMovie logOut={logOut} /> : <Navigate to="/login" />} 
        />

        {/* ROTA PROTEGIDA DO ADMIN */}
        <Route 
          path="/admin" 
          element={
            token && userRole === "admin" ? (
              <AdminPainel logOut={logOut} />
            ) : (
              <Navigate to="/" /> 
            )
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}