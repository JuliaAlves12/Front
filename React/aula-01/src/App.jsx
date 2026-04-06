import Cabecalho from "./components/Cabecalho";
import Descricao from "./components/Descricao";
import Hobbies from "./components/Hobbies";
import PorqueGosto from "./components/PorqueGosto";
import './App.css';

function App(){

  return (
    <>
      <Cabecalho />
      <main>
        <Descricao />
        <Hobbies />
        <PorqueGosto />
      </main>
    </>
  )

}

export default App;